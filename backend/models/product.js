import { z } from "zod";
import { Schema, model } from "mongoose";

export const productQuerySchema = z
  .object({
    sort_by: z
      .enum(["", "PRICE_HIGH", "PRICE_LOW", "RATING_HIGH", "RATING_LOW"])
      .optional(),

    category: z
      .enum(["", "clothing", "appliances", "electronics", "grocery", "toys"])
      .optional(),

    search: z.string().trim().max(100).default("").optional(),
    rating: z.coerce.number().gte(0).lte(5).default(0).optional(),
  })
  .strict();

const productSchema = new Schema(
  {
    title: {
      type: String,
      unique: true,
      required: true,
    },
    style: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: ["clothing", "appliances", "electronics", "grocery", "toys"],
    },
    description: {
      type: String,
      required: true,
    },
    total_reviews: {
      type: Number,
      required: true,
    },
    in_stock: {
      type: Boolean,
      default: true,
    },
    sold: {
      type: Number,
      default: 0,
    },
    remaining: {
      type: Number,
      default: 0,
    },
    price: {
      min: 0,
      type: Number,
      required: true,
    },
    image_url: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 0,
      max: 5,
    },
  },
  { timestamps: true }
);

const Product = model("Product", productSchema);

export default Product;
