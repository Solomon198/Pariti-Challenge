import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import cookieSession from "cookie-session";
import VendingMachine from "./core/vending-machine";

console.log(VendingMachine.machineVault);
// ----- GENERAL CONFIG ---- //
const app = express();
app.set("trust proxy", true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== "test",
  })
);

app.all("*", async (req, res) => {
  res.send({});
});

export { app };
