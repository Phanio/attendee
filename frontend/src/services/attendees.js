/**
 * HTTP request calls to the backend server
 */
const SERVER_URL = 'http://localhost:3001';

function login (object) {
  return fetch(`${SERVER_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(object)
  });
}
function siginUp (user) {
  return fetch(`${SERVER_URL}/sigin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  });
}

function getAttendees () {
  return fetch(`${SERVER_URL}/attendees`)
    .then(resp => {
      return resp.json();
    })
    .then(data => {
      console.log(data);
      return data;
    });
}

function inviteAttendee (attendee) {
  return fetch(`${SERVER_URL}/attendees`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(attendee)
  });
}

function editAttendee (attendeeId, attendee) {
  return fetch(`${SERVER_URL}/attendees/${attendeeId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ ...attendee })
  });
}

function deleteAttendee (attendeeId) {
  return fetch(`${SERVER_URL}/attendees/${attendeeId}`, {
    method: 'DELETE'
  });
}

export { getAttendees, inviteAttendee, deleteAttendee, editAttendee, login, siginUp };
