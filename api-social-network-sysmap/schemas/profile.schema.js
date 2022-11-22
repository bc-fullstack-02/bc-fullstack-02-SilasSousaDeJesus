const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minLength: 2,
  },
  user: {
    required: true,
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  following: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Profile",
    },
  ],
  followers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Profile",
    },
  ],
});

module.exports = mongoose.model("Profile", profileSchema);
