import express from "express";
import cors from "cors";
const cookieParser = require("cookie-parser");
import { userRouter } from "./routers/userRouter";
import { postRouter } from "./routers/postRouter";
import { upload } from "./middleware/multer";
import { imageHandler } from "./utility/uploadImage";
import { protectRoute } from "./controllers/authController";
import { getComment } from "./controllers/postController";
require("dotenv").config();
const mongoose = require("mongoose");
const app = express();
app.use(cors());
app.use(cookieParser());
const path = require("path");
const port = "4000";

const DBUrl = "mongodb://0.0.0.0:27017/Node";

mongoose
  .connect(DBUrl)
  .then(function () {
    console.log(" db connected");
  })
  .catch(function (err: Error) {
    console.log(err);
  });
app.use(cors());

app.use(express.static(path.resolve(__dirname, "frontend", "build")));

app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
});

app.use(express.json());

app.use("/user", userRouter, postRouter);
app.use("/posts", upload.single("image"), postRouter);
app.use("/imageurl", protectRoute, upload.single("image"), imageHandler);
app.use("/showcomment/:postid", getComment);

app.listen(port, function () {
  console.log("server is listening on port 4000");
});
export { mongoose, app };
