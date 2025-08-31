import mongoose from "mongoose";

const userSchema= new mongoose.Schema({
    name :String,
    email:String,
    password:String,
    role :{
        type:String,
        enum:["user","admin"],
        default:"user",
    },
    isverified:{
        type:Boolean,
        default:false,
    },
    verificationToken:{
        type:String,
    },
    resetPasswordToken:{
        type:String,
    },
    resetPasswordExpire:{
        type:Date,
    },


},{timestamps:true,})
//timestamps added 2 extra field that added createdAT or updated add
const User= mongoose.model("User",userSchema)

export default User;