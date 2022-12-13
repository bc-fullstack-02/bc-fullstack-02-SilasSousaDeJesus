const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: true,
      minLength: 2,
    },
    profile: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Profile',
      require: true
    },
    post: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Post",
    },
    likes:[{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Profile'
  }]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Comment", commentSchema);
