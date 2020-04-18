const Attendee = require('../models/attendee_model');

class AttendeeController {
/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
  static async createAttendee (req, res) {
  // créer l'objet module et l'envoyer
    const userId = req.session.userId;
    console.log(req.body);
    console.log('user ==', userId);
    const result = await Attendee.create(req.body, userId);
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(401).json({ msg: 'Error' });
    }
  }

  /**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
  static async getAttendees (req, res) {
    const userId = req.session.userId;
    const result = await Attendee.getByUserId(userId);
    console.log(result);
    res.json(result);
  }

  /**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
  static async deleteAttendee (req, res) {
    const userId = req.session.userId;
    console.log(req.params);
    const result = await Attendee.remove(req.params.id, userId);
    console.log('del==', result);
    if (result) {
      res.status(200).json({ msg: 'Fields deleted!' });
      return;
    }
    res.status(401).json({ msg: 'Error' });
  }

  /**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
  static async updateAttendee (req, res) {
    const userId = req.session.userId;
    const result = await Attendee.update(req.params.id, req.body, userId);
    console.log('up == ', result);
    if (result) {
      res.status(200).json({ msg: 'Fields updated!' });
      return;
    }
    res.sendStatus(401).json({ msg: 'Error occur' });
  }
}
module.exports = AttendeeController;
