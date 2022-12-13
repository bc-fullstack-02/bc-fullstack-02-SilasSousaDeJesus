const User = require("../schemas/user.schema");
const Post = require("../schemas/post.schema");
const Comment = require("../schemas/comment.schema");
const Profile = require("../schemas/profile.schema");

exports.createUser = async (user, password) => {
  try {
    if (user == "" || user == null || !user) {
      return { message: "empty name field" };
    }

    if (password == "" || password == null || !password) {
      return { message: "empty password field" };
    }

    const userExisting = await User.findOne({ user });

    if (userExisting) {
      return { message: "user Existing" };
    }

    const newUser = await User.create({
      user,
      password,
    });

    return newUser;
  } catch (error) {
    console.log(error);
  }
};

exports.findAllUsers = async () => {
  try {
    const users = await User.find().select("+profile");
    if (users == "" || users == null || !users) {
      return { message: "there are no registered users" };
    }

    return users;
  } catch (error) {
    console.log(error);
  }
};

exports.showUser = async (id) => {
  try {
    const user = await User.findById(id);

    if (!user) {
      return { message: "User not found" };
    }
    return user;
  } catch (error) {
    console.log(error);
  }
};

exports.updateUser = async (id, user, password) => {
  try {
    console.log(id, user, password);
    await User.findByIdAndUpdate(id, { user, password });
    const userUpdate = await User.findById(id);
    if (!userUpdate) {
      return { message: "user not found" };
    }
    return { message: "user updated!" };
  } catch (error) {
    console.log(error);
  }
};

exports.deleteUser = async (id) => {
  try {
    const userCurrent = await User.findById(id);
    const profileCurrent = await Profile.findOne({ where: { user: id } });

    if (userCurrent == "" || userCurrent == null || !userCurrent) {
      return { message: "User Not Found or User Disabled" };
    }
    await Comment.find({ assignedTo: id }).deleteMany();
    await Post.find({ profile: profileCurrent._id }).deleteMany();
    await Profile.findByIdAndDelete(profileCurrent._id);
    await User.findByIdAndRemove(id);
    return { message: "Username and all your information has been deleted" };
  } catch (error) {
    console.log(error);
  }
};
