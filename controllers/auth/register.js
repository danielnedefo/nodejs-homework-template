const User = require("../../schema");

const register = async (req, res, next) => {
  const { email } = req.body;
  try {
    const user = User.findOne(email);
    if (user) {
      res.status(409).json({
        status: "success",
        code: 409,
        message: "already register",
      });
    }
    const { password, ...data } = req.body;
    const newUser = new User(data);
    newUser.setPassword(password);
    await newUser.save();
    const { password: pass, ...result } = newUser;
    res.status(201).json({
      status: "success",
      code: 201,
      message: "Successfuly create",
      data: {
        result,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = register;
