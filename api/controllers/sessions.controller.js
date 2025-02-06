const Session = require("../models/session.model");
const User = require("../models/user.model");
const createError = require("http-errors");

module.exports.create = (req, res, next) => {
  const { email, password } = req.body;
  console.log('Email:', email);
  console.log('Password:', password);

  // 1. Find user by email
  User.findOne({ email })
    .then((user) => {
      if (!user) {
        return next(createError(400, 'User not found'));
      }

      // 2. Check password
      return user.checkPassword(password).then((isMatch) => {
        if (!isMatch) {
          return next(createError(400, 'User incorrect password'));
        }

        // 3. Create session
        return Session.create({ userId: user._id }).then((session) => {
          // 4. Send session ID in a cookie
          res.cookie("session_id", session._id, { httpOnly: true });

          res.status(201).json(session);
        });
      });
    })
    .catch((error) => next(error));
};


module.exports.destroy = (req, res, next) => {
  // access current request session. remove and send 204 status
  Session.findByIdAndDelete(req.session._id)
  .then(()=> res.status(204).send());
};
