const {
  catchAsync,
  AppError,
  sendResponse,
} = require("../helpers/util.helper");
const Store = require("../models/Store");
const storeController = {};

storeController.createStore = catchAsync(async (req, res, next) => {
  //assume only admin could create store
  //assume admin create store that is not duplicate
  // const admin = req.adminId; final stage
  let { name, address, phone } = req.body;
  const admin = "ObjectId";

  const store = await Store.create({
    name,
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

storeController.getAll = catchAsync(async (req, res, next) => {
  let { page, limit, sortBy, ...filter } = { ...req.query };
  page = parseInt(page) || 1;
  limit = parseInt(limit) || 10;

  const allStore = await Store.countDocuments({
    ...filter,
    isDeleted: false,
  });
  const totalPages = Math.ceil(allStore / limit);
  const offset = limit * (page - 1);

  const store = await Store.find(filter)
    .sort({ ...sortBy, createdAt: -1 })
    .skip(offset)
    .limit(limit)
    .populate("admin");

  return sendResponse(
    res,
    200,
    true,
    { store, totalPages },
    null,
    "Get all store success"
  );
});

storeController.getSingleStore = catchAsync(async (req, res, next) => {
  let store = await Store.findById(req.params.id);
});

module.exports = storeController;
