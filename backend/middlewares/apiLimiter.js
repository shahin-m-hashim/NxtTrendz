import rateLimit from "express-rate-limit";

export const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: {
    data: null,
    success: false,
    error: "Too many requests, please try again later.",
  },
  standardHeaders: "draft-7", // Set `RateLimit-*` headers
  headers: true, // Include rate limit info in response headers
  legacyHeaders: false, // Disable deprecated `X-RateLimit-*` headers
});

export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 5 minutes
  max: 50,
  message: {
    data: null,
    success: false,
    error: "Too many requests, please try again later.",
  },
  headers: true,
  legacyHeaders: false,
  standardHeaders: "draft-7",
});
