const User = require("../schemas/user.schema");
const Post = require("../schemas/post.schema");
const Comment = require("../schemas/comment.schema");

exports.createComment = async (userId, postId, description) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      return { message: "user not found!" };
    }
    const post = await Post.findById(postId);
    if (!post) {
      return { message: "post not found!" };
    }

    const descriptionCurrent = await Comment.create({
      assignedTo: userId,
      postId: postId,
      description: description,
    });

    const sendingComment = await Post.findById(postId);
    sendingComment.comments.push(descriptionCurrent);
    await Post.findByIdAndUpdate(postId, sendingComment);

    return descriptionCurrent;
  } catch (error) {
    console.log(error);
  }
};
exports.showAllComment = async () => {
  try {
    const descriptions = await Comment.find({});
    console.log(descriptions);
    if (descriptions.length === 0) {
      return { message: "there is no comment" };
    }
    return descriptions;
  } catch (error) {
    console.log(error);
  }
};
exports.showAllUserComment = async (userId) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      return { message: "user not found!" };
    }

    const descriptions = await Comment.find({assignedTo: userId});
    if (descriptions.length === 0) {
      return { message: "there is no comment" };
    }
    return descriptions;
  } catch (error) {
    console.log(error);
  }
};
exports.allCommentUserPost = async (userId, postId) => {
  try {
    const descriptions = await Comment.find({assignedTo: userId, postId:postId});
    if (descriptions.length === 0) {
      return { message: "there is no comment" };
    }
    return descriptions;
  } catch (error) {
    console.log(error);
  }
};
