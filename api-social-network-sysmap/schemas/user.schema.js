const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    user: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    profile: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Profile",
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  const passwordHash = await bcrypt.hash(this.password, 12);
  this.password = passwordHash;
});

module.exports = mongoose.model("User", userSchema);
