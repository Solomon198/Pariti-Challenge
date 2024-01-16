import { type RouteObject, createBrowserRouter } from 'react-router-dom'
import {
    Home,
    UserDashboard,
    AdminDashboard,
    ManageProducts,
    ManageCoin,
} from './pages'

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
                path: 'manage-product',
                element: <ManageProducts />,
            },
            {
                path: 'manage-coins',
                element: <ManageCoin />,
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
