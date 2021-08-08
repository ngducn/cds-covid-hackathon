const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = Schema({
  name: String,
  image: {
    size: { type: String, lowercase: true },
    value: { type: String, lowercase: true },
  },
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

const User = mongoose.model("User", userSchema);
module.exports = User;
