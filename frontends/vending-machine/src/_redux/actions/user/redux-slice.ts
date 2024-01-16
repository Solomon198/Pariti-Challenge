import { type PayloadAction, createSlice } from '@reduxjs/toolkit'
import { type IProduct, type CurrencyValue } from '@vending/utils'

interface IUserState {
    products: IProduct[]
    loadingProduct: boolean
    selectingSlot: boolean
    depositingCoin: boolean
    buyingProduct: boolean
    userDeposit: number
    selectedSlot: number | null
    userChange: CurrencyValue[]
}

const defaultState: IUserState = {
    products: [],
    loadingProduct: false,
    selectingSlot: false,
    depositingCoin: false,
    buyingProduct: false,
    userDeposit: 0,
    selectedSlot: null,
    userChange: [],
}

export const UserSlice = createSlice({
    name: 'user',
    initialState: defaultState,
    reducers: {
        fetchingUserProduct: (
            state,
            action: PayloadAction<{ status: boolean; products?: IProduct[] }>
        ) => {
            state.loadingProduct = action.payload.status
            if (action.payload.products !== undefined) {
                state.products = action.payload.products
            }
        },
        selectingSlot: (
            state,
            action: PayloadAction<{ status: boolean; slot?: number }>
        ) => {
            state.selectingSlot = action.payload.status
            if (action.payload.slot !== undefined) {
                state.selectedSlot = action.payload.slot
            }
        },
        depositingCoin: (
            state,
            action: PayloadAction<{ status: boolean; userDeposits?: number }>
        ) => {
            state.depositingCoin = action.payload.status
            if (action.payload.userDeposits !== undefined) {
                state.userDeposit = action.payload.userDeposits
            }
        },
        buyingProduct: (
            state,
            action: PayloadAction<{
                status: boolean
                change?: CurrencyValue[]
                product?: IProduct
            }>
        ) => {
            state.buyingProduct = action.payload.status
            if (action.payload.change !== undefined) {
                state.selectedSlot = null
                state.userDeposit = 0
                state.userChange = action.payload.change
                // update products
                const pIndex = state.products.findIndex(
                    (p) => p.slot === action.payload.product?.slot
                )
                state.products[pIndex] = action.payload.product as IProduct
            }
        },
    },
})

export const {
    fetchingUserProduct,
    buyingProduct,
    selectingSlot,
    depositingCoin,
} = UserSlice.actions
