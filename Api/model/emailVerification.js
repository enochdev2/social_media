import mongoose, { Schema } from "mongoose";

const emailVerificationSchema = new mongoose.Schema(
  {
    userId: String,
    token: String,
    createdAt: Date,
    expireAt: Date,
  },
  {
    timestamps: true,
  }
);

const verification = mongoose.model("verification", emailVerificationSchema);

export default verification;
