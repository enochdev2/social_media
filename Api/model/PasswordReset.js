import mongoose, { Schema } from "mongoose";

const PassWordResetSchema = new mongoose.Schema({
  userId: { type: String, unique: true },
  email: { type: String, unique: true },
  token: String,
  createdAt: Date,
  expiresAt: Date,
});

const PassWordReset = mongoose.model("PassWordReset", PassWordResetSchema);

export default PassWordReset;
