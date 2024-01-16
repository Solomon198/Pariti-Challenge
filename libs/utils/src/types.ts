export interface CurrencyValue {
  name: string
  value: number
  symbol: string
  balance: number
}

export type TCurrencyValue = Omit<CurrencyValue, 'balance'>
export type TProduct = Omit<IProduct, 'quantity'>

export interface IProduct {
  name: string
  price: number
  slot: number
  quantity: number
  currencySymbol: string
}
