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
  requestReceive: {
    rice: { type: Number, default: 0 },
    ramen: { type: Number, default: 0 },
    egg: { type: Number, default: 0 },
    water: { type: Number, default: 0 },
    milk: { type: Number, default: 0 },
    vegetable: { type: Number, default: 0 },
    mask: { type: Number, default: 0 },
    soap: { type: Number, default: 0 },
    shelter: { type: Number, default: 0 },
  },
  description: { type: String },
  isDone: { type: String },
});

const Request = mongoose.model("Request", requestSchema);
module.exports = Request;
