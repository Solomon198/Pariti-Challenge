import { all } from 'redux-saga/effects'
import {
    watchFetchProduct,
    watchFetchVault,
    watchUpdateCoin,
    watchUpdateProduct,
    watchWithdrawCoin,
    watchConfirmPurchase,
    watchDepositCoins,
    watchFetchUserProduct,
    watchSelectingSlot,
} from '../actions'
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default function* rootSaga() {
    yield all([
        watchFetchProduct(),
        watchFetchVault(),
        watchUpdateCoin(),
        watchUpdateProduct(),
        watchWithdrawCoin(),
        watchConfirmPurchase(),
        watchDepositCoins(),
        watchFetchUserProduct(),
        watchSelectingSlot(),
    ])
}
