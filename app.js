import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import dbConnection from "./database/dbConnection.js";
import { errorMiddleware } from "./middlewares/error.js";
import messageRouter from "./router/messageRoutes.js";
import userRouter from "./router/userRoutes.js";
import timelineRouter from "./router/timelineRoutes.js";
import softwareApplicationRouter from "./router/softwareApplicationRoutes.js";

const app = express();
dotenv.config({ path: "./config/config.env" });

// Connection of backend and frontend we use middleware called cors
app.use(
  cors({
    // In origin we should give the frontend url so that the frontend can access the backend
    origin: [process.env.PORTFOLIO_URI, process.env.DASHBOARD_URI],

    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);

//cookieParser is used beacuse when ever the user logged in the cookie will be enerated so to store the changes and data we use cookieParser
app.use(cookieParser());
app.use(express.json()); // Used for Data parseing
app.use(express.urlencoded({ extended: true }));
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/temp/",
  })
); // Used because the files which sent by frontend can get by this

app.use("/api/v1/message", messageRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/timeline", timelineRouter);
app.use("/api/v1/softwareapplication", softwareApplicationRouter);

dbConnection();
app.use(errorMiddleware);

export default app;
