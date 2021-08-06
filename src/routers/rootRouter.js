import express from "express";
import { home, search } from "../controllers/videoController";
import { getJoin, postJoin,logout, getLogin, postLogin } from "../controllers/userController";


const rootRouter = express.Router();

rootRouter.get("/", home);
rootRouter.route("/join").get(getJoin).post(postJoin);
rootRouter.route("/login").get(getLogin).post(postLogin);
rootRouter.get("/logout", logout);
rootRouter.route('/search').get(search);

export default rootRouter;