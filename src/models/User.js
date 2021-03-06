import mongoose, { mongo } from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
    username : { 
        type : String, 
        require : true,
        unique : true
    },
    avataUrl: String,
    email : {
        type : String, 
        require : true,
        unique : true         
    },
    password : {
        type : String, 
    },
    snsOnly : { 
        type : Boolean,
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