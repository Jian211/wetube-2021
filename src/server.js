import express from "express";

const PORT = 4000;

//creat application
const app = express();

const handleHome = (request , response) => {
   // console.log(request , response);
    return response.send("hi tea");
}

app.get("/", handleHome);
app.get("/login",(req, res) => res.send("<h1>Hi</h1>"));

const handleListening = () => console.log(`Server listening on port ${PORT} BAAM~`);

app.listen(PORT, handleListening);