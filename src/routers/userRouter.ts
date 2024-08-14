import { Request, Response, Router } from "express";
import express from "express";
const app = express();
const cookieParser = require("cookie-parser");
const {
  signUp,
  signIn,
  protectRoute,
  forgetPassword,
  resetPassword,
  getUserData
} = require("../controllers/authController");
import { postImage } from "../controllers/postController";
const userRouter: Router = express.Router();
app.use(cookieParser());
userRouter.route("/signup").post(signUp);

userRouter.route("/signin").post(signIn);

userRouter.route("/forgetpassword").post(forgetPassword);

userRouter.route("/resetpassword/:token").post(resetPassword);
userRouter.route("/:id").get(getUserData)
//userRouter.use(protectRoute)
userRouter.route("/posts").post(protectRoute,postImage);
export { userRouter };
