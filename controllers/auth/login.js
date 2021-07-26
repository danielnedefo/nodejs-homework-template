const jwt = require("jsonwebtoken");
const User = require("../../schema");
require("dotenv").config();

const login = async (req, res, next) => {
  const {
    body: { password, email },
  } = req;
  try {
    const user = await User.findOne(email);
    if (!user || !user.validatePassword(password)) {
      res.status(400).json({
        status: "error",
        code: 400,
        message: "Incorrect email or password",
      });
      return;
    }
    const { SECRET_KEY } = process.env;
    const payload = { id: user._id };
    const token = jwt.sign(payload, SECRET_KEY);
    await User.findByIdAndUpdate(user._id, { ...user, token });
    res.json({
      status: "success",
      code: 200,
      data: {
        result: token,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = login
