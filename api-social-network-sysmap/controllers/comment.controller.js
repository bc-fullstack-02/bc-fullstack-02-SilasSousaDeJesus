const CommentRepository = require("../repositories/comment.repository");

module.exports = class Post {
  static async createComment(req, res) {
    try {
      const { description } = req.body;
      const { profileId, postId } = req.params;
      return res.json(
        await CommentRepository.createComment(profileId, postId, description)
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
  static async allCommentPost(req, res) {
    try {
      const { postId } = req.params;
      return res.json(await CommentRepository.allCommentPost(postId));
    } catch (error) {
      console.log(error);
    }
  }
  static async updateComment(req, res) {
    try {
      const { description } = req.body;
      const { profileId, commetId, postId } = req.params;
      return res.json(
        await CommentRepository.updateComment(
          profileId,
          postId,
          commetId,
          description
        )
      );
    } catch (error) {
      console.log(error);
    }
  }
  static async deleteComment(req, res) {
    try {
      const { profileId, commetId, postId } = req.params;
    
      return res.json(await CommentRepository.deleteComment(profileId, postId, commetId));
    } catch (error) {
      console.log(error);
    }
  }
};
