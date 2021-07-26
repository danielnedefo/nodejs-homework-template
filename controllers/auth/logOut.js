const User = require("../../schema")

const logOut = async (req, res, next) => {
  const { _id } = req.user
  try {
    await User.findByIdAndUpdate(_id, { ...req.user, token: null })
    res.json({
      status: "success",
      code: 200,
      message: "Logout success",
    })
  } catch (error) {
    next(error)
  }
}
module.exports = logOut
