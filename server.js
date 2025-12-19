import dotenv from "dotenv";

import express from "express";
import mongoose from "mongoose";
import connectToDB from "./database/db.js";

dotenv.config({});

const app = express();
const PORT = process.env.PORT || 3000;

//connect to our database
connectToDB();

//use middlewares
app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server is now runnig on port ${PORT}`);
});
