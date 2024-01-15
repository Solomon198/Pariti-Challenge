import { cleanEnv, str, num } from "envalid";
import { getAllCurrencyCoins } from "../core/currency-manager";

const coins = getAllCurrencyCoins();

require("dotenv").config();
export interface ENV {
  NODE_ENV: string;
  PORT: number;
  COINS_CURRENCY: keyof typeof coins;
  SLOT_SIZE: number;
  SLOTS: number;
}

const getEnv = (): ENV => {
  const env = cleanEnv(process.env, {
    NODE_ENV: str(),
    PORT: num(),
    COINS_CURRENCY: str({ choices: Object.keys(coins) }),
    SLOT_SIZE: num(),
    SLOTS: num(),
  });

  return env as ENV;
};

const env = getEnv();
export default env;
