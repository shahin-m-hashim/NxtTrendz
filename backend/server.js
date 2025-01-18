import "dotenv/config";
import cors from "cors";
import helmet from "helmet";
import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";

import logger from "./middlewares/logger.js";

const server = express();
const frontendOrigin = process.env.FRONTEND_ORIGIN;

const startServer = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URI);
    console.log("Database connected successfully");

    server.use(
      cors({
        origin: frontendOrigin,
        methods: "GET, POST, PUT, PATCH, DELETE",
        credentials: true,
      })
    );

    server.use(express.json());
    server.use(cookieParser());
    server.use(express.urlencoded({ extended: true }));

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

    server.use(logger);

    server.use("*", (req, res) => {
      res
        .status(404)
        .send("Looks like, the page you are looking for doesn't exist");
    });

    server.listen(8080, () =>
      console.log(`Server started running on http://localhost:8080`)
    );
  } catch (err) {
    if (err instanceof mongoose.Error) {
      console.error("Database connection error:", {
        name: err.name,
        message: err.message,
      });
    } else {
      console.log(`Server Error: ${err.message}`);
    }

    process.exit(1);
  }
};

startServer();
