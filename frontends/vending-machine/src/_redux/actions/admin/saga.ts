/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { takeLeading, put, call } from 'redux-saga/effects'
import {
    SAGA_ACTIONS,
    fetchingProduct,
    fetchingVault,
    productFetched,
    vaultFetched,
    updatingCoin,
    withdrawingCoins,
    updatingProduct,
} from '../'
import { handleRequestErrors } from '../../../utils'
import {
    fetchProduct,
    updateCoin,
    withdrawCoin,
    updateProduct,
    fetchVault,
} from '../../../api'
import { type AxiosResponse } from 'axios'
import { type CurrencyValue, type IProduct } from '@vending/utils'
import { toast } from 'react-toastify'

export function* watchFetchProduct() {
    yield takeLeading(
        SAGA_ACTIONS.ADMIN_FETCH_PRODUCTS,
        function* (action: any): Generator<any> {
            try {
                yield put(fetchingProduct({ status: true }))
                const products = yield call(fetchProduct.bind(null))
                const { data } = products as AxiosResponse
                yield put(productFetched({ products: data.data as IProduct[] }))
                yield put(fetchingProduct({ status: false }))
                toast.success('Product fetched successfully!')
            } catch (e: any) {
                yield put(fetchingProduct({ status: false }))
                const messages = handleRequestErrors(e)
                messages.forEach((msg) => {
                    toast.error(msg)
                })
            }
        }
    )
}

export function* watchFetchVault() {
    yield takeLeading(
        SAGA_ACTIONS.ADMIN_FETCH_VAULT,
        function* (action: any): Generator<any> {
            try {
                yield put(fetchingVault({ status: true }))
                const products = yield call(fetchVault.bind(null))
                const { data } = products as AxiosResponse
                yield put(vaultFetched({ vault: data.data as CurrencyValue[] }))
                yield put(fetchingVault({ status: false }))
                toast.success('Coins fetched successfully!')
            } catch (e: any) {
                yield put(fetchingVault({ status: false }))
                const messages = handleRequestErrors(e)
                messages.forEach((msg) => {
                    toast.error(msg)
                })
            }
        }
    )
}

export function* watchUpdateCoin() {
    yield takeLeading(
        SAGA_ACTIONS.ADMIN_UPATE_COIN,
        function* (action: any): Generator<any> {
            try {
                yield put(updatingCoin({ status: true }))
                const products = yield call(
                    updateCoin.bind(null, action.payload)
                )
                const { data } = products as AxiosResponse
                yield put(
                    updatingCoin({
                        status: false,
                        vault: data.data as CurrencyValue,
                    })
                )
                toast.success('Coins udpated successfully!')
            } catch (e: any) {
                yield put(updatingCoin({ status: false }))
                const messages = handleRequestErrors(e)
                messages.forEach((msg) => {
                    toast.error(msg)
                })
            }
        }
    )
}

export function* watchWithdrawCoin() {
    yield takeLeading(
        SAGA_ACTIONS.ADMIN_WITHDRAW_COIN,
        function* (action: any): Generator<any> {
            try {
                yield put(withdrawingCoins({ status: true }))
                const products = yield call(
                    withdrawCoin.bind(null, action.payload)
                )
                const { data } = products as AxiosResponse
                yield put(
                    withdrawingCoins({
                        status: false,
                        coin: data.data as CurrencyValue,
                    })
                )
                toast.success('Withdrawn successfully!')
            } catch (e: any) {
                yield put(withdrawingCoins({ status: false }))
                const messages = handleRequestErrors(e)
                messages.forEach((msg) => {
                    toast.error(msg)
                })
            }
        }
    )
}

export function* watchUpdateProduct() {
    yield takeLeading(
        SAGA_ACTIONS.ADMIN_UPDATE_PRODUCT,
        function* (action: any): Generator<any> {
            try {
                yield put(updatingProduct({ status: true }))
                const products = yield call(
                    updateProduct.bind(null, action.payload)
                )
                const { data } = products as AxiosResponse
                yield put(
                    updatingProduct({
                        status: false,
                        product: data.data as IProduct,
                    })
                )
                toast.success('Product updated successfully!')
            } catch (e: any) {
                yield put(updatingProduct({ status: false }))
                const messages = handleRequestErrors(e)
                messages.forEach((msg) => {
                    toast.error(msg)
                })
            }
        }
    )
}
