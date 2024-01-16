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
                        products: data as IProduct[],
                        status: false,
                    })
                )
            } catch (e: any) {
                yield put(fetchingUserProduct({ status: false }))
                const messages = handleRequestErrors(e)
                messages.forEach((msg) => {
                    console.log(msg)
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
            } catch (e: any) {
                yield put(depositingCoin({ status: false }))
                const messages = handleRequestErrors(e)
                messages.forEach((msg) => {
                    console.log(msg)
                })
            }
        }
    )
}

export function* watchSelectingSlot() {
    yield takeLeading(
        SAGA_ACTIONS.USER_DEPOSIT_COIN,
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
            } catch (e: any) {
                yield put(selectingSlot({ status: false }))
                const messages = handleRequestErrors(e)
                messages.forEach((msg) => {
                    console.log(msg)
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

                yield call(confirmPurchase.bind(null))

                yield put(
                    buyingProduct({
                        success: true,
                        status: false,
                    })
                )
            } catch (e: any) {
                yield put(buyingProduct({ status: false }))
                const messages = handleRequestErrors(e)
                messages.forEach((msg) => {
                    console.log(msg)
                })
            }
        }
    )
}
