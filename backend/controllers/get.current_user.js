const User = require('../models/user_model');

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
async function getCurrentUser (req, res) {
  // si l'utilisateur est déjà connecté, alors on lui retourne l'user
  if (req.session.userId) {
    const user = await User.getById(req.session.userId);
    console.log('user s  ', user);
    res.json(user);
  }
  res.json(null);
}

module.exports = getCurrentUser;
