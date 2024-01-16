/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { takeLeading, put, call } from 'redux-saga/effects'
import {
    SAGA_ACTIONS,
    fetchingUserProduct,
    depositingCoin,
    selectingSlot,
    buyingProduct,
} from '../'
import { handleRequestErrors } from '../../../utils'
import {
    fetchUserProduct,
    depositCoin,
    selectSlot,
    confirmPurchase,
} from '../../../api'
import { type AxiosResponse } from 'axios'
import { type IProduct } from '@vending/utils'
import { toast } from 'react-toastify'

export function* watchFetchUserProduct() {
    yield takeLeading(
        SAGA_ACTIONS.USER_FETCH_PRODUCTS,
        function* (action: any): Generator<any> {
            try {
                yield put(fetchingUserProduct({ status: true }))
                const products = yield call(fetchUserProduct.bind(null))
                const { data } = products as AxiosResponse
                yield put(
                    fetchingUserProduct({
                        products: data.data as IProduct[],
                        status: false,
                    })
                )
                toast.success('Products fetched successfully!!')
            } catch (e: any) {
                yield put(fetchingUserProduct({ status: false }))
                const messages = handleRequestErrors(e)
                messages.forEach((msg) => {
                    toast.error(msg)
                })
            }
        }
    )
}

export function* watchDepositCoins() {
    yield takeLeading(
        SAGA_ACTIONS.USER_DEPOSIT_COIN,
        function* (action: any): Generator<any> {
            try {
                yield put(depositingCoin({ status: true }))
                const products = yield call(
                    depositCoin.bind(null, action.payload)
                )
                const { data } = products as AxiosResponse
                yield put(
                    depositingCoin({
                        userDeposits: data.data.userDeposits,
                        status: false,
                    })
                )
                toast.success('Coin added successfully!')
            } catch (e: any) {
                yield put(depositingCoin({ status: false }))
                const messages = handleRequestErrors(e)
                messages.forEach((msg) => {
                    toast.error(msg)
                })
            }
        }
    )
}

export function* watchSelectingSlot() {
    yield takeLeading(
        SAGA_ACTIONS.USER_SELECT_SLOT,
        function* (action: any): Generator<any> {
            try {
                yield put(selectingSlot({ status: true }))
                const products = yield call(
                    selectSlot.bind(null, action.payload)
                )
                const { data } = products as AxiosResponse
                yield put(
                    selectingSlot({
                        slot: data.data.slot,
                        status: false,
                    })
                )
                toast.success('Slot selected!')
            } catch (e: any) {
                yield put(selectingSlot({ status: false }))
                const messages = handleRequestErrors(e)
                messages.forEach((msg) => {
                    toast.error(msg)
                })
            }
        }
    )
}

export function* watchConfirmPurchase() {
    yield takeLeading(
        SAGA_ACTIONS.USER_BUY_PRODUCT,
        function* (action: any): Generator<any> {
            try {
                yield put(buyingProduct({ status: true }))

                const result = yield call(confirmPurchase.bind(null))
                const { data } = result as AxiosResponse
                yield put(
                    buyingProduct({
                        ...data.data,
                        status: false,
                    })
                )
                toast.success('Product dispensed!')
            } catch (e: any) {
                yield put(buyingProduct({ status: false }))
                const messages = handleRequestErrors(e)
                messages.forEach((msg) => {
                    toast.error(msg)
                })
            }
        }
    )
}
