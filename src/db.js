import mongoose from "mongoose";

mongoose.connect(process.env.DB_URL,{
    useNewUrlParser : true,
    useUnifiedTopology : true,
    useFindAndModify: false,
});

const db = mongoose.connection;
db.on("error", (error) => "Error!!");
db.once("open",() => console.log("Connecting DB"));


