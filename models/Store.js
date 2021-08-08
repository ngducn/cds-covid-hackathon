const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const storeSchema = Schema(
  {
    name: { type: String, required: true, lowercase: true },
    admin: { type: Schema.ObjectId, required: true, ref: "User" },
    address: {
      number: { type: String, required: true, lowercase: true, trim: true },
      streetName: { type: String, required: true, lowercase: true, trim: true },
      ward: { type: String, required: true, lowercase: true, trim: true },
      city: { type: String, required: true, lowercase: true, trim: true },
      district: { type: String, required: true, lowercase: true, trim: true },
    },
    phone: { type: String, required: true, unique: true },
    balance: {
      rice: {
        request: { type: Number, default: 0 },
        receive: { type: Number, default: 0 },
        donate: { type: Number, default: 0 },
      },
      ramen: {
        request: { type: Number, default: 0 },
        receive: { type: Number, default: 0 },
        donate: { type: Number, default: 0 },
      },
      egg: {
        request: { type: Number, default: 0 },
        receive: { type: Number, default: 0 },
        donate: { type: Number, default: 0 },
      },
      water: {
        request: { type: Number, default: 0 },
        receive: { type: Number, default: 0 },
        donate: { type: Number, default: 0 },
      },
      milk: {
        request: { type: Number, default: 0 },
        receive: { type: Number, default: 0 },
        donate: { type: Number, default: 0 },
      },
      vegetable: {
        request: { type: Number, default: 0 },
        receive: { type: Number, default: 0 },
        donate: { type: Number, default: 0 },
      },
      mask: {
        request: { type: Number, default: 0 },
        receive: { type: Number, default: 0 },
        donate: { type: Number, default: 0 },
      },
      soap: {
        request: { type: Number, default: 0 },
        receive: { type: Number, default: 0 },
        donate: { type: Number, default: 0 },
      },
      shelter: {
        request: { type: Number, default: 0 },
        receive: { type: Number, default: 0 },
        donate: { type: Number, default: 0 },
      },
    },
  },
  { timestamp: true }
);

const Store = mongoose.model("Store", storeSchema);
module.exports = Store;
