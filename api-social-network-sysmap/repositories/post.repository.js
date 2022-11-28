const User = require("../schemas/user.schema");
const Profile = require("../schemas/profile.schema");
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

exports.likeAPost = async (CurrentProfileId, postTargetId) => {
  const currentProfile = await Profile.findById(CurrentProfileId);
  if (!currentProfile) {
    return { message: "Profile not found" };
  }
  const postTarget = await Post.findById(postTargetId);
  if (!postTarget) {
    return { message: "post not found" };
  }

  const user = await User.findById(postTarget.userId);
  const profile = await Profile.findById(user.profile);

  if (!currentProfile.myLikes.includes(postTargetId)) {
    await currentProfile.updateOne({ $push: { myLikes: postTargetId } });
    await postTarget.updateOne({ $push: { likes: CurrentProfileId } });
    return { message: `you liked a post by  ${profile.username}` };
  }
};

exports.deslikeAPost = async (CurrentProfileId, postTargetId) => {
  const currentProfile = await Profile.findById(CurrentProfileId);
  if (!currentProfile) {
    return { message: "Profile not found" };
  }
  const postTarget = await Post.findById(postTargetId);
  if (!postTarget) {
    return { message: "post not found" };
  }

  const user = await User.findById(postTarget.userId);
  const profile = await Profile.findById(user.profile);

  if (currentProfile.myLikes.includes(postTargetId)) {
    await currentProfile.updateOne({ $push: { myLikes: postTargetId } });
    await postTarget.updateOne({ $push: { likes: CurrentProfileId } });
    return { message: `you desliked a post by  ${profile.username}` };
  }
};

exports.timeline = async (currentUserId) => {
  try {
    const currentUser = await User.findById(currentUserId);
    const currentProfileUser = await Profile.findById(currentUser.profile._id);
    const currentUserPosts = await Post.find({ userId: currentUser._id });

    const networkPosts = await Promise.all(
      currentProfileUser.following.map((networkId) => {
       return  Post.find({ userId: networkId });
      })
    );

    return currentUserPosts.concat(...networkPosts)
  } catch (error) {
    console.log(error);
  }
};
