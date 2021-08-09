const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = Schema({
  name: String,
  image: {
    size: { type: String },
    value: { type: String },
  },
  password: String,
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
  role: { type: String, enum: ["public", "admin"], default: "public" },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
