import express from "express";
import { home, search } from "../controllers/videoController";
import { join, login } from "../controllers/userController";


const globalRouter = express.Router();

globalRouter.get("/", home);
globalRouter.get("/join", join);
globalRouter.get("/login", login);
globalRouter.route('/search').get(search);

export default globalRouter;