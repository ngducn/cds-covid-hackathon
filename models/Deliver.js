const mongoose = require("mongoose");
const Request = require("./Request");
const Schema = mongoose.Schema;

const deliverSchema = Schema({
  from: { type: Schema.ObjectId, ref: "Store", required: true },
  to: { type: Schema.ObjectId, ref: "Request", required: true },
  item: [
    {
      name: {
        type: String,
        required: true,
        enum: [
          "rice",
          "ramen",
          "milk",
          "egg",
          "water",
          "vegetable",
          "mask",
          "soap",
          "shelter",
        ],
      },
      value: { type: Number, required: true },
    },
  ],
  description: { type: String, required: true },
  isDone: { type: String, required: true },
});

deliverSchema.statics.calculateDonation = async function (to) {
  const adjustment = await this.aggregate([
    {
      $match: { to },
    },
    {
      $group: {
        _id: "$to",
        rice: {
          $sum: { $cond: [{ $eq: ["$item.name", "rice"] }, $item.value, 0] },
        },
        ramen: {
          $sum: { $cond: [{ $eq: ["$item.name", "ramen"] }, "$item.value", 0] },
        },
        egg: {
          $sum: { $cond: [{ $eq: ["$item.name", "egg"] }, "$item.value", 0] },
        },
        water: {
          $sum: { $cond: [{ $eq: ["$item.name", "water"] }, "$item.value", 0] },
        },
        milk: {
          $sum: { $cond: [{ $eq: ["$item.name", "milk"] }, "$item.value", 0] },
        },
        vegetable: {
          $sum: {
            $cond: [{ $eq: ["$item.name", "vegetable"] }, "$item.value", 0],
          },
        },
        mask: {
          $sum: { $cond: [{ $eq: ["$item.name", "mask"] }, "$item.value", 0] },
        },
        soap: {
          $sum: { $cond: [{ $eq: ["$item.name", "soap"] }, "$item.value", 0] },
        },
        shelter: {
          $sum: {
            $cond: [{ $eq: ["$item.name", "shelter"] }, "$item.value", 0],
          },
        },
      },
    },
  ]);
  console.log(adjustment);
  await Request.findByIdAndUpdate(to, {
    requestReceive: {
      rice: (adjustment[0] && adjustment[0].rice) || 0,
      ramen: (adjustment[0] && adjustment[0].ramen) || 0,
      water: (adjustment[0] && adjustment[0].water) || 0,
      shelter: (adjustment[0] && adjustment[0].shelter) || 0,
      egg: (adjustment[0] && adjustment[0].egg) || 0,
      soap: (adjustment[0] && adjustment[0].soap) || 0,
      milk: (adjustment[0] && adjustment[0].milk) || 0,
      vegetable: (adjustment[0] && adjustment[0].vegetable) || 0,
      mask: (adjustment[0] && adjustment[0].mask) || 0,
    },
  });
};

deliverSchema.post("save", async function () {
  // this point to current review
  await this.constructor.calculateDonation(this.to, this.targetType);
});

deliverSchema.pre(/^findOneAnd/, async function (next) {
  this.doc = await this.findOne();
  next();
});

deliverSchema.post(/^findOneAnd/, async function (next) {
  await this.doc.constructor.calculateDonation(
    this.doc.to,
    this.doc.targetType
  );
});

const Deliver = mongoose.model("Deliver", deliverSchema);
module.exports = Deliver;
