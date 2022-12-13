const Profile = require("../schemas/profile.schema");
const Post = require("../schemas/post.schema");
const Comment = require("../schemas/comment.schema");

exports.createPost = async (profileId, title, description) => {
  try {
    console.log(profileId, title, description);
    const profile = await Profile.findById(profileId);
    console.log(profile);

    if (!profile) {
      return { message: "profile not found!" };
    }
    const post = await Post.create({
      profile: profileId,
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
    const posts = await Post.find({ raw: true }).populate("profile");
    if (posts.length === 0) {
      return { message: "there is no post" };
    }
    return posts;
  } catch (error) {
    console.log(error);
  }
};

exports.feedProfile = async (profileId) => {
  try {
    const profile = await Profile.findById(profileId);

    if (!profile) {
      return { message: "profile not found!" };
    }

    const posts = await Post.find({ profile: profileId }.populate("profile"));
    if (!posts) {
      return { message: "this profile did not post" };
    }
    return posts;
  } catch (error) {
    console.log(error);
  }
};

exports.showOnePost = async (postId) => {
  try {
    const post = await Post.findOne({ _id: postId}).populate(
      "profile"
    );

    if (!post) {
      return { message: "post not found" };
    }

    return post;
  } catch (error) {
    console.log(error);
  }
};

exports.updatePost = async (profileId, postId, title, description) => {
  try {
    const profile = await Profile.findById(profileId);
    if (!profile) {
      return { message: "profile not found" };
    }
    const currentPost = await Post.findOne({ _id: postId, profile: profileId });
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

exports.deletePost = async (profileId, postId) => {
  try {
    const profile = await Profile.findById(profileId);

    if (!profile) {
      return { message: "profile not found" };
    }
    const currentPost = await Post.findOne({ _id: postId, profile: profileId });
    if (!currentPost) {
      return { message: "post not found" };
    }

    await Comment.find({ post: postId }).deleteMany();
    await Post.findByIdAndRemove(postId);

    return { message: "deleted post and all its information" };
  } catch (error) {
    console.log(error);
  }
};

exports.likeAPost = async (currentProfileId, postTargetId) => {
  const currentProfile = await Profile.findById(currentProfileId);
  if (!currentProfile) {
    return { message: "Profile not found" };
  }
  const postTarget = await Post.findById(postTargetId);
  if (!postTarget) {
    return { message: "post not found" };
  }

  const profile = await Profile.findById(postTarget.profile);

  if (!currentProfile.myLikes.includes(postTargetId)) {
    await currentProfile.updateOne({ $push: { myLikes: postTargetId } });
    await postTarget.updateOne({ $push: { likes: currentProfileId } });
    return { message: `you liked a post by  ${profile.name}` };
  }

  if (currentProfile.myLikes.includes(postTargetId)) {
    return { message: "you already liked this post" };
  }
};

exports.deslikeAPost = async (currentProfileId, postTargetId) => {
  const currentProfile = await Profile.findById(currentProfileId);
  if (!currentProfile) {
    return { message: "Profile not found" };
  }
  const postTarget = await Post.findById(postTargetId);
  if (!postTarget) {
    return { message: "post not found" };
  }

  const profile = await Profile.findById(postTarget.profile);

  if (currentProfile.myLikes.includes(postTargetId)) {
    await currentProfile.updateOne({ $pull: { myLikes: postTargetId } });
    await postTarget.updateOne({ $pull: { likes: currentProfileId } });
    return { message: `you desliked a post by  ${profile.name}` };
  }

  if (!currentProfile.myLikes.includes(postTargetId)) {
    return { message: "you already disliked this post" };
  }
};

exports.timeline = async (profileId) => {
  try {
    const currentProfileUser = await Profile.findById(profileId);
    const currentProfilePosts = await Post.find({ profile: profileId });
    let networkPosts = [];
    await Promise.all(
      currentProfileUser.following.map(async (networkId) => {
        const posts = await Post.find({ profile: networkId });
        return networkPosts.push(posts);
      })
    );
    const timelineCurrent = currentProfilePosts.concat(...networkPosts);
    return timelineCurrent;
  } catch (error) {
    console.log(error);
  }
};
