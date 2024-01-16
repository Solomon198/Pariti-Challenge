import { type PayloadAction, createSlice } from '@reduxjs/toolkit'
import { type IProduct } from '@vending/utils'

interface IUserState {
    products: IProduct[]
    loadingProduct: boolean
    selectingSlot: boolean
    depositingCoin: boolean
    buyingProduct: boolean
    userDeposit: number
    selectedSlot: number | null
}

const defaultState: IUserState = {
    products: [],
    loadingProduct: false,
    selectingSlot: false,
    depositingCoin: false,
    buyingProduct: false,
    userDeposit: 0,
    selectedSlot: null,
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
            action: PayloadAction<{ status: boolean; success?: boolean }>
        ) => {
            state.buyingProduct = action.payload.status
            if (action.payload.success === true) {
                state.selectedSlot = null
                state.userDeposit = 0
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
