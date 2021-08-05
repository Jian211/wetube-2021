import mongoose, { mongo } from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
    username : { 
        type : String, 
        require : true,
        unique : true
    },
    email : {
        type : String, 
        require : true,
        unique : true         
    },
    password : {
        type : String, 
        require : true,
    },
    name : {
        type : String, 
        require : true,
    },
    location : String
});

userSchema.pre("save", async function(){
    this.password = await bcrypt.hash(this.password, 3);
})

const User = mongoose.model("User", userSchema);

export default User;