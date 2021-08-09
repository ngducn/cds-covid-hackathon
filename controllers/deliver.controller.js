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
  const deliveryList = await Deliver.create(...req.body);
  const { requestDeliver } = await Store.findById(req.to);

  result = await Store.findByIdAndUpdate(
    store._id,
    {
      requestDeliver: {
        rice: requestDeliver.rice + (deliveryList.rice || 0),
        ramen: requestDeliver.ramen + (deliveryList.ramen || 0),
        milk: requestDeliver.milk + (deliveryList.milk || 0),
        mask: requestDeliver.mask + (deliveryList.mask || 0),
        soap: requestDeliver.soap + (requestList.soap || 0),
        water: requestDeliver.water + (deliveryList.water || 0),
        egg: requestDeliver.egg + (deliveryList.egg || 0),
        vegetable: requestDeliver.vegetable + (deliveryList.vegetable || 0),
        shelter: requestDeliver.shelter + (deliveryList.shelter || 0),
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
