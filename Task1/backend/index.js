import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import userRouter from "./src/route/Userroute.js";
import historyRouter from "./src/route/HistoryRoute.js";
dotenv.config(); 
const app=express();    
 
app.use(cors()); 
app.use(express.json())  
const DBURL = process.env.DB || "mongodb+srv://kumarpukhraj905:kumarpukhraj905@pukhraj.eyl5y.mongodb.net/task1?retryWrites=true&w=majority&appName=pukhraj/";

//   DATA BASE CONNECTION

const DB = async () => {
  try {
    await mongoose.connect(DBURL);
    console.log("DB connected ");
  } catch (err) {
    console.log(err);
  }
};
DB();
 
// User ROUTE 
app.use("/api",userRouter)

// Histroy ROUTE
app.use("/api",historyRouter)
 
app.listen(process.env.PORT,()=>{
    console.log("PORT listening 8000")
})  