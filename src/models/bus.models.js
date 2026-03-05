import mongoose, { Schema } from "mongoose";

const busSchema = new Schema(
  {
    vehicleNo: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    busType: {
      type: String,
      enum: ["2*2", "3*2", "2*1"],
      required: true,
      lowercase: true,
    },
    capacity: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["Busy", "Available"],
      default: "Available",
    },
  },
  {
    timestamps: true,
  },
);

export const Bus = mongoose.model("Bus", busSchema);
