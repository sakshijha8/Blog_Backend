import mongoose, { Schema, Model } from "mongoose";
const crypto = require("crypto");
import { IUser } from "../interface/IUser";
interface IUserMethods {
  createResetToken(): string;
  resetPasswordHandler(): string;
}
type UserModel = Model<IUser, {}, IUserMethods>;

const userSchema = new Schema<IUser, UserModel, IUserMethods>({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
  },
  password: {
    type: String,
    required: true,
    min: 8,
  },
  resetToken: {
    type: String,
  },
});

userSchema.methods.createResetToken = function () {
  const resetTokeen = crypto.randomBytes(32).toString("hex");
  return resetTokeen;
};

const userModel = mongoose.model("userModel", userSchema);

export { userModel };
