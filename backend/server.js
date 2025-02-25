import "dotenv/config";
import cors from "cors";
import helmet from "helmet";
import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";

import logger from "./middlewares/logger.js";
import authorize from "./middlewares/authorize.js";
import { authLimiter, globalLimiter } from "./middlewares/apiLimiter.js";

import authRoute from "./routes/authRoute.js";
import productRoute from "./routes/productRoute.js";

export const environment = process.env.ENVIRONMENT || "production";

const port = process.env.PORT || 8080;
const frontendOrigin = process.env.FRONTEND_ORIGIN || "http://localhost:3000";

const server = express();

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

    // private routes

    server.use(globalLimiter, authorize);

    server.use("/products", productRoute);

    server.use("*", (req, res) => {
      res
        .status(404)
        .send("Looks like, the page you are looking for doesn't exist");
    });

    server.listen(port, () =>
      console.log(`Server running on http://localhost:${port}`)
    );
  } catch (err) {
    console.log(`Server error: ${err.message}`);
    process.exit(1);
  }
};

startServer();
