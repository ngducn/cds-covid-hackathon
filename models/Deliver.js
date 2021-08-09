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

deliverSchema.statics.calculateDeliver = async function (to) {
  const adjustment = await this.aggregate([
    {
      $match: { to },
    },
    { $unwind: "$item" },
    {
      $group: {
        _id: "$to",
        rice: {
          $sum: { $cond: [{ $eq: ["$item.name", "rice"] }, "$item.value", 0] },
        },
        ramen: {
          $sum: {
            $cond: [{ $eq: ["$item.name", "ramen"] }, "$item.value", 0],
          },
        },
        egg: {
          $sum: { $cond: [{ $eq: ["$item.name", "egg"] }, "$item.value", 0] },
        },
        water: {
          $sum: {
            $cond: [{ $eq: ["$item.name", "water"] }, "$item.value", 0],
          },
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

<<<<<<< HEAD
  await Request.findByIdAndUpdate(to, {
    itemReceive: {
      rice: (adjustment[0] && adjustment[0].rice) || 0,
      ramen: (adjustment[0] && adjustment[0].ramen) || 0,
      water: (adjustment[0] && adjustment[0].water) || 0,
      shelter: (adjustment[0] && adjustment[0].shelter) || 0,
      egg: (adjustment[0] && adjustment[0].egg) || 0,
      soap: (adjustment[0] && adjustment[0].soap) || 0,
      milk: (adjustment[0] && adjustment[0].milk) || 0,
      vegetable: (adjustment[0] && adjustment[0].vegetable) || 0,
      mask: (adjustment[0] && adjustment[0].mask) || 0,
=======
  await Request.findByIdAndUpdate(
    to,
    {
      requestReceive: [
        { name: "rice", value: (adjustment[0] && adjustment[0].rice) || 0 },
        { name: "ramen", value: (adjustment[0] && adjustment[0].ramen) || 0 },
        { name: "water", value: (adjustment[0] && adjustment[0].water) || 0 },
        {
          name: "shelter",
          value: (adjustment[0] && adjustment[0].shelter) || 0,
        },
        { name: "egg", value: (adjustment[0] && adjustment[0].egg) || 0 },
        { name: "soap", value: (adjustment[0] && adjustment[0].soap) || 0 },
        { name: "milk", value: (adjustment[0] && adjustment[0].milk) || 0 },
        {
          name: "vegetable",
          value: (adjustment[0] && adjustment[0].vegetable) || 0,
        },
        { name: "mask", value: (adjustment[0] && adjustment[0].mask) || 0 },
      ],
>>>>>>> 057f382e3bdb46d2461ac29037820a7a7b04f785
    },
    { new: true }
  );
};

deliverSchema.post("save", async function () {
  // this point to current review
<<<<<<< HEAD
  await this.constructor.calculateDonation(this.to);
=======
  await this.constructor.calculateDeliver(this.to);
>>>>>>> 057f382e3bdb46d2461ac29037820a7a7b04f785
});

deliverSchema.pre(/^findOneAnd/, async function (next) {
  this.doc = await this.findOne();
  next();
});

deliverSchema.post(/^findOneAnd/, async function (next) {
<<<<<<< HEAD
  await this.doc.constructor.calculateDonation(this.doc.to);
=======
  await this.doc.constructor.calculateDeliver(this.doc.to);
>>>>>>> 057f382e3bdb46d2461ac29037820a7a7b04f785
});

const Deliver = mongoose.model("Deliver", deliverSchema);
module.exports = Deliver;
