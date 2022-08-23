const User = require("../model/userModel");
const bcrypt = require("bcrypt");

module.exports.register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    const hashedPass = await bcrypt.hash(password, 10);

    const user = await User.create({
      email,
      username,
      password: hashedPass,
    });

    delete user.password;

    return res.json({ status: true, user });
  } catch (e) {
    next(e);
  }
};
