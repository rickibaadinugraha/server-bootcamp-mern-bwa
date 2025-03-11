const mongoose = require("mongoose");

const orderDetailSchema = new mongoose.Schema({
  ticketCategories: {
    type: {
      type: String,
      required: [true, "Ticket type must be filled"],
    },
    price: {
      type: Number,
      default: 0,
    },
  },
  sumTicket: {
    type: Number,
    required: true,
  },
});

const orderSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      required: true,
    },
    personalDetail: [
      {
        firstName: {
          type: String,
          required: [true, "Please provide first name"],
          minlength: 3,
          maxlength: 50,
        },
        lastName: {
          type: String,
          required: [true, "Please provide last name"],
          minlength: 3,
          maxlength: 50,
        },
        email: {
          type: String,
          required: [true, "Please provide email"],
        },
        role: {
          type: String,
          default: "Designer",
        },
      },
    ],
    status: {
      type: String,
      enum: ["Pending", "Paid"],
      default: "Pending",
    },
    totalPay: {
      type: Number,
      required: true,
    },
    totalOrderTicket: {
      type: Number,
      required: true,
    },
    orderItems: [orderDetailSchema],
    participant: {
      type: mongoose.Types.ObjectId,
      ref: "Participant",
      required: true,
    },
    payment: {
      type: mongoose.Types.ObjectId,
      ref: "Payment",
      required: true,
    },
    event: {
      type: mongoose.Types.ObjectId,
      ref: "Event",
      required: true,
    },
    historyEvent: {
      organizer: {
        type: mongoose.Types.ObjectId,
        ref: "Organizer",
        required: true,
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
