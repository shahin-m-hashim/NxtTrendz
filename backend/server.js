import "dotenv/config";
import cors from "cors";
import helmet from "helmet";
import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";

import logger from "./middlewares/logger.js";

import authRoute from "./routes/authRoute.js";
import { authLimiter, globalLimiter } from "./middlewares/apiLimiter.js";

const server = express();
const frontendOrigin = process.env.FRONTEND_ORIGIN;

mongoose.connection.on("connected", () => console.log("DB connected."));
mongoose.connection.on("error", (err) => console.error("DB error:", err));
mongoose.connection.on("disconnected", () => console.log("DB disconnected."));

const startServer = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URI);

    server.use(
      cors({
        credentials: true,
        origin: frontendOrigin,
        methods: ["GET, POST, PUT, PATCH, DELETE"],
      })
    );

    server.use(
      helmet({
        contentSecurityPolicy: {
          directives: {
            imgSrc: ["'none'"],
            fontSrc: ["'none'"],
            styleSrc: ["'none'"],
            scriptSrcAttr: ["'none'"],
            frameAncestors: ["'none'"],
            connectSrc: ["'self'", frontendOrigin],
          },
        },
      })
    );

    server.use(express.json());
    server.use(cookieParser());
    server.use(express.urlencoded({ extended: true }));

    server.use(logger);

    server.use("/auth", authLimiter, authRoute);

    server.use(globalLimiter);

    // private routes

    server.use("*", (req, res) => {
      res
        .status(404)
        .send("Looks like, the page you are looking for doesn't exist");
    });

    server.listen(process.env.PORT, () =>
      console.log(`Server running on http://localhost:${process.env.PORT}`)
    );
  } catch (err) {
    console.log(`Server error: ${err.message}`);
    process.exit(1);
  }
};

startServer();
