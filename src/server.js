import express from "express";
import morgan from "morgan";
import session from "express-session";
import MongoStore from "connect-mongo";

import rootRouter from "./routers/rootRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import { localsMiddleware }from "./middleware";

//creat application
const app = express();

// 퍼그를 사용 하겠다는 코드.
app.set("view engine", "pug");
// 경로를 잡아주는 코드.
app.set("views", process.cwd() + "/src/views");
//middleWare
app.use(morgan("dev"));
app.use(express.urlencoded({extended:true}));
app.use(session({
    secret: process.env.COOKIE_SECERT,
    resave: false,
    saveUninitialized:false, // 세션에 변화가 있을 때만 저장 하고싶으면 false로 만든다. 
    store : MongoStore.create({mongoUrl : process.env.DB_URL})
}))
app.use(localsMiddleware);

app.use("/", rootRouter);
app.use("/user", userRouter);
app.use("/video", videoRouter);

export default app;