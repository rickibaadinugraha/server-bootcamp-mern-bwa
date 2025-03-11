const mongoose = require("mongoose");

const ticketCategoriesSchema = new mongoose.Schema({
  type: {
    type: String,
    required: [true, "Ticket type must be filled"],
  },
  price: {
    type: Number,
    default: 0,
  },
  stock: {
    type: Number,
    default: 0,
  },
  statusTicketCategories: {
    type: Boolean,
    enum: [true, false],
    default: true,
  },
  expired: {
    type: Date,
  },
});

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title must be filled"],
      minlength: 3,
      maxlength: 50,
    },
    date: {
      type: Date,
      required: [true, "Date must be filled"],
    },
    about: {
      type: String,
    },
    tagline: {
      type: String,
      required: [true, "Tagline must be filled"],
    },
    keyPoint: {
      type: [String],
    },
    venueName: {
      type: String,
      required: [true, "VenueName must be filled"],
    },
    statusEvent: {
      type: String,
      enum: ["Draft", "Published"],
      default: "Draft",
    },
    tickets: {
      type: [ticketCategoriesSchema],
      required: true,
    },
    image: {
      type: mongoose.Types.ObjectId,
      ref: "Image",
      required: true,
    },
    category: {
      type: mongoose.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    talent: {
      type: mongoose.Types.ObjectId,
      ref: "Talent",
      required: true,
    },
    organizer: {
      type: mongoose.Types.ObjectId,
      ref: "organizer",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Event", eventSchema);
