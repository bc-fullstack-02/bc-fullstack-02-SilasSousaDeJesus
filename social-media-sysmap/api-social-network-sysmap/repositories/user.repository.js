const User = require("../schemas/user.schema");
const Post = require("../schemas/post.schema");
const Comment = require("../schemas/comment.schema");

exports.createUser = async (name, lastname, username, email, password) => {
  try {
    if (name == "" || name == null || !name) {
      return { message: "empty name field" };
    }
    if (lastname == "" || lastname == null || !lastname) {
      return { message: "empty lastname field" };
    }
    if (username == "" || username == null || !username) {
      return { message: "empty username field" };
    }

    if (email == "" || email == null || !email) {
      return { message: "empty email field" };
    }

    if (password == "" || password == null || !password) {
      return { message: "empty password field" };
    }

    const userNameExisting = await User.findOne({ username });
    if (userNameExisting) {
      return { message: "UserName Existing" };
    }

    const emailExisting = await User.findOne({ email });
    if (emailExisting) {
      return { message: "Email Existing" };
    }

    const user = await User.create({
      name,
      lastname,
      username,
      email,
      password,
    });

    return { user };
  } catch (error) {
    console.log(error);
  }
};

exports.findAllUsers = async () => {
  try {
    const users = await User.find({ raw: true });

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

exports.updateUser = async (id, name, lastname, username, email) => {
  try {
    await User.findByIdAndUpdate(
      id,
      { name, lastname, username, email },
      { raw: true }
    );
    const userUpdate = await User.findById(id);
    return { message: "user updated!" };
  } catch (error) {
    console.log(error);
  }
};

exports.deleteUser = async (id) => {
  try {
    const userCurrent = await User.findById(id);
    if (userCurrent == "" || userCurrent == null || !userCurrent) {
      return { message: "User Not Found or User Disabled" };
    }

    await Post.find({ userId: id }).deleteMany();
    await Comment.find({ assignedTo: id }).deleteMany();
    await User.findByIdAndRemove(id);
    return { message: "Username and all your information has been deleted" };
  } catch (error) {
    console.log(error);
  }
};
