import mongoose from "mongoose";
import dotenv from "dotenv"

// export a function that connects to db
dotenv.config()
const url= process.env.DATABASE_URL;

const db = () => {
    mongoose.connect(url).then( (err) => {
        console.log("Connected to mongodb");
    })
    .catch( (err) => {
        console.log("Error connecting to mongodb");
    })
}

export default db;