const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minLength: 2,
  },
  user: {
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  myLikes: {
    type: Array,
    default: [],
  },
  following: {
    type: Array,
    default: [],
  },

  followers: {
    type: Array,
    default: [],
  },
});

// module.exports = mongoose.model("Profile", profileSchema);
module.exports =
  mongoose.models.Profile || mongoose.model("Profile", profileSchema);
