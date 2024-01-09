import mongoose, { Schema } from "mongoose";

const FriendRequestSchema = new mongoose.Schema(
  {
    requestTo: { type: Schema.Types.ObjectId, ref: "Users" },
    requestFrom: { type: Schema.Types.ObjectId, ref: "Users" },
    requestStatus: { type: String, default: "Pending" },
  },
  {
    timestamps: true,
  }
);

const FriendRequest = mongoose.model("FriendRequest", FriendRequestSchema);

export default FriendRequest;
