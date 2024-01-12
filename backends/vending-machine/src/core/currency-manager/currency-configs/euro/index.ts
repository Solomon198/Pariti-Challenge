import { CurrencyValue } from "../../currency";

const coinsConfig: CurrencyValue[] = [
  { name: "cent", value: 1, symbol: "¢", balance: 10 },
  { name: "cent", value: 5, symbol: "¢", balance: 10 },
  { name: "cent", value: 10, symbol: "¢", balance: 10 },
  { name: "cent", value: 25, symbol: "¢", balance: 10 },
];

const notesConfig: CurrencyValue[] = [
  { name: "Euro", value: 5, symbol: "€", balance: 10 },
  { name: "Euro", value: 10, symbol: "€", balance: 10 },
  { name: "Euro", value: 20, symbol: "€", balance: 10 },
  { name: "Euro", value: 50, symbol: "€", balance: 10 },
  { name: "Euro", value: 100, symbol: "€", balance: 10 },
  { name: "Euro", value: 200, symbol: "€", balance: 10 },
  { name: "Euro", value: 500, symbol: "€", balance: 10 },
];

export default {
  coinsConfig,
  notesConfig,
};
