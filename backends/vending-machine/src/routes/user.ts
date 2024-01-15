import express from "express";
import expressAsyncHandler from "express-async-handler";
import { getProducts, depositFunds, buyProduct } from "../handlers";

const userRouter = express.Router();

userRouter.get("/products", expressAsyncHandler(getProducts));
userRouter.post("/deposit-coin", expressAsyncHandler(depositFunds));
userRouter.post("/select-slot", expressAsyncHandler(depositFunds));
userRouter.post("/confirm-purchase", expressAsyncHandler(buyProduct));

export default userRouter;
