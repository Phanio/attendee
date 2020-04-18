const express = require('express');
const bodyParser = require('body-parser');
const config = require('./server.config');
var cors = require('cors');
const session = require('express-session');
const PostgresStore = require('./utils/PostgresStore');

const app = express();

// ces lignes (cors) sont importantes pour les sessions dans la version de développement
app.use(cors({
  credentials: true,
  origin: config.URL_FRONTEND
}));
app.use(session({
  secret: config.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // ne changez que si vous avez activé le https
}));

app.use(bodyParser(bodyParser.json()));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
PostgresStore.init();

const postLogin = require('./controllers/post.login');
const postSigin = require('./controllers/post.sigin');
const getCurrentUser = require('./controllers/get.current_user');
const AttendeeController = require('./controllers/AttendeeController');

async function isAuthenticated (req, res, next) {
  console.log('id= ', req.session.userId);
  if (req.session.userId) {
    next(); // appeler next() appelle la prochaine fonction dans la liste des middlewares
    return;
  }
  res.status(401).json({ msg: 'unauthorized(1)' });
}
async function logOut (req, res, next) {
  console.log('id= ', req.session.userId);
  if (req.session.userId) {
    delete req.session.userId;
    req.session.destroy();
  }
  res.status(200).json({ msg: 'Log out!' });
}

app.post('/login', (req, res) => {
  postLogin(req, res);
});
app.post('/sigin', (req, res) => {
  postSigin(req, res);
});
app.get('/current_user',
  getCurrentUser
);
app.get('/logout', logOut);

app.post('/attendees', isAuthenticated, AttendeeController.createAttendee);
app.get('/attendees', isAuthenticated, AttendeeController.getAttendees);

app.put('/attendees/:id', isAuthenticated, AttendeeController.updateAttendee);

app.delete('/attendees/:id', isAuthenticated, AttendeeController.deleteAttendee);

app.listen(3001);
