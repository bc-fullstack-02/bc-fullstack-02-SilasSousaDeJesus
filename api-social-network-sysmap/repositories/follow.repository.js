const Profile = require("../schemas/profile.schema");

exports.followUser = async (profileCurrentId, profileTargetId) => {
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
  if (!currentProfile.followers.includes(profileCurrentId)) {
    await currentProfile.updateOne({ $push: { followers: targetProfile } });
    await targetProfile.updateOne({ $push: { followings: profileCurrentId } });
    return { message: `you followed ${UserName}` };
  }
  if (currentProfile.followers.includes(profileCurrentId)) {
    return { message: "you already follow this user" };
  }
};
exports.unfollowUser = async (profileCurrentId, profileTargetId) => {
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
    return { message: "user target not found" };
  }

  if (currentProfile.followers.includes(profileCurrentId)) {
    await currentProfile.updateOne({ $push: { followers: targetProfile } });
    await targetProfile.updateOne({ $push: { followings: profileCurrentId } });
    return { message: `you unfollowed ${UserName}` };
  }
  if (!currentProfile.followers.includes(profileCurrentId)) {
    return { message: `you do not currently follow this user` };
  }
};
