import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import ThemeProvider from './theme/index'
import { RouterProvider } from 'react-router-dom'
import router from './route.config'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
    <React.StrictMode>
        <ThemeProvider>
            <RouterProvider router={router} />
        </ThemeProvider>
    </React.StrictMode>
)
