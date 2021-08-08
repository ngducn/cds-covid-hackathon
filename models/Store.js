const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
const Schema = mongoose.Schema;

const storeSchema = Schema({
  name: String,
  password: { type: String, select: false },
  address: {
    number: { type: String, required: true, lowercase: true, trim: true },
    streetName: { type: String, required: true, lowercase: true, trim: true },
    ward: { type: String, required: true, lowercase: true, trim: true },
    city: { type: String, required: true, lowercase: true, trim: true },
    district: { type: String, required: true, lowercase: true, trim: true },
  },
  phone: { type: String, required: true, unique: true },
});

storeSchema.methods.generateToken = async function () {
  const accessToken = await jwt.sign({ _id: this._id }, JWT_SECRET_KEY, {
    expiresIn: "1d",
  });
  return accessToken;
};

const Store = mongoose.model("Store", storeSchema);
module.exports = Store;
