import express from "express";
import {
  getProducts,
  getCoins,
  updateProduct,
  updateCoin,
  withDrawCoin,
} from "../handlers";
import expressAsyncHandler from "express-async-handler";

const AdminRouter = express.Router();

AdminRouter.get("/products", expressAsyncHandler(getProducts));
AdminRouter.get("/coins", expressAsyncHandler(getCoins));
AdminRouter.put("/products/:slot", expressAsyncHandler(updateProduct));
AdminRouter.put("/coins/withdraw/:value", expressAsyncHandler(withDrawCoin));
AdminRouter.put("/coins/:value", expressAsyncHandler(updateCoin));

export default AdminRouter;
