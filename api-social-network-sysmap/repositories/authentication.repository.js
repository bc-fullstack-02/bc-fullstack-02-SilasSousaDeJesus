const User = require("../schemas/user.schema");
const Profile = require("../schemas/profile.schema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
exports.loginUser = async (user, password) => {
  if (!user || user == null || user == "") {
    return { message: "empty user field" };
  }

  if (!password || password == null || password == "") {
    return { message: "empty password field" };
  }

  const userCurrent = await User.findOne({ user: user }).select("+password");
  if (!userCurrent) {
    return { message: "User not found" };
  }

  const checkPassword = await bcrypt.compare(password, userCurrent.password);
  if (!checkPassword) {
    return { message: " invalid password or email" };
  }

  const profile = await Profile.findOne({user: userCurrent._id});
  if(!profile){
    return {message: "profile not found"}
  }

  try {
    const secret = process.env.ACCESS_TOKEN_SECRET;
    const token = jwt.sign({profile: profile, user: user}, secret, { expiresIn: "24h" });
    return { access_token: token };
  } catch (error) {
    return { message: `an error occurred on the server: ${error}` };
  }
};
