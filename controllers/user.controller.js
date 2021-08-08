const utilsHelper = require("../helpers/util.helper");
const Users = require("../models/User");

const userController = {};

userController.createUser = async (req, res, next) => {
  try {
    let { name, image, address, phone, status } = req.body;
    let user = await Users.findOne({ phone });
    if (user) return next(new Error("401 - User already exits"));

    user = await Users.create({
      name,
      image,
      address,
      phone,
      status,
    });
    utilsHelper.sendResponse(
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

// userController.geteUser = async (params) => {
//   let { params } = params;
//   let user = await Users.find();
// };
