const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const storeSchema = Schema(
  {
    name: { type: String, required: true },
    admin: { type: Schema.ObjectId, required: true, ref: "User" },
    phone: { type: String, required: true },
    address: {
      number: { type: String, required: true },
      streetName: { type: String, required: true },
      ward: { type: String, required: true },
      city: { type: String, required: true },
      district: { type: String, required: true },
    },
    requestSchedule: {
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
    donationSchedule: {
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
    requestDeliver: {
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
    donationActual: {
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
  },
  { timestamp: true }
);

const Store = mongoose.model("Store", storeSchema);
module.exports = Store;
