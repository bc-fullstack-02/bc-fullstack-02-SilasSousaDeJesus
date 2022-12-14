const UserRepository = require("../repositories/user.repository");

module.exports = class UserController {
  static async createUser(req, res) {
    const { user, name, password } = req.body;

    try {
      return res.json(
        await UserRepository.createUser(user, name, password)
      );
    } catch (error) {
      console.log(error);
    }
  }

  static async showAllUsers(req, res) {
    try {
      return res.json(await UserRepository.findAllUsers());
    } catch (error) {
      console.log(error);
    }
  }

  static async showUser(req, res) {
    const { id } = req.params;
    try {
      return res.json(await UserRepository.showUser(id));
    } catch (error) {
      console.log(error);
    }
  }

  static async updateUser(req, res) {
    const { id } = req.params;
    const { user, password } = req.body;

    try {
      return res.json(
        await UserRepository.updateUser(id, user, password )
      );
    } catch (error) {}
  }

  static async deleteUser(req, res) {
    const { id } = req.params;

    try {
      return res.json(await UserRepository.deleteUser(id));
    } catch (error) {
      console.log(error);
    }
  }
};
