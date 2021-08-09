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
          (deliverList.item[obj["rice"]]?.value || 0),
        ramen:
          store.requestSchedule.ramen +
          (deliverList.item[obj["ramen"]]?.value || 0),
        milk:
          store.requestSchedule.milk +
          (deliverList.item[obj["milk"]]?.value || 0),
        mask:
          store.requestSchedule.mask +
          (deliverList.item[obj["mask"]]?.value || 0),
        soap:
          store.requestSchedule.soap +
          (deliverList.item[obj["soap"]]?.value || 0),
        water:
          store.requestSchedule.water +
          (deliverList.item[obj["water"]]?.value || 0),
        egg:
          store.requestSchedule.egg +
          (deliverList.item[obj["egg"]]?.value || 0),
        vegetable:
          store.requestSchedule.vegetable +
          (deliverList.item[obj["vegetable"]]?.value || 0),
        shelter:
          store.requestSchedule.shelter +
          (deliverList.item[obj["shelter"]]?.value || 0),
      },
    },
    { new: true }
  );

  return utilHelpers.sendResponse(
    res,
    200,
    true,
    { deliverList },
    null,
    "POST new delivery success."
  );
});

module.exports = deliverController;
