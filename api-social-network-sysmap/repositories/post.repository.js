const User = require("../schemas/user.schema");
const Post = require("../schemas/post.schema");
const Comment = require("../schemas/comment.schema");

exports.createPost = async (userId, title, description) => {
  try {
    const user = await User.findById(userId);

    if (!user) {
      return { message: "user not found!" };
    }
    const post = await Post.create({
      userId,
      title,
      description,
    });

    return post;
  } catch (error) {
    console.log(error);
  }
};

exports.showPost = async () => {
  try {
    const posts = await Post.find({});
    if (posts.length === 0) {
      return { message: "there is no post" };
    }
    return posts;
  } catch (error) {
    console.log(error);
  }
};

exports.showAllUserPost = async (userId) => {
  try {
    const user = await User.findById(userId);

    if (!user) {
      return { message: "user not found!" };
    }

    const posts = await Post.find({ userId: userId });

    if (!posts) {
      return { message: "this user did not post" };
    }
    return posts;
  } catch (error) {
    console.log(error);
  }
};

exports.showOneUserPost = async (userId, postId) => {
  try {
    const user = await User.findById(userId);

    if (!user) {
      return { message: "user not found!" };
    }

    const post = await Post.findOne({ _id: postId, userId: userId });

    if (!post) {
      return { message: "user without credentials to access this resource" };
    }

    return post;
  } catch (error) {
    console.log(error);
  }
};

exports.updatePost = async (userId, postId, title, description) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      return { message: "user not found" };
    }
    const currentPost = await Post.findOne({ _id: postId, userId: userId });
    if (!currentPost) {
      return { message: "post not found" };
    }

    const post = {
      title,
      description,
    };

    await Post.findByIdAndUpdate(postId, post);

    const updatePost = await Post.findById(postId);

    return updatePost;
  } catch (error) {
    console.log(error);
  }
};

exports.deletePost = async (userId, postId) => {
  try {
    const user = await User.findById(userId);
    console.log(user);
    if (!user) {
      return { message: "user not found" };
    }
    const currentPost = await Post.findOne({ _id: postId, userId: userId });
    if (!currentPost) {
      return { message: "post not found" };
    }

    await Comment.find({ assignedTo: userId }).deleteMany();
    await Post.findByIdAndRemove(postId);

    return { message: "deleted post and all its information" };
  } catch (error) {
    console.log(error);
  }
};
