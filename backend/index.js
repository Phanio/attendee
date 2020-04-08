const express = require("express");
const bodyParser = require("body-parser");
const uuid = require("uuid");
var cors = require("cors");
const app = express();
app.use(cors());
app.use(bodyParser(bodyParser.json()));

let attendees = [
  {
    id: 1,
    fullName: "First Person",
    age: 25
  },
  {
    id: 2,
    fullName: "Second Person",
    age: 54
  },
  {
    id: 3,
    fullName: "Third Person",
    age: 20
  },
  {
    id: 4,
    fullName: "Fourth Person",
    age: 67
  }
];

app.get("/attendees", function(req, res) {
  res.send(attendees);
});

app.post("/attendees", (req, res) => {
  const person = {
    id: uuid.v4(),
    ...req.body
  };
  attendees.push(person);
  res.status(200);
  res.send(person);
});

app.put("/attendees/:id", (req, res) => {
  const person = req.body;
  const personId = parseInt(req.params.id);
  attendees = attendees.map(attendee => {
    if (attendee.id === personId) {
      return { id: personId, ...person };
    }
    return attendee;
  });
  res.sendStatus(200);
});

app.delete("/attendees/:id", (req, res) => {
  const personId = parseInt(req.params.id);
  attendees = attendees.filter(attendee => {
    return attendee.id !== personId;
  });
  res.sendStatus(200);
});

app.listen(3001);
