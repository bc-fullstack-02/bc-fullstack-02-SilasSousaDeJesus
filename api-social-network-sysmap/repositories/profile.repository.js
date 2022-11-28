const User = require("../schemas/user.schema");
const Profile = require("../schemas/Profile.schema");
const Post = require("../schemas/post.schema");

exports.createProfile = async (username, userId) => {
  try {
    if (!username || !userId) {
      return { message: "empty  field" };
    }
    const user = await User.findById(userId);
    if (!user) {
      return { message: "user not found" };
    }
    const userNameExisting = await Profile.findOne({ username });
    if (userNameExisting) {
      return { message: "UserName Existing" };
    }
    const profileExisting = await Profile.findOne({ user: userId });
    if (profileExisting) {
      return { message: "Profile Existing" };
    }

    const profile = await Profile.create({ username: username, user: userId });

    return profile;
  } catch (error) {
    console.log(error);
  }
};

exports.findAllProfile = async () => {
  try {
    const profile = await Profile.find({ raw: true });

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
    const profile = await Profile.findById(idProfile);
    if (!profile) {
      return { message: "profile not found" };
    }
    return profile;
  } catch (error) {
    console.log(error);
  }
};

exports.updateProfile = async (userId, idProfile, username) => {
  try {
    const profile = await Profile.findOne({ user: userId });
    if (!profile) {
      return { message: "user or profile not found" };
    }

    const userNameExisting = await Profile.findOne({ username });
    if (userNameExisting) {
      return { message: "UserName Existing" };
    }
    await Profile.findByIdAndUpdate(idProfile, { username }, { raw: true });
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
      return { message: "user not found" };
    }
    if (!targetProfile) {
      return { message: "user target not found" };
    }
    const UserName = targetProfile.username;
    const checkFollowin = currentProfile.following.includes(profileTargetId);
    if (checkFollowin) {
      return { message: ` you already follow this ${targetProfile.username} ` };
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
  try {
    if (profileCurrentId === profileTargetId) {
      return { message: "this action is not possible" };
    }
    const currentProfile = await Profile.findById(profileCurrentId);
    const targetProfile = await Profile.findById(profileTargetId);
    const UserName = targetProfile.username;
    if (!currentProfile) {
      return { message: "user not found" };
    }
    if (!targetProfile) {
    }
    const checkFollowin = currentProfile.following.includes(profileTargetId);

    if (checkFollowin) {
      await currentProfile.updateOne({ $pull: { following: profileTargetId } });
      await targetProfile.updateOne({
        $pull: { followers: profileCurrentId },
      });
      return { message: `you unfollowed ${UserName}` };
    }
    if (!currentProfile.followers.includes(profileCurrentId)) {
      return { message: `you do not currently follow this user` };
    }
  } catch (error) {
    console.log(error);
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
    if(checkLikePost){
      return { message: "you already liked this post" };
    }
    if(!checkLikePost){
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
    if(!checkLikePost){
      return { message: "you didn't like this post" };
    }
    if(checkLikePost){
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

exports.timeLine = async () => {};
