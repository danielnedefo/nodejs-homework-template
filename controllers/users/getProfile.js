const jwt = require("jsonwebtoken");
const User = require("../../schema");
require("dotenv").config();
const getProfile = async (req, res, next) => {
  try {
    const { TOKEN_KEY } = process.env;
    const [, token] = req.headers.Authorization.split(" ");
    const { id } = jwt.verify(token, TOKEN_KEY);
    const user = await User.findById(id);
    res.json({
      status: "success",
      code: 200,
      data: {
        result: user,
      },
    });
  } catch (error) {
    res.status(403).json({
      status: "error",
      code: 403,
      message: "Invalid token",
    });
  }
}

module.exports = getProfile;
