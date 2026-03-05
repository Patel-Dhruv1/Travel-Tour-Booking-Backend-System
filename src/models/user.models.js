import mongoose, { Schema } from "mongoose";
const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      lowercase: true,
      index: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    address: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    role: {
      type: String,
      enum: ["owner", "user", "manager"],
      default: "user",
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    refreshToken: {
      type: String,
    },
    accessToken : {
      type: String,
    },
    
  },
  { timestamps: true },
);

export const User = mongoose.model("User", UserSchema);
