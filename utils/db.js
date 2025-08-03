import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config()
const url= process.env.DATABASE_URL;
mongoose.connect(url).then(
    console.log("Connected");
)