const utilHelpers = require("../helpers/util.helper");
const {
  catchAsync,
  AppError,
  sendResponse,
} = require("../helpers/util.helper");
const Donation = require("../models/Donation");
const Store = require("../models/Store");
const User = require("../models/User");

const donateController = {};

donateController.createDonate = catchAsync(async (req, res, next) => {
  const { from, to, item, description } = req.body;
  let store = await Store.findById(to);
  if (!store) return next(new AppError(300, "No store", "Donate Error"));

  const donation = await Donation.create({
    from,
    to,
    item,
    description,
  });

  const itemKeyIndex = {};
  donation.item.map((el, idx) => (itemKeyIndex[el.name] = idx));
  store = await Store.findByIdAndUpdate(
    store._id,
    {
      donationSchedule: {
        rice:
          store.donationSchedule.rice +
          (donation.item[itemKeyIndex["rice"]]?.value || 0),
        ramen:
          store.donationSchedule.ramen +
          (donation.item[itemKeyIndex["ramen"]]?.value || 0),
        milk:
          store.donationSchedule.milk +
          (donation.item[itemKeyIndex["milk"]]?.value || 0),
        egg:
          store.donationSchedule.egg +
          (donation.item[itemKeyIndex["egg"]]?.value || 0),
        water:
          store.donationSchedule.water +
          (donation.item[itemKeyIndex["water"]]?.value || 0),
        vegetable:
          store.donationSchedule.vegetable +
          (donation.item[itemKeyIndex["vegetable"]]?.value || 0),
        mask:
          store.donationSchedule.mask +
          (donation.item[itemKeyIndex["mask"]]?.value || 0),
        soap:
          store.donationSchedule.soap +
          (donation.item[itemKeyIndex["soap"]]?.value || 0),
        shelter:
          store.donationSchedule.rice +
          (donation.item[itemKeyIndex["shelter"]]?.value || 0),
      },
    },
    { new: true }
  );

  return sendResponse(
    res,
    200,
    true,
    { store, donation },
    null,
    "Create donation success"
  );
});

donateController.confirmDonate = catchAsync(async (req, res, next) => {
  const { donateId, item, description } = req.body;

  let donate = await Donation.findById(donateId);

  if (!donate) return next(new AppError(300, "No donate", "Donate Error"));

  let store = await Store.findById(donate.to);

  if (!store) return next(new AppError(300, "No store", "Donate Error"));

  const donation = await Donation.create({
    type: "actual",
    from: donate.from,
    to: donate.to,
    item,
    description,
  });

  const itemKeyIndex = {};
  donation.item.map((el, idx) => (itemKeyIndex[el.name] = idx));
  store = await Store.findByIdAndUpdate(
    store._id,
    {
      donationActual: {
        rice:
          store.donationActual.rice +
          (donation.item[itemKeyIndex["rice"]]?.value || 0),
        ramen:
          store.donationActual.ramen +
          (donation.item[itemKeyIndex["ramen"]]?.value || 0),
        milk:
          store.donationActual.milk +
          (donation.item[itemKeyIndex["milk"]]?.value || 0),
        egg:
          store.donationActual.egg +
          (donation.item[itemKeyIndex["egg"]]?.value || 0),
        water:
          store.donationActual.water +
          (donation.item[itemKeyIndex["water"]]?.value || 0),
        vegetable:
          store.donationActual.vegetable +
          (donation.item[itemKeyIndex["vegetable"]]?.value || 0),
        mask:
          store.donationActual.mask +
          (donation.item[itemKeyIndex["mask"]]?.value || 0),
        soap:
          store.donationActual.soap +
          (donation.item[itemKeyIndex["soap"]]?.value || 0),
        shelter:
          store.donationActual.rice +
          (donation.item[itemKeyIndex["shelter"]]?.value || 0),
      },
    },
    { new: true }
  );

  return sendResponse(
    res,
    200,
    true,
    { store, donation },
    null,
    "Create donation success"
  );
});

module.exports = donateController;
