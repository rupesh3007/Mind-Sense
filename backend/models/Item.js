/**
 * Item model — matches frontend fields: title, amount, category.
 * Mongoose turns this schema into a MongoDB collection named "items".
 */
const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema(
  {
    // Short label for the item (e.g. expense or product name).
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    // Numeric value (e.g. price or quantity).
    amount: {
      type: Number,
      required: [true, "Amount is required"],
    },
    // Grouping label (e.g. "Food", "Transport").
    category: {
      type: String,
      required: [true, "Category is required"],
      trim: true,
    },
  },
  {
    // Adds createdAt and updatedAt automatically.
    timestamps: true,
  }
);

module.exports = mongoose.model("Item", itemSchema);
