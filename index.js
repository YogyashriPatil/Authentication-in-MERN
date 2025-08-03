import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import db from "./utils/db.js"
//imports all routes
import userRoutes from "./routes/user.routes.js"

dotenv.config() 


const app = express()
const port = process.env.PORT || 3000

app.use(cors({
    origin:"http://127.0.0.1:3000",
    methods:['GET','POST','DELETE','OPTIONS'],
    allowedHeaders:['Content-Type','Authorization'],
    credentials:true
}));


app.use(express.json())
app.use(express.urlencoded({extended:true}))


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/yogyashri', (req,res) => {
    res.send("Yogayshri");
})
//connect to db
db();

// user routes
app.use("/api/v1/users/",userRoutes)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
