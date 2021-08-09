const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const requestSchema = Schema({
  from: { type: Schema.ObjectId, ref: "User" },
  to: { type: Schema.ObjectId, ref: "Store" },
  requestSchedule: [
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
      value: { type: Number, default: 0 },
    },
  ],
  requestReceive: [
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
      value: { type: Number },
    },
  ],
  description: { type: String },
  isDone: { type: String },
});

const Request = mongoose.model("Request", requestSchema);
module.exports = Request;
