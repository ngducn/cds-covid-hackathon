const User = require("../models/User");
const bcrypt = require("bcrypt");
const {
  catchAsync,
  sendResponse,
  AppError,
} = require("../helpers/util.helper");
const userController = {};

userController.createUser = catchAsync(async (req, res, next) => {
  let { name, image, address, phone, status, password } = req.body;
  //is phone number
  let user = await User.findOne({ phone });

  if (user) return next(new Error("401 - User already exits"));

  const salt = await bcrypt.genSalt(10);

  if (!password) {
    password = "name" + Math.floor(Math.random() * 10);
  }
  password = await bcrypt.hash(password, salt);

  user = await User.create({
    name,
    address,
    phone,
    status,
    password,
  });

  const accessToken = await user.generateToken();

  return sendResponse(
    res,
    200,
    true,
    { user, accessToken },
    null,
    "Create User Successfully"
  );
});

userController.getUsers = catchAsync(async (req, res, next) => {
  let { page, limit, sortBy, ...filter } = { ...req.query };
  page = parseInt(page) || 1;
  limit = parseInt(limit) || 10;

  const totalUsers = await User.countDocuments({
    ...filter,
    isDeleted: false,
  });
  const totalPages = Math.ceil(totalUsers / limit);
  const offset = limit * (page - 1);

  let user = await User.find(filter)
    .sort({ ...sortBy, createdAt: -1 })
    .skip(offset)
    .limit(limit);

  return sendResponse(res, 200, true, { user, totalPages }, null, "");
});

userController.getSingleUser = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findById(id);
  if (!user)
    return next(new AppError(400, "User not found", "Get Current User Error"));
  return sendResponse(
    res,
    200,
    true,
    { user },
    null,
    "Get current user successful"
  );
});

module.exports = userController;
