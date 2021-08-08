const {
  catchAsync,
  AppError,
  sendResponse,
} = require("../helpers/util.helper");
const Store = require("../models/Store");
const bcrypt = require("bcrypt");
const storeController = {};

storeController.createStore = catchAsync(async (req, res) => {
  let { name, password, address, phone } = req.body;
  // const admin = req.adminId; final stage
  const admin = "ObjectId";

  //bug not an array
  let fullAddress = Object.values.reduce((a, b) => a + b);

  let store = await Store.findOne({ fullAddress });
  if (store)
    return next(
      new AppError(300, "Store exist with same location", "Create Store Error")
    );
  const salt = await bcrypt.genSalt(10);
  password = await bcrypt.hash(password, salt);

  store = await Store.create({
    name,
    password,
    address,
    phone,
    admin,
  });

  const accessToken = store.generateToken();
  sendResponse(
    res,
    200,
    true,
    { store, accessToken },
    null,
    "create store success"
  );
});
module.exports = storeController;
