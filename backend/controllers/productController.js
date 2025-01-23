import { productQuerySchema } from "../models/product.js";
import {
  getProductService,
  getProductsService,
} from "../services/productsService.js";

export const getProductsController = async (req, res) => {
  try {
    const { sort_by, category, title_search, rating } =
      productQuerySchema.parse(req.query);

    const products = await getProductsService(
      sort_by,
      category,
      title_search,
      Number(rating)
    );

    return res.status(200).json({
      data: {
        products,
        total: products.length,
      },
      error: null,
      success: true,
    });
  } catch (e) {
    return res.status(500).json({
      data: null,
      success: false,
      error: "Something went wrong",
    });
  }
};

export const getProductController = async (req, res) => {
  try {
    const product = await getProductService(req.params.id);
    return res.status(200).json({
      data: product,
      error: null,
      success: true,
    });
  } catch (e) {
    return res.status(500).json({
      data: null,
      success: false,
      error: "Something went wrong",
    });
  }
};
