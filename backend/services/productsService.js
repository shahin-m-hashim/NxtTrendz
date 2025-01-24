import Product from "../models/product.js";
import shuffleArray from "../utils/shuffleArray.js";

export const getProductsService = async (
  search = "",
  sortBy = "",
  category = "",
  rating = 0
) => {
  const aggregationPipeline = [];

  if (search) {
    aggregationPipeline.push({
      $search: {
        index: "product_title",
        text: {
          query: search,
          path: "title",
          fuzzy: {
            maxEdits: 2,
            prefixLength: 2,
            maxExpansions: 10,
          },
        },
      },
    });
  }

  const matchStage = {};
  if (category) matchStage.category = category;
  if (rating) matchStage.rating = { $gte: rating };

  if (category || rating) aggregationPipeline.push({ $match: matchStage });

  const sortOption = {};
  if (sortBy === "PRICE_LOW") sortOption.price = 1;
  if (sortBy === "PRICE_HIGH") sortOption.price = -1;
  if (sortBy === "RATING_LOW") sortOption.rating = 1;
  if (sortBy === "RATING_HIGH") sortOption.rating = -1;

  if (Object.keys(sortOption).length > 0) {
    aggregationPipeline.push({ $sort: sortOption });
  }

  const products = await Product.aggregate([
    ...aggregationPipeline,
    {
      $project: {
        _id: 1,
        title: 1,
        brand: 1,
        price: 1,
        rating: 1,
        image_url: 1,
      },
    },
  ]);

  return products;
};

export const getProductService = async (id) => {
  const product = await Product.findById(id).select(
    "-__v -createdAt -updatedAt"
  );

  if (!product) throw new Error("Product not found.");

  let similarProducts = await Product.find({
    category: product.category,
    _id: { $ne: id },
  })
    .select("_id title brand price rating image_url")
    .lean();

  similarProducts = shuffleArray(similarProducts).slice(0, 3);

  return { product, similarProducts };
};
