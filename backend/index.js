import express, { response } from "express";
import mongoose from "mongoose";
import {book,User} from "./models/bookModel.js";
import bookRoute from "./routes/bookRoute.js"
import cors from 'cors';
import cookieParser from "cookie-parser"
import dotenv from "dotenv";

dotenv.config(); 
const PORT = process.env.PORT;
const MongoDBURL = process.env.MONGODB_URL;

const app=express()
app.use(cookieParser())
app.use(cors({
  origin: "http://localhost:5173",  // your Vite frontend
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));


app.use(express.json());
app.use("/",bookRoute);

mongoose.connect(MongoDBURL).then(() =>{
    console.log('Connected to database');
}).catch((error)=>{
    console.log(error);
})
export default app;

