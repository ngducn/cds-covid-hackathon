const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
const Schema = mongoose.Schema;

const userSchema = Schema({
  name: String,
  image: { type: String, lowercase: true },
  password: { type: String },
  address: {
    number: { type: String, required: true, lowercase: true, trim: true },
    streetName: { type: String, required: true, lowercase: true, trim: true },
    ward: { type: String, required: true, lowercase: true, trim: true },
    city: { type: String, required: true, lowercase: true, trim: true },
    district: { type: String, required: true, lowercase: true, trim: true },
  },
  phone: { type: String, required: true, unique: true },
  status: [
    {
      type: String,
      enum: ["unemployed", "children", "old", "covid", "accident"],
      unique: true,
    },
  ],
  role: { type: String, enum: ["public", "admin"], default: "public" },
});

userSchema.methods.generateToken = async function () {
  const accessToken = await jwt.sign({ _id: this._id }, JWT_SECRET_KEY, {
    expiresIn: "1d",
  });
  return accessToken;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
