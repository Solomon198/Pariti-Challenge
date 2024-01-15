import { body } from "express-validator";

export const validateSelectSlot = [body("slot").isInt()];

export const validateDepositFunds = [body("coinValue").isInt()];
