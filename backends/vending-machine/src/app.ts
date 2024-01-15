import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import cookieSession from "cookie-session";
import { AdminRouter, userRouter } from "./routes";
import { ErrorHandler } from "./middlewares";

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

app.use("/admin", AdminRouter);
app.use("/user", userRouter);

app.all("*", async (req, res) => {
  res.send({});
});

app.use(ErrorHandler);

export { app };
