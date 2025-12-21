import dotenv from "dotenv";

import express from "express";
import cookieParser from "cookie-parser";
import connectToDB from "./database/db.js";

import authRouter from "./routes/user_routes.js";
import courseRouter from "./routes/course-routes.js";

dotenv.config({});

const app = express();
const PORT = process.env.PORT || 3000;

//connect to our database
connectToDB();

app.use(cookieParser());

//use middlewares
app.use(express.json());

//api's
app.use("/api/v1/user", authRouter);
app.use("/api/v1/course", courseRouter);

app.get("/home", (req, res) => {
  res.json({
    status: true,
    message: "Home page",
  });
});

app.listen(PORT, () => {
  console.log(`Server is now runnig on port ${PORT}`);
});
