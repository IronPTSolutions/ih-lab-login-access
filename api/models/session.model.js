const mongoose = require("mongoose");
const User = require("../models/user.model");

const schema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      // TODO: reference to user model
      ref: 'User',
    },
    lastAccess: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// delete session after lastAccess + 1h
schema.index({ lastAccess: 1 }, { expireAfterSeconds: 3600 });

const Session = mongoose.model("Session", schema);

module.exports = Session;
