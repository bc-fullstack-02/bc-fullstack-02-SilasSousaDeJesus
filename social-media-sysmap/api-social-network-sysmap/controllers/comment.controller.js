const CommentRepository = require("../repositories/comment.repository");

module.exports = class Post {
  static async createComment(req, res) {
    try {
      const { description } = req.body;
      const { userId, postId } = req.params;
      return res.json(
        await CommentRepository.createComment(userId, postId, description)
      );
    } catch (error) {
      console.log(error);
    }
  }
  static async showAllComment(req, res) {
    try {
      return res.json(await CommentRepository.showAllComment());
    } catch (error) {
      console.log(error);
    }
  }
  static async showAllUserComment(req, res) {
    try {
      return res.json(
        await CommentRepository.showAllUserComment(req.params.userId)
      );
    } catch (error) {
      console.log(error);
    }
  }
  static async allCommentUserPost(req, res) {
    try {
      return res.json(
        await CommentRepository.allCommentUserPost(
          req.params.userId,
          req.params.postId
        )
      );
    } catch (error) {
      console.log(error);
    }
  }
  static async updateComment(req, res) {
    try {
      const { title, description } = req.body;
      const { userId, postId } = req.params;
      return res.json(
        await CommentRepository.updatePost(userId, postId, title, description)
      );
    } catch (error) {
      console.log(error);
    }
  }
  static async deleteComment(req, res) {
    try {
      return res.json(await CommentRepository.deletePost());
    } catch (error) {
      console.log(error);
    }
  }
};
