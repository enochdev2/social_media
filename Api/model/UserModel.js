import mongoose, { Schema } from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "First Name is required"],
    },
    lastName: {
      type: String,
      required: [true, "Last Name is required"],
    },
    Email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password length should be greater than 6 characters"],
    },
    location: { type: String },
    profileurl: { type: String },
    profession: { type: String },
    friends: { type: String },
    views: { type: String },
    verified: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const Users = mongoose.model("users", UserSchema);

export default Users;
