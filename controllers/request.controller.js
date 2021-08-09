const utilHelpers = require("../helpers/util.helper");
const { catchAsync } = require("../helpers/util.helper");
const Request = require("../models/Request");
const Store = require("../models/Store");
const User = require("../models/User");
const requestController = {};

requestController.getRequests = catchAsync(async (req, res, next) => {
  const { page, limit, sortBy, ...filter } = { ...req.query };
  page = parseInt(page) || 1;
  limit = parseInt(limit) || 10;

  const allRequests = await Request.countDocuments({
    ...filter,
  });

  const totalPages = Math.ceil(allRequests / limit);
  const offset = limit * (page - 1);

  let requests = await Request.find(filter)
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
  const requestList = await Request.create({ ...req.body });
  // get current of store
  const store = await Store.findById(req.body.to);

  const obj = {};
  requestList.requestSchedule.map((el, idx) => (obj[el.name] = idx));
  result = await Store.findByIdAndUpdate(
    store._id,
    {
      requestSchedule: {
        rice:
          store.requestSchedule.rice +
          (requestList.requestSchedule[obj["rice"]]?.value || 0),
        ramen:
          store.requestSchedule.ramen +
          (requestList.requestSchedule[obj["ramen"]]?.value || 0),
        milk:
          store.requestSchedule.milk +
          (requestList.requestSchedule[obj["milk"]]?.value || 0),
        mask:
          store.requestSchedule.mask +
          (requestList.requestSchedule[obj["mask"]]?.value || 0),
        soap:
          store.requestSchedule.soap +
          (requestList.requestSchedule[obj["soap"]]?.value || 0),
        water:
          store.requestSchedule.water +
          (requestList.requestSchedule[obj["water"]]?.value || 0),
        egg:
          store.requestSchedule.egg +
          (requestList.requestSchedule[obj["egg"]]?.value || 0),
        vegetable:
          store.requestSchedule.vegetable +
          (requestList.requestSchedule[obj["vegetable"]]?.value || 0),
        shelter:
          store.requestSchedule.shelter +
          (requestList.requestSchedule[obj["shelter"]]?.value || 0),
      },
    },
    { new: true }
  );

  return utilHelpers.sendResponse(
    res,
    200,
    true,
    { requestList },
    null,
    "POST request success."
  );
});

requestController.updateRequestStatus = catchAsync(async (req, res, next) => {
  const { isDone } = req.body;

  const request = await Request.findByIdAndUpdate(
    req.params.id,
    { isDone: isDone },
    { new: true }
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
