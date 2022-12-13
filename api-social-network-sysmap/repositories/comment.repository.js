const Profile = require("../schemas/profile.schema");
const Post = require("../schemas/post.schema");
const Comment = require("../schemas/comment.schema");
exports.createComment = async (profileId, postId, description) => {
  try {
    const profile = await Profile.findById(profileId);

    if (!profile) {
      return { message: "profile not found!" };
    }
    const post = await Post.findById(postId);
    if (!post) {
      return { message: "post not found!" };
    }

    const descriptionCurrent = await Comment.create({
      profile: profileId,
      post: postId,
      description: description,
    });

    const sendingComment = post;
    sendingComment.comments.push(descriptionCurrent);
    await Post.findByIdAndUpdate(postId, sendingComment);

    return descriptionCurrent;
  } catch (error) {
    console.log(error);
  }
};
exports.showAllComment = async () => {
  try {
    const comments = await Comment.find({});
    if (comments.length === 0) {
      return { message: "there is no comment" };
    }
    return comments;
  } catch (error) {
    console.log(error);
  }
};
exports.allCommentPost = async (postId) => {
  try {
    const comments = await Comment.find({ post: postId });
    if (comments.length === 0) {
      return { message: "there is no comment" };
    }
    return comments;
  } catch (error) {
    console.log(error);
  }
};
exports.updateComment = async (profileId, postId, commentId, description) => {
  const profile = await Profile.findById(profileId);
  if (!profile) {
    return { message: "profile not found" };
  }
  const post = await Post.findById(postId);
  if (!post) {
    return { message: "profile not found" };
  }
  const comment = await Comment.findOne({
    _id: commentId,
    post: postId,
    profile: profileId,
  });
  if (!comment) {
    return { message: "profile not found" };
  }
  const updateComment = {
    description: description,
  };
  await Comment.findByIdAndUpdate(commentId, updateComment);

  return { message: "comment successfully updated" };
};
exports.deleteComment = async (profileId, postId, commentId) => {
  
  const profile = await Profile.findById(profileId);

  if (!profile) {
    return { message: "profile not found" };
  }
  const post = await Post.findById(postId);
  if (!post) {
    return { message: "post not found" };
  }
  const comment = await Comment.findOne({
    _id: commentId,
    post: postId,
    profile: profileId,
  });

  const postCurrent = await Post.findById(postId);
  await postCurrent.updateOne({ $pull: { comments: commentId } });
 
  await Comment.findOne({
    _id: commentId,
    post: postId,
    profile: profileId,
  }).deleteOne();
  return { message: "successfully deleted comment" };
};
