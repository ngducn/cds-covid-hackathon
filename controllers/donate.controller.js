const utilHelpers = require("../helpers/util.helper");
const {
  catchAsync,
  AppError,
  sendResponse,
} = require("../helpers/util.helper");
const Donation = require("../models/Donation");
const Store = require("../models/Store");

const donateController = {};

donateController.createDonate = catchAsync(async (req, res, next) => {
  const { to, item, description } = req.body;
  let store = await Store.findById(to);
  if (!store) return next(new AppError(300, "No store", "Donate Error"));
  const giver = "61101b8c2d480951e438b2de";
  const donation = await Donation.create({
    from: giver,
    to,
    item,
    description,
  });

  const objTest = {};
  donation.item.map((el, idx) => (objTest[el.name] = idx));
  store = await Store.findByIdAndUpdate(
    store._id,
    {
      donationSchedule: {
        rice:
          store.donationSchedule.rice +
          (donation.item[objTest["rice"]]?.value || 0),
        ramen:
          store.donationSchedule.ramen +
          (donation.item[objTest["ramen"]]?.value || 0),
        milk:
          store.donationSchedule.milk +
          (donation.item[objTest["milk"]]?.value || 0),
        egg:
          store.donationSchedule.egg +
          (donation.item[objTest["egg"]]?.value || 0),
        water:
          store.donationSchedule.water +
          (donation.item[objTest["water"]]?.value || 0),
        vegetable:
          store.donationSchedule.vegetable +
          (donation.item[objTest["vegetable"]]?.value || 0),
        mask:
          store.donationSchedule.mask +
          (donation.item[objTest["mask"]]?.value || 0),
        soap:
          store.donationSchedule.soap +
          (donation.item[objTest["soap"]]?.value || 0),
        shelter:
          store.donationSchedule.rice +
          (donation.item[objTest["shelter"]]?.value || 0),
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
