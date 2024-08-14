import { NextFunction, Request, Response } from "express";
import { userModel } from "../models/userModel";
const jwt = require("jsonwebtoken");
import { sendMail } from "../utility/nodemailer";
export const signUp = async (req: Request, res: Response) => {
  try {
    let data = req.body;
    let existuser = await userModel.findOne({
      email: data.email,
    });
    if (existuser) {
      return res.json({
        message: "User already Exist",
      });
    } else {
      let data = req.body;
      let user = await userModel.create(data);
      sendMail("signup", data);
      return res.json({
        message: "SignUp Successfully!",
        data: user,
      });
    }
  } catch (err: any) {
    res.json({
      message: err.message,
    });
  }
};

const JWT_key = "asgdgwgg3g3g";
export const signIn = async (req: Request, res: Response) => {
  try {
    let data = req.body;
    let user = await userModel.findOne({
      email: data.email,
      password: data.password,
    });
    if (user) {
      let uid = user["_id"];
      let JWT = jwt.sign({ payload: uid }, JWT_key);
      res.cookie("login", JWT);
      return res.json({
        message: "User has loggedIn",
        data: user,
        JWT,
      });
    } else {
      return res.json({
        message: "New User Please Signup",
      });
    }
  } catch (err: Error | any) {
    return res.json({
      message: err.message,
    });
  }
};

export const forgetPassword = async (req: Request, res: Response) => {
  const { email } = req.body;
  try {
    const user = await userModel.findOne({ email: email });
    if (user) {
      // instance method
      const resetToken = user.createResetToken();
      user.resetToken = resetToken;
      user.save();
      // http:abc.com/resetPassword/token
      const resetPasswordLink = `${req.protocol}://${req.get(
        "host"
      )}/user/resetpassword/${resetToken}`;
      // send email to the user
      // nodemailer
      let obj = {
        resetPasswordLink: resetPasswordLink,
        email: email,
      };
      sendMail("resetpassword", obj);
      return res.json({
        message: "Please check your email",
      });
    } else {
      return res.json({
        message: "Please signup",
      });
    }
  } catch (err: Error | any) {
    return res.json({
      message: err.message,
    });
  }
};

export const resetPassword = async (req: Request, res: Response) => {
  let token = req.params.token;
  let { password } = req.body;
  try {
    let user = await userModel.findOne({ resetToken: token });
    if (user) {
      user.password = password;
      user.resetToken = "";
      await user.save();
      res.json({
        message: "password reset successfully",
      });
      console.log(user);
    } else {
      return res.json({
        message: "no user found",
      });
    }
  } catch (err: Error | any) {
    return res.json({
      message: err.message,
    });
  }
};

// middleware for authentication
export const protectRoute = async (
  req: Request | any,
  res: Response,
  next: NextFunction
) => {
  try {
    let tooken;
    if (req.cookies.login) {
      tooken = req.cookies.login;
      //console.log("token", tooken);
      let payload = jwt.verify(tooken, JWT_key);
      req.body.payload = payload?.payload;
      //   if (payload) {
      //     const user = await userModel.findById(payload.payload);
      //     //req.username = user.username;
      //     if (user) {
      //       next();
      //     } else {
      //       return res.json({
      //         message: "No user found",
      //       });
      //     }
      //   }
      // } else {
      //   return res.json({
      //     message: "please login again",
      //   });
    }
  } catch (err: Error | any) {
    res.json({
      message: err.message,
    });
  }
  return next();
};

export const getUserData = async (req: Request, res: Response) => {
  let id = req.params.id;
  let user = await userModel.findById(id);
  return res.json({
    data: user?.username,
  });
};
