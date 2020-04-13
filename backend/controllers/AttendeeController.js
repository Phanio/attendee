const Attendee = require('../models/attendee_model');

class AttendeeController {
/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
  static async postAttendee (req, res) {
  // créer l'objet module et l'envoyer
    res.json(await Attendee.create(req.body));
  }

  /**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
  static async getAttendees (req, res) {
    const userId = req.session.userId;
    const result = await Attendee.getByUserId(userId);
    console.log(result);
    res.send(result);
  }

  /**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
  static async deleteAttendee (req, res) {
    const result = await Attendee.remove(req.param.id, req.session.userId);
    if (result) {
      res.sendStatus(200);
      return;
    }
    res.sendStatus();
  }

  /**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
  static async updateAttendee (req, res) {
    res.json(await Attendee.update(req.body, req.session.userId));
  }
}
module.exports = AttendeeController;
