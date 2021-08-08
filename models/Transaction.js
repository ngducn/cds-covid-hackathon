const mongoose = require("mongoose");
const Store = require("./Store");
const Schema = mongoose.Schema;

const transactionSchema = Schema(
  {
    type: { type: String, enum: ["request", "donate"] },
    author: { type: Schema.ObjectId, required: true, ref: "User" },
    target: { type: Schema.ObjectId, required: true, ref: "Store" },
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
        value: {
          request: { type: Number, default: 0 },
          receive: { type: Number, default: 0 },
          donate: { type: Number, default: 0 },
        },
      },
    ],
    description: { type: String, required: true },
    isDone: { type: Boolean, default: false },
  },
  { timeStamp: true }
);

transactionSchema.statics.calculateTotal = async function (targetId) {
  //somehow create an aggregate to have updated field
  await Store.findByIdAndUpdate(targetId, {
    balance: {
      rice: {
        request: "old" + "new",
        receive: "old" + "new",
        donate: "old" + "new",
      },
      ramen: {
        request: "old" + "new",
        receive: "old" + "new",
        donate: "old" + "new",
      },
      egg: {
        request: "old" + "new",
        receive: "old" + "new",
        donate: "old" + "new",
      },
      water: {
        request: "old" + "new",
        receive: "old" + "new",
        donate: "old" + "new",
      },
      milk: {
        request: "old" + "new",
        receive: "old" + "new",
        donate: "old" + "new",
      },
      vegetable: {
        request: "old" + "new",
        receive: "old" + "new",
        donate: "old" + "new",
      },
      mask: {
        request: "old" + "new",
        receive: "old" + "new",
        donate: "old" + "new",
      },
      soap: {
        request: "old" + "new",
        receive: "old" + "new",
        donate: "old" + "new",
      },
      shelter: {
        request: "old" + "new",
        receive: "old" + "new",
        donate: "old" + "new",
      },
    },
  });
};

transactionSchema.post("save", async function () {
  // this point to current review
  await this.constructor.calculateTransaction(this.targetId);
});

transactionSchema.pre(/^findOneAnd/, async function (next) {
  this.doc = await this.findOne();
  next();
});

transactionSchema.post(/^findOneAnd/, async function (next) {
  await this.doc.constructor.calculateTransaction(this.doc.targetId);
});

const Transaction = mongoose.model("Transaction", transactionSchema);
module.exports = Transaction;
