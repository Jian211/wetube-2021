import express from "express";
import { edit, remove ,see,startGithub,finishGithub } from "../controllers/userController";

const userRouter   = express.Router();

userRouter.get("/edit", edit);
userRouter.get("/delete", remove);
userRouter.get("/:id", see);
userRouter.route("/github/start").get(startGithub)
userRouter.route("/github/callback").get(finishGithub)
export default userRouter;