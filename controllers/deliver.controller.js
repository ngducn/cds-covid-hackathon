const utilHelpers = require("../helpers/util.helper");
const { catchAsync } = require("../helpers/util.helper");
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
  const deliverList = await Deliver.create({ ...req.body });
  // get current of store
  const store = await Store.findById(req.body.from);

  const obj = {};
  deliverList.item.map((el, idx) => (obj[el.name] = idx));
  result = await Store.findByIdAndUpdate(
    store._id,
    {
      requestDeliver: {
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
    { deliveryList },
    null,
    "POST new delivery success."
  );
});

module.exports = deliverController;
