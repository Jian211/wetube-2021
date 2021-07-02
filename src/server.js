import express from "express";
import morgan from "morgan";
import globalRouter from "./routers/globalRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";

//creat application
const app = express();

const PORT = 4000;

//middleWare
app.use(morgan("dev"));
app.use("/", globalRouter);
app.use("/user", userRouter);
app.use("/video", videoRouter);

const handleListening = () => console.log(`Server listening on port ${PORT} BAAM~`);
app.listen(PORT, handleListening);