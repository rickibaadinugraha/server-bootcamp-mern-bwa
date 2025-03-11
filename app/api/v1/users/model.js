const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name must be filled"],
      minLength: 3,
      maxLength: 50,
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Email must be filled"],
    },
    password: {
      type: String,
      required: [true, "Password must be filled"],
      minLength: 6,
    },
    role: {
      type: String,
      enum: ["admin", "organizer", "owner"],
      default: "admin",
    },
    organizer: {
      type: mongoose.Types.ObjectId,
      ref: "organizer",
      required: true,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  const User = this;
  if (User.isModified("password")) {
    User.password = await bcryptjs.hash(User.password, 12);
  }
  next();
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  const isMatch = await bcryptjs.compare(candidatePassword, this.password);
  return isMatch;
};

module.exports = mongoose.model("User", userSchema);
