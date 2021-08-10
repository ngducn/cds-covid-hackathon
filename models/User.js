const mongoose = require("mongoose");
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
const Schema = mongoose.Schema;
const jwt = require("jsonwebtoken");
const userSchema = Schema({
  name: String,
  image: String,
  password: { type: String, required: true },
  address: {
    number: { type: String, required: true },
    streetName: { type: String, required: true },
    ward: { type: String, required: true },
    city: { type: String, required: true },
    district: { type: String, required: true },
  },
  phone: { type: String, required: true, unique: true },
  status: [
    {
      type: String,
      enum: ["covid", "children", "old", "unemployed", "accident"],
    },
  ],
  role: { type: String, enum: ["public"], default: "public" },
});

userSchema.methods.generateToken = async function () {
  const accessToken = await jwt.sign({ _id: this._id }, JWT_SECRET_KEY, {
    expiresIn: "1d",
  });
  return accessToken;
};

const User = mongoose.model("User", userSchema);
module.exports = User;
