/**
 * HTTP request calls to the backend server
 */
import axios from 'axios';
const SERVER_URL = 'http://localhost:3001';

axios.defaults.withCredentials = true;

function getCurrentUser () {
  return axios.get(`${SERVER_URL}/current_user`).then(resp => {
    return resp.data;
  });
}
function logOut () {
  return axios.get(`${SERVER_URL}/logout`);
}
function login (object) {
  return axios.post(`${SERVER_URL}/login`, {
    username: object.username,
    password: object.password
  });
}
function siginUp (user) {
  return axios.post(`${SERVER_URL}/sigin`, {
    username: user.username,
    password: user.password
  });
}

function getAttendees () {
  return axios.get(`${SERVER_URL}/attendees`).then(resp => {
    return resp.data;
  });
}

function inviteAttendee (attendee) {
  return axios.post(`${SERVER_URL}/attendees`, {
    fullname: attendee.fullname, age: attendee.age
  });
}

function editAttendee (attendeeId, attendee) {
  return axios.put(`${SERVER_URL}/attendees/${attendeeId}`, {
    fullname: attendee.fullname, age: attendee.age
  });
}

function deleteAttendee (attendeeId) {
  return axios.delete(`${SERVER_URL}/attendees/${attendeeId}`);
}

export { getAttendees, inviteAttendee, deleteAttendee, editAttendee, login, siginUp, getCurrentUser, logOut };
