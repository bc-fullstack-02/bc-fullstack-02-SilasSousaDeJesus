const AuthenticationRepository = require("../repositories/authentication.repository");

module.exports = class UserController {
  static async login(req, res) {
    const { email, password } = req.body;
    try {
      return res.json(
        await AuthenticationRepository.loginUser(email, password)
      );
    } catch (error) {
      console.log(error);
    }
  }
};
