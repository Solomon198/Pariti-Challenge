import { configureStore } from '@reduxjs/toolkit'
import { rootReducer } from './root-reducer'
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import createSagaMiddleware from 'redux-saga'
import rootSaga from './root-saga'

const persistConfig = {
    key: 'root',
    storage,
}

const sagaMiddleware = createSagaMiddleware()
const perisistedReducer = persistReducer(persistConfig, rootReducer)
const store = configureStore({
    reducer: perisistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ serializableCheck: false }).concat(
            sagaMiddleware
        ),
})

export type IReduxStore = ReturnType<typeof store.getState>

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default () => {
    const persistor = persistStore(store)
    sagaMiddleware.run(rootSaga)
    // persistor
    //     .purge()
    //     .then(() => {
    //         alert('yeah')
    //     })
    //     .catch((e) => {})
    return { store, persistor }
}
