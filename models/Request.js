const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const requestSchema = Schema({
  from: { type: Schema.ObjectId, ref: "User", required: true },
  to: { type: Schema.ObjectId, ref: "Store", required: true },
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
      value: { type: Number, required: true },
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
      value: { type: Number, required: true },
    },
  ],
  description: { type: String, required: true },
  isDone: { type: String, required: true },
});

const Request = mongoose.model("Request", requestSchema);
module.exports = Request;
