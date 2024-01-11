import { app } from "./app";
import env from "./env/env";

const startApplication = async () => {
  app.listen(env.PORT, () => {
    console.log(`Application Running at PORT ${env.PORT}`);
  });
};

// cleanup watchers

process.on("uncaughtException", (error) => {
  console.log(error.message);
});

startApplication();
