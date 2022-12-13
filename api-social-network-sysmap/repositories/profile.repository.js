const User = require("../schemas/user.schema");
const Profile = require("../schemas/Profile.schema");
const Post = require("../schemas/post.schema");
const Comment = require("../schemas/comment.schema");

exports.createProfile = async (name, userId) => {
  try {
    if (!name || !userId) {
      return { message: "empty  field" };
    }
    const userCurrent = await User.findById(userId);
    if (!userCurrent) {
      return { message: "user not found" };
    }
    const profileNameExisting = await Profile.findOne({ name });
    console.log(profileNameExisting);
    if (profileNameExisting) {
      return { message: "Profile Name Existing" };
    }
    const profileExisting = await Profile.findOne({ user: userId });
    if (profileExisting) {
      return { message: "Profile Existing" };
    }

    const profile = await Profile.create({ name: name, user: userId });

    return profile;
  } catch (error) {
    console.log(error);
  }
};

exports.findAllProfile = async () => {
  try {
    const profile = await Profile.find({ raw: true }).populate("user");

    if (profile == "" || profile == null || !profile) {
      return { message: "there are no registered profile" };
    }

    return profile;
  } catch (error) {
    console.log(error);
  }
};

exports.showOneProfile = async (idProfile) => {
  try {
    const profile = await Profile.findById(idProfile).populate("user");
    if (!profile) {
      return { message: "profile not found" };
    }
    return profile;
  } catch (error) {
    console.log(error);
  }
};

exports.updateProfile = async (userId, idProfile, name) => {
  try {
    console.log(userId, idProfile, name);
    const profile = await Profile.findOne({ user: userId });
    if (!profile) {
      return { message: "user or profile not found" };
    }

    const userNameExisting = await Profile.findOne({ name });
    if (userNameExisting) {
      return { message: "UserName Existing" };
    }
    await Profile.findByIdAndUpdate(idProfile, { name }, { raw: true });
    const profileUpdate = await Profile.findById(idProfile);
    return { message: "profile updated!", profileUpdate };
  } catch (error) {
    console.log(error);
  }
};

exports.deleteProfile = async (idProfile, userId) => {
  try {
    const userCurrent = await User.findById(userId);
    if (userCurrent == "" || userCurrent == null || !userCurrent) {
      return { message: "User Not Found or User Disabled" };
    }

    const profile = await Profile.findOne({ user: userId });
    if (!profile) {
      return { message: "user or profile not found" };
    }

    await Comment.find({ where: { assignedTo: userId } }).deleteMany();
    await Post.find({ where: { profile: idProfile } }).deleteMany();
    await Profile.findByIdAndRemove(idProfile);
    return { message: "Profile and all your information has been deleted" };
  } catch (error) {
    console.log(error);
  }
};

exports.followProfile = async (profileCurrentId, profileTargetId) => {
  try {
    if (profileCurrentId === profileTargetId) {
      return { message: "you can't follow yourself" };
    }
    const currentProfile = await Profile.findById(profileCurrentId);
    const targetProfile = await Profile.findById(profileTargetId);
    if (!currentProfile) {
      return { message: "profile not found" };
    }
    if (!targetProfile) {
      return { message: "profile target not found" };
    }
    const UserName = targetProfile.name;
    const checkFollowin = currentProfile.following.includes(profileTargetId);
    if (checkFollowin) {
      return { message: ` you already follow this ${UserName} ` };
    }
    if (!checkFollowin) {
      await currentProfile.updateOne({ $push: { following: profileTargetId } });
      await targetProfile.updateOne({
        $push: { followers: profileCurrentId },
      });
      return { message: `you followed ${UserName}` };
    }
  } catch (error) {
    console.log(error);
  }
};

exports.unfollowProfile = async (profileCurrentId, profileTargetId) => {
  if (profileCurrentId === profileTargetId) {
    return { message: "this action is not possible" };
  }
  const currentProfile = await Profile.findById(profileCurrentId);
  const targetProfile = await Profile.findById(profileTargetId);
  if (!currentProfile) {
    return { message: "current Profile not found" };
  }
  if (!targetProfile) {
    return { message: "target Profile target not found" };
  }
  const UserName = targetProfile.name;

  if (currentProfile.following.includes(profileTargetId)) {
    await currentProfile.updateOne({ $pull: { following: profileTargetId } });
    await targetProfile.updateOne({ $pull: { followers: profileCurrentId } });
    return { message: `you unfollowed ${UserName}` };
  }
  if (!currentProfile.following.includes(profileTargetId)) {
    return { message: `you do not currently follow this user` };
  }
};


exports.likePost = async (profileCurrentId, postId) => {
  try {
    const profileCurrent = Profile.findById(profileCurrentId);
    if (!profileCurrent) {
      return { message: "profile  not found" };
    }
    const postTarget = Post.findById(postId);
    if (!postTarget) {
      return { message: "post  not found" };
    }

    const checkLikePost = profileCurrent.myLikes.includes(postId);
    if (checkLikePost) {
      return { message: "you already liked this post" };
    }
    if (!checkLikePost) {
      await profileCurrent.updateOne({ $push: { myLikes: postId } });
      await postTarget.updateOne({
        $push: { likes: profileCurrentId },
      });
      return { message: `you liked this post` };
    }
  } catch (error) {
    console.log(error);
  }
};

exports.deslikedPost = async (profileCurrentId, postId) => {
  try {
    const profileCurrent = Profile.findById(profileCurrentId);
    if (!profileCurrent) {
      return { message: "profile  not found" };
    }
    const postTarget = Post.findById(postId);
    if (!postTarget) {
      return { message: "post  not found" };
    }

    const checkLikePost = profileCurrent.myLikes.includes(postId);
    if (!checkLikePost) {
      return { message: "you didn't like this post" };
    }
    if (checkLikePost) {
      await profileCurrent.updateOne({ $pull: { myLikes: postId } });
      await postTarget.updateOne({
        $pull: { likes: profileCurrentId },
      });
      return { message: `you disliked this post` };
    }
  } catch (error) {
    console.log(error);
  }
};
