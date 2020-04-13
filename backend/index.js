const express = require('express');
const bodyParser = require('body-parser');
const config = require('./server.config');
var cors = require('cors');
const session = require('express-session');
const PostgresStore = require('./utils/PostgresStore');

const app = express();
app.use(cors());
app.use(session({ secret: config.SESSION_SECRET }));
app.use(bodyParser(bodyParser.json()));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
PostgresStore.init();

const postLogin = require('./controllers/post.login');
const postSigin = require('./controllers/post.sigin');
const AttendeeController = require('./controllers/AttendeeController');

async function isAuthenticated (req, res, next) {
  if (req.session.userId) {
    next(); // appeler next() appelle la prochaine fonction dans la liste des middlewares
    return;
  }
  res.status(401).send('unauthorized(1)');
}

app.post('/login', (req, res) => {
  postLogin(req, res);
});
app.post('/sigin', (req, res) => {
  postSigin(req, res);
});

app.post('/attendees', isAuthenticated, AttendeeController.postAttendee);
app.get('/attendees', isAuthenticated, AttendeeController.getAttendees);

app.put('/attendees/:id', isAuthenticated, AttendeeController.updateAttendee);

app.delete('/attendees/:id', isAuthenticated, AttendeeController.deleteAttendee);

app.listen(3001);
