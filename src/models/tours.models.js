import mongoose, { Schema } from "mongoose";

const tourSchema = new Schema(
  {
    places: {
      type: Array,
      required: true,
      lowercase: true,
      index: true,
    },
    busId: {
      type: Schema.Types.ObjectId,
      ref: "Bus",
    },
    manager: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    distanceKm: {
      type: Number,
    },
    totalSeats: {
      type: Number,
      required: true,
    },
    availableSeats: {
      type: Number,
      required: true,
    },
    status : {
      type : String,
      enum : ["COMPLETED", "NOT-COMPLETE"],
      default : "NOT-COMPLETE"
    }
  },
  {
    timestamps: true,
  },
);

export const Tour = mongoose.model("Tour", tourSchema);
