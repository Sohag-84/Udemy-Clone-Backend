import dotenv from "dotenv";

import express from "express";
import connectToDB from "./database/db.js";

import authRouter from "./routes/auth_routes.js";

dotenv.config({});

const app = express();
const PORT = process.env.PORT || 3000;

//connect to our database
connectToDB();

//use middlewares
app.use(express.json());

//api's
app.use("/api/v1/user", authRouter);

app.get("/home", (req, res) => {
  res.json({
    status: true,
    message: "Home page",
  });
});

app.listen(PORT, () => {
  console.log(`Server is now runnig on port ${PORT}`);
});
