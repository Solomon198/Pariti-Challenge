import { CurrencyValue } from "../../currency";

const coinsConfig: CurrencyValue[] = [
  { name: "Penny", value: 1, symbol: "¢", balance: 10 },
  { name: "Nickel", value: 5, symbol: "¢", balance: 10 },
  { name: "Dime", value: 10, symbol: "¢", balance: 10 },
  { name: "Quarter", value: 25, symbol: "¢", balance: 10 },
];

const notesConfig: CurrencyValue[] = [
  { name: "Dollar", value: 1, symbol: "$", balance: 10 },
  { name: "Dollar", value: 2, symbol: "$", balance: 10 },
  { name: "Dollar", value: 5, symbol: "$", balance: 10 },
  { name: "Dollar", value: 10, symbol: "$", balance: 10 },
  { name: "Dollar", value: 20, symbol: "$", balance: 10 },
  { name: "Dollar", value: 50, symbol: "$", balance: 10 },
  { name: "Dollar", value: 100, symbol: "$", balance: 10 },
];

export default {
  coinsConfig,
  notesConfig,
};
