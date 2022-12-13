const AuthenticationRepository = require("../repositories/authentication.repository");

module.exports = class UserController {
  static async login(req, res) {
    const { user, password } = req.body;
    try {
      return res.json(
        await AuthenticationRepository.loginUser(user, password)
      );
    } catch (error) {
      console.log(error);
    }
  }
};
