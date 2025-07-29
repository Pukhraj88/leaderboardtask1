import mongoose from "mongoose";

const userschema=mongoose.Schema({
    name:String,
    points:{
        type:Number,
        default:0
    }
})

const usermodel=mongoose.model("users",userschema)

export default usermodel; 