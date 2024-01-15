import { CreateCurrency } from "./currency";
import currencyConfigs from "./currency-configs";

type TCurrencies = Lowercase<keyof typeof currencyConfigs>;

type IntialObjectStruct = {
  [K in TCurrencies]: CreateCurrency;
};

export function getAllCurrencyCoins() {
  return Object.entries(currencyConfigs).reduce((prev, [currency, config]) => {
    return {
      ...prev,
      [currency.toLowerCase() as TCurrencies]: new CreateCurrency(
        config.coinsConfig
      ),
    };
  }, {} as IntialObjectStruct);
}
