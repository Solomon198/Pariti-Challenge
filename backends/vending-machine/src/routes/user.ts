import express from "express";
import expressAsyncHandler from "express-async-handler";
import { getProducts, depositFunds, buyProduct } from "../handlers";
import { ValidateRequest } from "../middlewares";
import { validateDepositFunds, validateSelectSlot } from "../utils";

const userRouter = express.Router();

userRouter.get("/products", expressAsyncHandler(getProducts));

userRouter.post(
  "/deposit-coin",
  validateDepositFunds,
  expressAsyncHandler(ValidateRequest),
  expressAsyncHandler(depositFunds)
);

userRouter.post(
  "/select-slot",
  validateSelectSlot,
  expressAsyncHandler(ValidateRequest),
  expressAsyncHandler(depositFunds)
);

userRouter.post("/confirm-purchase", expressAsyncHandler(buyProduct));

export default userRouter;
