const utilHelpers = require("../helpers/util.helper");
const { catchAsync } = require("../helpers/util.helper");
const Request = require("../models/Request");
const User = require("../models/User");
const requestController = {};

requestController.getRequests = catchAsync(async (req, res, next) => {
  const { page, limit, ...filter } = req.query;
  const request_limit = limit ? limit : 10;
  const request_page = page ? request_limit * page : 0;

  let requests = await Request.find(filter)
    .populate("author")
    .limit(request_limit)
    .skip(request_page);

  return utilHelpers.sendResponse(
    res,
    200,
    true,
    { requests },
    null,
    "GET requests success."
  );
});

requestController.createNewRequest = catchAsync(async (req, res, next) => {
  const request = await Request.create(...req.body);
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
  let { status } = req.body;
  return utilHelpers.sendResponse(
    res,
    200,
    true,
    {},
    null,
    "PUT request status success."
  );
});

module.exports = requestController;
