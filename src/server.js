import express from "express";
import morgan from "morgan";

const PORT = 4000;

//creat application
const app = express();

const handleHome = (request , response) => {
    console.log("im final");
    return response.send("hi teaas");
    
}
const handleProtected = (req, res) => {
    return res.send("BOOOO YA~");
}
app.use(morgan("dev"));
app.get("/", handleHome);
app.get("/protected", handleProtected);


const handleListening = () => console.log(`Server listening on port ${PORT} BAAM~`);
app.listen(PORT, handleListening);