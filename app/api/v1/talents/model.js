const mongoose = require("mongoose");
const { model, Schema } = mongoose;

let talentSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "Name must be filled"],
    },
    role: {
      type: String,
      default: "-",
    },

    // for create relation with mongodb create types objectId
    image: {
      type: mongoose.Types.ObjectId,
      ref: "Image",
      required: true,
    },
    organizer: {
      type: mongoose.Types.ObjectId,
      ref: "organizer",
      required: true,
    },
  },
  { timeStamps: true }
);

module.exports = model("Talent", talentSchema);
