import { type PayloadAction, createSlice } from '@reduxjs/toolkit'
import { type CurrencyValue, type IProduct } from '@vending/utils'

interface IAdminState {
    products: IProduct[]
    machineVault: CurrencyValue[]
    loadingProduct: boolean
    loadingVault: boolean
    updatingProductStatus: boolean
    withdrawingCashStatus: boolean
    updatingAvailableCoinStatus: boolean
    updatingCoin: boolean
    withdrawals: CurrencyValue[]
}

const defaultState: IAdminState = {
    products: [],
    machineVault: [],
    loadingProduct: false,
    loadingVault: false,
    updatingProductStatus: false,
    withdrawingCashStatus: false,
    updatingAvailableCoinStatus: false,
    updatingCoin: false,
    withdrawals: [],
}

export const AdminSlice = createSlice({
    name: 'admin',
    initialState: defaultState,
    reducers: {
        updatingCoin: (
            state,
            action: PayloadAction<{ status: boolean; vault?: CurrencyValue[] }>
        ) => {
            state.loadingProduct = action.payload.status
            if (action.payload.vault !== undefined) {
                state.machineVault = action.payload.vault
            }
        },
        fetchingProduct: (
            state,
            action: PayloadAction<{ status: boolean }>
        ) => {
            state.loadingProduct = action.payload.status
        },
        fetchingVault: (state, action: PayloadAction<{ status: boolean }>) => {
            state.loadingVault = action.payload.status
        },
        vaultFetched: (
            state,
            action: PayloadAction<{ vault: CurrencyValue[] }>
        ) => {
            state.machineVault = action.payload.vault
        },
        productFetched: (
            state,
            action: PayloadAction<{ products: IProduct[] }>
        ) => {
            state.products = action.payload.products
            state.loadingProduct = false
        },
        updatingProduct: (
            state,
            action: PayloadAction<{ status: boolean; product?: IProduct }>
        ) => {
            state.updatingProductStatus = action.payload.status
            if (action.payload.product !== undefined) {
                const productIndex = state.products.findIndex(
                    (p) => p.slot === action.payload.product?.slot
                )
                state.products[productIndex] = action.payload.product
            }
        },
        withdrawingCoins: (
            state,
            action: PayloadAction<{ status: boolean; coin?: CurrencyValue[] }>
        ) => {
            state.withdrawingCashStatus = action.payload.status
            if (action.payload.coin !== undefined) {
                state.withdrawals = action.payload.coin
            }
        },
    },
})

export const {
    fetchingProduct,
    fetchingVault,
    productFetched,
    vaultFetched,
    updatingProduct,
    withdrawingCoins,
    updatingCoin,
} = AdminSlice.actions
