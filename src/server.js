//import "./db";
import express from "express";
import morgan from "morgan";
import globalRouter from "./routers/globalRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";

//creat application
const app = express();

const PORT = 4000;
// 퍼그를 사용 하겠다는 코드.
app.set("view engine", "pug");
// 경로를 잡아주는 코드.
app.set("views", process.cwd() + "/src/views");
//middleWare
app.use(morgan("dev"));
app.use(express.urlencoded({extended:true}));
app.use("/", globalRouter);
app.use("/user", userRouter);
app.use("/video", videoRouter);

const handleListening = () => console.log(`Server listening on port ${PORT} BAAM~`);
app.listen(PORT, handleListening);