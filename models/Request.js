const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const requestSchema = Schema(
  {
    item: [
      {
        name: { type: String, lowercase: true, required: true },
        quantity: { type: Number, required: true },
        unit: { type: String, enum: ["kg", "pc", "box"] },
      },
    ],
    description: { type: String, required: true },
    author: { type: Schema.ObjectId, required: true, ref: "User" },
    target: { type: Schema.ObjectId, required: true, ref: "Store" },
    isDone: { type: Boolean, default: false },
    type: { type: String, enum: ["request", "donate"] },
  },
  { timeStamp: true }
);

const Request = mongoose.model("Request", requestSchema);
module.exports = Request;
