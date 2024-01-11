import { type RouteObject, createBrowserRouter } from 'react-router-dom'

const RouteConfigs: RouteObject[] = [
    {
        path: '*',
        element: (
            <div>
                <h1>Welcome</h1>
            </div>
        ),
    },
]

const Routes = RouteConfigs.map(({ path, element, children }) => ({
    path,
    element,
    children,
}))

const router = createBrowserRouter(Routes)

export default router
