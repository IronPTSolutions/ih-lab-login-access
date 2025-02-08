const Session = require("../models/session.model");
const User = require("../models/user.model");
const createError = require("http-errors");

module.exports.create = (req, res, next) => {
  const { email, password } = req.body;

  // 1. find user by email
  User.findOne({ email })
    .then((user) => {
      if (!user) {
        return next(createError(401, 'Bad credentials'));
      }
      user
        .checkPassword(password)
        .then((match) => {
          if (!match) {
            return next(createError(401, 'Bad Credentials'));
          }

          Session.create({ user: user.id })
            .then((session) => {
              res.header("Set-Cookie", `session_id=${session._id}; HttpOnly`);
              res.json(user);
            })
            .catch(next);
        })
        .catch(next); 
    })
    .catch(next); 
};

module.exports.destroy = (req, res, next) => {
  const sessionId = req.cookies.session_id;

  if (!sessionId) {
    return next(createError(400, "Session not found"));
  }

  
  Session.findByIdAndDelete(sessionId)
    .then(() => {
      res.clearCookie("session_id", {
        path: "/api/v1", 
      });
      res.status(204).send();
    })
    .catch(next);
};
