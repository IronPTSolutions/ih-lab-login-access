const createError = require("http-errors");
const User = require("../models/user.model");

module.exports.create = (req, res, next) => {
  const { body } = req;
  User.create(body)
    .then((user) => res.status(201).json(user))
    .catch((error) => next(error));
};

module.exports.profile = (req, res, next) => {
  if(!req.user) {
    next(createError(401, 'Unauthorized'));
  }
  // access current request user
  res.json(req.user);
};
