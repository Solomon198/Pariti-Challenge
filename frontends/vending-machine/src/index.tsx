import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import ThemeProvider from './theme/index'
import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router-dom'
import router from './route.config'
import getStore from './_redux/config'
import { PersistGate } from 'redux-persist/integration/react'
import { ToastContainer } from 'react-toastify'

import axios from 'axios'
import 'react-toastify/dist/ReactToastify.css'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

axios.defaults.baseURL = process.env.REACT_API_URL

const { store, persistor } = getStore()
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <PersistGate persistor={persistor} loading={null}>
                <ThemeProvider>
                    <Suspense fallback={null}>
                        <RouterProvider router={router} />
                        <ToastContainer />
                    </Suspense>
                </ThemeProvider>
            </PersistGate>
        </Provider>
    </React.StrictMode>
)
