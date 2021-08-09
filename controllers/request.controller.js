const utilHelpers = require("../helpers/util.helper");
const { catchAsync } = require("../helpers/util.helper");
const Transaction = require("../models/Transaction");
const requestController = {};

requestController.getRequests = catchAsync(async (req, res, next) => {
  const { page, limit, sortBy, ...filter } = { ...req.query };
  page = parseInt(page) || 1;
  limit = parseInt(limit) || 10;

  const allRequests = await Transaction.countDocuments({
    ...filter,
  });

  const totalPages = Math.ceil(allRequests / limit);
  const offset = limit * (page - 1);

  let requests = await Transaction.find(filter)
    .sort({ ...sortBy, createdAt: -1 })
    .skip(offset)
    .limit(limit)
    .populate("author");

  return utilHelpers.sendResponse(
    res,
    200,
    true,
    { requests, totalPages },
    null,
    "GET requests success."
  );
});

requestController.createNewRequest = catchAsync(async (req, res, next) => {
  const content = { ...req.body };

  const request = await Transaction.create(content);
  return utilHelpers.sendResponse(
    res,
    200,
    true,
    { request },
    null,
    "POST request success."
  );
});

requestController.updateRequestStatus = catchAsync(async (req, res, next) => {
  const { isDone } = req.body;

  const request = await Transaction.findByIdAndUpdate(
    req.params.id,
    { isDone: isDone },
    { new: true },
  );

  return utilHelpers.sendResponse(
    res,
    200,
    true,
    { request },
    null,
    "PUT request status success."
  );
});

module.exports = requestController;
