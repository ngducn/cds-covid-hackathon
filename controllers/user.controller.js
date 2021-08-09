const utilsHelper = require("../helpers/util.helper");
const User = require("../models/User");

const userController = {};

userController.createUser = async (req, res, next) => {
  try {
    let { name, image, address, phone, status } = req.body;
    let user = await User.findOne({ phone });
    if (user) return next(new Error("401 - User already exits"));

    user = await User.create({
      name,
      address,
      phone,
      status,
    });
    return utilsHelper.sendResponse(
      res,
      200,
      true,
      user,
      null,
      "Create User Successfully"
    );
  } catch (err) {
    next(err);
  }
};

module.exports = userController;
