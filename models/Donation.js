const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const donationSchema = Schema({
  type: { type: String, enum: ["schedule", "actual"] },
  from: { type: Schema.ObjectId, ref: "User", required: true },
  to: { type: Schema.ObjectId, ref: "Store", required: true },
  item: [
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

const Donation = mongoose.model("Donation", donationSchema);
module.exports = Donation;
