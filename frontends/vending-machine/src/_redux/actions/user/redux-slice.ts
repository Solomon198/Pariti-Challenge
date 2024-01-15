import { type PayloadAction, createSlice } from '@reduxjs/toolkit'
import { type IProduct } from '@vending/utils'

interface IUserState {
    products: IProduct[]
    loadingProduct: boolean
    selectingSlot: boolean
    depositingCoin: boolean
    buyingProduct: boolean
}

const defaultState: IUserState = {
    products: [],
    loadingProduct: false,
    selectingSlot: false,
    depositingCoin: false,
    buyingProduct: false,
}

export const UserSlice = createSlice({
    name: 'user',
    initialState: defaultState,
    reducers: {
        fetchingProduct: (
            state,
            action: PayloadAction<{ status: boolean }>
        ) => {
            state.loadingProduct = action.payload.status
        },
        productFetched: (
            state,
            action: PayloadAction<{ products: IProduct[] }>
        ) => {
            state.products = action.payload.products
            state.loadingProduct = false
        },
        selectingSlot: (
            state,
            action: PayloadAction<{ status: boolean }>
        ) => {
            state.selectingSlot = action.payload.status
        },
        depositingCoin: (
            state,
            action: PayloadAction<{ status: boolean }>
        ) => {
            state.depositingCoin = action.payload.status
        },
        buyingProduct: (
            state,
            action: PayloadAction<{ status: boolean }>
        ) => {
            state.buyingProduct = action.payload.status
        },
    },
})

export const {
    fetchingProduct,
    buyingProduct,
    productFetched,
    selectingSlot,
    depositingCoin,
    
} = UserSlice.actions
