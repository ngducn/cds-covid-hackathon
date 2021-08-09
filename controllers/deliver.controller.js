const { request } = require("express");
const utilHelpers = require("../helpers/util.helper");
const { catchAsync, AppError } = require("../helpers/util.helper");
const Deliver = require("../models/Deliver");
const Request = require("../models/Request");
const Store = require("../models/Store");
const deliverController = {};

deliverController.getDeliveries = catchAsync(async (req, res, next) => {
  const { page, limit, sortBy, ...filter } = { ...req.query };
  page = parseInt(page) || 1;
  limit = parseInt(limit) || 10;

  const allDeliveries = await Deliver.countDocuments({
    ...filter,
  });

  const totalPages = Math.ceil(allDeliveries / limit);
  const offset = limit * (page - 1);

  let deliveries = await Deliver.find(filter)
    .sort({ ...sortBy, createdAt: -1 })
    .skip(offset)
    .limit(limit);

  return utilHelpers.sendResponse(
    res,
    200,
    true,
    { deliveries, totalPages },
    null,
    "GET deliveries success."
  );
});

deliverController.createNewDelivery = catchAsync(async (req, res, next) => {
  let store = await Store.findOne({ admin: req.adminId });

  let request = await Request.findById(req.body.to);

  if (!store)
    return next(new AppError(300, "No Store", "Create Deliver Error"));
  let deliverList = await Deliver.create({ ...req.body, from: req.adminId });
  // get current of store
  if (!deliverList)
    return next(new AppError(300, "Fialer", "Create Deliver Error"));

  let obj = {};

  deliverList.item.map((el, idx) => (obj[el.name] = idx));

  store = await Store.findByIdAndUpdate(
    store._id,
    {
      requestDeliver: {
        rice:
          store.requestDeliver.rice +
          (deliverList.item[obj["rice"]]?.value || 0),
        ramen:
          store.requestDeliver.ramen +
          (deliverList.item[obj["ramen"]]?.value || 0),
        milk:
          store.requestDeliver.milk +
          (deliverList.item[obj["milk"]]?.value || 0),
        mask:
          store.requestDeliver.mask +
          (deliverList.item[obj["mask"]]?.value || 0),
        soap:
          store.requestDeliver.soap +
          (deliverList.item[obj["soap"]]?.value || 0),
        water:
          store.requestDeliver.water +
          (deliverList.item[obj["water"]]?.value || 0),
        egg:
          store.requestDeliver.egg + (deliverList.item[obj["egg"]]?.value || 0),
        vegetable:
          store.requestDeliver.vegetable +
          (deliverList.item[obj["vegetable"]]?.value || 0),
        shelter:
          store.requestDeliver.shelter +
          (deliverList.item[obj["shelter"]]?.value || 0),
      },
    },
    { new: true }
  );

  request = await Request.findByIdAndUpdate(
    req.body.to,
    {
      requestReceive: {
        rice:
          request.requestReceive.rice +
          (deliverList.item[obj["rice"]]?.value || 0),
        ramen:
          request.requestReceive.ramen +
          (deliverList.item[obj["ramen"]]?.value || 0),
        milk:
          request.requestReceive.milk +
          (deliverList.item[obj["milk"]]?.value || 0),
        mask:
          request.requestReceive.mask +
          (deliverList.item[obj["mask"]]?.value || 0),
        soap:
          request.requestReceive.soap +
          (deliverList.item[obj["soap"]]?.value || 0),
        water:
          request.requestReceive.water +
          (deliverList.item[obj["water"]]?.value || 0),
        egg:
          request.requestReceive.egg +
          (deliverList.item[obj["egg"]]?.value || 0),
        vegetable:
          request.requestReceive.vegetable +
          (deliverList.item[obj["vegetable"]]?.value || 0),
        shelter:
          request.requestReceive.shelter +
          (deliverList.item[obj["shelter"]]?.value || 0),
      },
    },
    { new: true }
  );
  // let done = Object.keys(request.requestReceive).find(
  //   (el) => request.requestReceive[el] <= 0
  // );
  // if (done) {
  //   await Request.findByIdAndUpdate(
  //     request._id,
  //     {
  //       isDone: true,
  //     },
  //     { new: true }
  //   );
  // }
  return utilHelpers.sendResponse(
    res,
    200,
    true,
    { deliverList, request },
    null,
    "POST new delivery success."
  );
});

module.exports = deliverController;
