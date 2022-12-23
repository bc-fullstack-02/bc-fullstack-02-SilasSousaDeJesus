const PostRepository = require("../repositories/post.repository");

module.exports = class Post {
  static async createPost(req, res) {
    try {
      const { title, description } = req.body;
      const { profileId } = req.params;
      return res.json(
        await PostRepository.createPost(profileId, title, description)
      );
    } catch (error) {
      console.log(error);
    }
  }
  static async showAllPost(req, res) {
    try {
      return res.json(await PostRepository.showPost());
    } catch (error) {
      console.log(error);
    }
  }
  static async feedProfile(req, res) {
    try {
      return res.json(await PostRepository.feedProfile(req.params.profileId));
    } catch (error) {
      console.log(error);
    }
  }
  static async showOnePost(req, res) {
    try {
      return res.json(
        await PostRepository.showOnePost(
          req.params.postId
        )
      );
    } catch (error) {
      console.log(error);
    }
  }
  static async updatePost(req, res) {
    try {
      const { title, description } = req.body;
      const { profileId, postId } = req.params;
      return res.json(
        await PostRepository.updatePost(profileId, postId, title, description)
      );
    } catch (error) {
      console.log(error);
    }
  }
  static async deletePost(req, res) {
    try {
      const { profileId, postId } = req.params;
      return res.json(await PostRepository.deletePost(profileId, postId));
    } catch (error) {
      console.log(error);
    }
  }
  static async like(req, res) {
    try {
      const { currentProfileId, postTargetId } = req.params;
      return res.json(
        await PostRepository.likeAPost(currentProfileId, postTargetId)
      );
    } catch (error) {
      console.log(error);
    }
  }
  static async deslike(req, res) {
    try {
      const { currentProfileId, postTargetId } = req.params;
      return res.json(
        await PostRepository.deslikeAPost(currentProfileId, postTargetId)
      );
    } catch (error) {
      console.log(error);
    }
  }

  static async timelime(req, res) {
    try {
      const { profileId } = req.params;
      return res.json(
        await PostRepository.timeline(profileId)
      );
    } catch (error) {
      console.log(error);
    }
  }
};
