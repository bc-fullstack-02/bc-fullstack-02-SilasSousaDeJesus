const User = require("../schemas/user.schema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
exports.loginUser = async (email, password) => {
  if (!email || email == null || email == "") {
    return { message: "empty email field" };
  }

  if (!password || password == null || password == "") {
    return { message: "empty password field" };
  }

  const user = await User.findOne({ email: email }).select("+password");
  if (!user) {
    return { message: "User not found" };
  }

  const checkPassword = await bcrypt.compare(password, user.password);
  if (!checkPassword) {
    return { message: " invalid password or email" };
  }

  try {
    const secret = process.env.ACCESS_TOKEN_SECRET;
    const token = jwt.sign({ id: user._id }, secret, { expiresIn: "20h" });
    return { token };
  } catch (error) {
    return { message: `an error occurred on the server: ${error}` };
  }
};
