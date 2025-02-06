const Session = require("../models/session.model");
const createError = require("http-errors");

module.exports.checkSession = (req, res, next) => {
  // find session id from cookie. imagine cookie is "session=1234; other=5678"
  const sessionId = req.cookies.session_id;

  if (!sessionId) {
    return next(createError(401, "Missing session from cookie header"));
  }

  // 1. find session by ID
    Session.findById(sessionId)
       // 2. populate user field
      .populate('user')
      .then((session) => {
        // 3. update session last access
        session.lastAccess = Date.now(); 
        // 5. save session
        return session.save();
      })
       // 6. leave user on req object
       // 7. leave session on req object
      .then ((updatedSession)=> {
        req.session = updatedSession; 
        req.user = updatedSession.user;

      })
 
  // 8. continue to next middleware or controller
  // 9. handle errors with 401 code
      .catch((error)=> { next(createError(401, error.message));

      });
};

