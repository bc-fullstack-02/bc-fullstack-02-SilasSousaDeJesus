const ProfileRepository = require("../repositories/profile.repository");

module.exports = class ProfileController {
  static async createProfile(req, res) {
    try {
      return res.json(
        await ProfileRepository.createProfile(req.body.username, req.params.userId)
      );
    } catch (error) {
      console.log(error);
    }
  }

  static async showAllProfile(req, res) {
    try {
      return res.json(await ProfileRepository.findAllProfile());
    } catch (error) {
      console.log(error);
    }
  }

  static async showProfile(req, res) {
    const { idProfile } = req.params;
    try {
      return res.json(await ProfileRepository.showOneProfile(idProfile));
    } catch (error) {
      console.log(error);
    }
  }

  static async updateProfile(req, res) {
    const { userId, idProfile } = req.params;
    const { username } = req.body;

    try {
      return res.json(
        await ProfileRepository.updateProfile(userId, idProfile, username)
      );
    } catch (error) {}
  }

  static async deleteProfile(req, res) {
    const { idProfile, userId } = req.params;
    try {
      return res.json(await ProfileRepository.deleteProfile(idProfile, userId));
    } catch (error) {
      console.log(error);
    }
  }
  static async follow(req, res) {
    const { profileCurrentId, profileTargetId } = req.params;
    try {
      return res.json(
        await ProfileRepository.followProfile(profileCurrentId, profileTargetId)
      );
    } catch (error) {
      console.log(error);
    }
  }
  static async unfollow(req, res) {
    const { profileCurrentId, profileTargetId } = req.params;
    try {
      return res.json(
        await ProfileRepository.unfollowProfile(
          profileCurrentId,
          profileTargetId
        )
      );
    } catch (error) {
      console.log(error);
    }
  }
};
