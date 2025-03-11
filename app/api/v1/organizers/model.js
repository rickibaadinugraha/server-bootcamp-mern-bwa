const mongoose = require("mongoose");
const { model, Schema } = mongoose;

let organizersSchema = Schema(
  {
    organizer: {
      type: String,
      required: [true, "Organizers must be filled"],
    },
  },
  { timestamps: true }
);

module.exports = model("Organizer", organizersSchema);
