import express from "express";
import { getEdit,postEdit, startGithub,logout,finishGithub,getPassword,postPassword } from "../controllers/userController";
import { avataUpload, protectMiddleware } from "../middleware";

const userRouter   = express.Router();

userRouter.route("/edit-profile").all(protectMiddleware).get(getEdit).post(avataUpload.single("avata"),postEdit);
userRouter.route("/logout").all(protectMiddleware).get(logout);
userRouter.route("/github/start").get(startGithub)
userRouter.route("/github/callback").get(finishGithub)
userRouter.route("/change-password").all(protectMiddleware).get(getPassword).post(postPassword);
export default userRouter;