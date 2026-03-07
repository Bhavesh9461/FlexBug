const mongoose = require("mongoose");

const callSchema = new mongoose.Schema(
  {
    caller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    status: {
      type: String,
      enum: ["ringing", "accepted", "rejected", "ended"],
      default: "ringing",
    },
    startedAt: Date,
    endedAt: Date,
  },
  { timestamps: true },
);

module.exports = mongoose.model("Call", callSchema);
