import dotenv from "dotenv";

import express from "express";
import cookieParser from "cookie-parser";
import connectToDB from "./database/db.js";

import fileErrorHandler from "./utils/file-error-handler.js";

import authRouter from "./routes/user_routes.js";
import courseRouter from "./routes/course-routes.js";
import lectureRouter from "./routes/lecture-routes.js";
import sectionRouter from "./routes/section-routes.js";

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
app.use("/api/v1/section", sectionRouter);
app.use("/api/v1/lecture", lectureRouter);

app.get("/home", (req, res) => {
  res.json({
    status: true,
    message: "Home page",
  });
});

app.use(fileErrorHandler);

app.listen(PORT, () => {
  console.log(`Server is now runnig on port ${PORT}`);
});
