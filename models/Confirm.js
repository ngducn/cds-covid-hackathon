const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const confirmSchema = Schema({
  title: String,
  phone: { type: String, required: true, unique: true },
  item: [
    {
      name: { type: String, lowercase: true, required: true },
      quantity: { type: Number, required: true },
      unit: { type: String, enum: ["kg", "pc", "box"] },
    },
  ],
  urgency: { type: String, required: true },
  description: { type: String, required: true },
  author: { type: Schema.ObjectId, required: true, ref: "User" },
});

const Confirm = mongoose.model("Confirm", confirmSchema);
module.exports = Confirm;
