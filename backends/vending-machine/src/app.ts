import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import { AdminRouter, userRouter } from "./routes";
import { ErrorHandler } from "./middlewares";

// ----- GENERAL CONFIG ---- //
const app = express();
app.use(json());

app.use("/admin", AdminRouter);
app.use("/users", userRouter);

app.all("*", async (req, res) => {
  res.send({});
});

app.use(ErrorHandler);

export { app };
