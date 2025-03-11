const mongoose = require("mongoose");
const { model, Schema } = mongoose;

let categorySchema = Schema(
  {
    name: {
      type: String,
      minLength: [3, "Category name of at least 3 characters"],
      maxLength: [20, "Category name of at least 20 characters"],
      required: [true, "Category must be filled"],
    },
    organizer: {
      type: mongoose.Types.ObjectId,
      ref: "organizer",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Category", categorySchema);
