import express from "express";
const postRouter = express.Router();
import {
  getPosts,
  postImage,
  updatePost,
  createComment,
  getContent,
  deletePost,
  likePost,dislikePost
} from "../controllers/postController";
import { protectRoute } from "../controllers/authController";

postRouter.route("/").post(protectRoute, postImage);
postRouter.get("/getposts", getPosts);
postRouter.route("/updatepost/:id").patch(updatePost);
postRouter.route("/delete/:id").delete(deletePost);
postRouter.route("/comment").post(protectRoute, createComment);
postRouter.route("/content/:id").get(getContent);
postRouter.route("/like").post(protectRoute, likePost);
postRouter
.route('/dislike')
.post(protectRoute,dislikePost)

export { postRouter };
