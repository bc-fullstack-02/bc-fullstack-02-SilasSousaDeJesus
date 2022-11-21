const PostRepository = require("../repositories/post.repository");

module.exports = class Post {
  static async createPost(req, res) {
    try {
      const { title, description } = req.body;
      const { userId } = req.params;
      return res.json(
        await PostRepository.createPost(userId, title, description)
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
  static async showAllUserPosts(req, res) {
    try {
      return res.json(await PostRepository.showAllUserPost(req.params.userId));
    } catch (error) {
      console.log(error);
    }
  }
  static async showOneUserPost(req, res) {
    try {
      return res.json(
        await PostRepository.showOneUserPost(
          req.params.userId,
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
      const { userId, postId } = req.params;
      return res.json(
        await PostRepository.updatePost(userId, postId, title, description)
      );
    } catch (error) {
      console.log(error);
    }
  }
  static async deletePost(req, res) {
    try {
      const { userId, postId } = req.params;
      return res.json(await PostRepository.deletePost(userId, postId));
    } catch (error) {
      console.log(error);
    }
  }
};
