import { type RouteObject, createBrowserRouter } from 'react-router-dom'
import { Home, UserDashboard, AdminDashboard } from './pages'

const RouteConfigs: RouteObject[] = [
    {
        path: '/',
        element: <Home />,
    },
    {
        path: '/admin',
        element: <AdminDashboard />,
        children: [
            {
                path: '/manage-product',
                element: <h1>Manage Products</h1>,
            },
            {
                path: '/manage-coins',
                element: <h1>Manage Coins</h1>,
            },
        ],
    },
    {
        path: '/user',
        element: <UserDashboard />,
    },
]

const Routes = RouteConfigs.map(({ path, element, children }) => ({
    path,
    element,
    children,
}))

const router = createBrowserRouter(Routes)

export default router
