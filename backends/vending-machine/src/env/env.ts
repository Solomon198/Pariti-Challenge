import { cleanEnv, str, num, testOnly } from "envalid";
require("dotenv").config();

export interface ENV {
  NODE_ENV: string;
  PORT: number;
}

const getEnv = (): ENV => {
  const env = cleanEnv(process.env, {
    NODE_ENV: str(),
    PORT: num(),
  });

  return env as ENV;
};

const env = getEnv();
export default env;
