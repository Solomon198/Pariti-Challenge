import express from "express";
import {
  getProducts,
  getCoins,
  updateProduct,
  updateCoin,
  withDrawCoin,
} from "../handlers";
import expressAsyncHandler from "express-async-handler";
import { ValidateRequest } from "../middlewares";
import { validateUpdateProduct, validateUpdateCoin } from "../utils";

const AdminRouter = express.Router();

AdminRouter.get("/products", expressAsyncHandler(getProducts));
AdminRouter.get("/coins", expressAsyncHandler(getCoins));

AdminRouter.put(
  "/products/:slot",
  validateUpdateProduct,
  expressAsyncHandler(ValidateRequest),
  expressAsyncHandler(updateProduct)
);

AdminRouter.put(
  "/coins/withdraw/:coinValue",
  validateUpdateCoin,
  expressAsyncHandler(ValidateRequest),
  expressAsyncHandler(withDrawCoin)
);
AdminRouter.put(
  "/coins/:coinValue",
  validateUpdateCoin,
  expressAsyncHandler(ValidateRequest),
  expressAsyncHandler(updateCoin)
);

export default AdminRouter;
