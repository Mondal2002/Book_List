import express from "express";
import mongoose from "mongoose";
import { book, User } from "./models/bookModel.js";
import bookRoute from "./routes/bookRoute.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

dotenv.config(); 

const app = express();

const PORT = process.env.PORT || 3000;
const MongoDBURL = process.env.MONGODB_URL;

app.use(cookieParser());
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://book-list-qb4x-subham-mondals-projects-4d6994ac.vercel.app",
      "https://book-list-qb4x.vercel.app" // replace
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());
app.use("/", bookRoute);

mongoose
  .connect(MongoDBURL)
  .then(() => {
    console.log("Connected to database");
  })
  .catch((error) => {
    console.log(error);
  });

// ⭐ START THE SERVER (NEEDED FOR RENDER)
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
