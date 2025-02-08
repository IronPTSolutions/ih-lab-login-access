const Session = require("../models/session.model");
const createError = require("http-errors");

module.exports.checkSession = (req, res, next) => {
  const sessionId = req.cookies.session_id || req.headers["session-id"];
  console.log("Session ID from cookie or header:", sessionId);

  if (!sessionId) {
    return next(createError(401, "Missing session from cookie header"));
  }

  Session.findById(sessionId)
    .populate("user")
    .then((session) => {
      if (!session) {
        console.log("Session not found in database");
        next(createError(401, "Session expired or not found"));
      }

      console.log("User authenticated:", session.user);
      req.session = session;
      req.user = session.user; 

      next();
    })
    .catch(next);
};