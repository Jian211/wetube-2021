import express from "express";

const PORT = 4000;

//creat application
const app = express();

const logger= (req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
}

const privateMiddleware = (req, res, next) => {
    if(req.url === "/protected"){
        res.send("<h1>Hi~ here is --</h1>")
    }
    next();
}

const handleHome = (request , response) => {
    console.log("im final");
    return response.send("hi teaas");
    
}
const handleProtected = (req, res) => {
    return res.send("BOOOO YA~");
}

app.use(logger);
app.use(privateMiddleware);

app.get("/", handleHome);
app.get("/protected", handleProtected);


const handleListening = () => console.log(`Server listening on port ${PORT} BAAM~`);
app.listen(PORT, handleListening);