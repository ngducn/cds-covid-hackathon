const utilHelpers = require("../helpers/util.helper");
const { catchAsync } = require("../helpers/util.helper");
const Request = require("../models/Request");
const Store = require("../models/Store");
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
  const requestList = await Request.create(...req.body);

  //get current of store
  const { request } = await Store.findById(req.to);
  //update result
  result = await Store.findByIdAndUpdate(
    store._id,
    {
      request: {
        rice: request.rice + (requestList.rice || 0),
        ramen: request.ramen + (requestList.ramen || 0),
        milk: request.milk + (requestList.milk || 0),
        mask: request.mask + (requestList.mask || 0),
        soap: request.soap + (requestList.soap || 0),
        water: request.water + (requestList.water || 0),
        egg: request.egg + (requestList.egg || 0),
        vegetable: request.vegetable + (requestList.vegetable || 0),
        shelter: request.shelter + (requestList.shelter || 0),
      },
    },
    { new: true }
  );

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
