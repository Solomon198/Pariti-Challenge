import { body, check } from "express-validator";

export const validateUpdateProduct = [
  check("slot").isInt(),
  body(["price", "quantity"]).isInt().optional(),
];

export const validateUpdateCoin = [
  check("coinValue").isInt(),
  body("quantity").isInt(),
];
