import { Router } from "express";
import {
  getProductController,
  getProductsController,
} from "../controllers/productController.js";

const productRoute = Router();

productRoute.get("/", getProductsController);

productRoute.get("/:id", getProductController);

export default productRoute;
