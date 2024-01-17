import { type FC } from 'react'
import {
    render,
    type RenderResult,
    type RenderOptions,
} from '@testing-library/react'
import ThemeProvider from '../theme/index'
import '@testing-library/jest-dom'

const getProvider = (): FC<{ children: React.ReactElement }> => {
    const Provider: FC<{ children: React.ReactElement }> = ({ children }) => {
        return <ThemeProvider>{children}</ThemeProvider>
    }
    return Provider
}

const customRender = (
    UI: JSX.Element,
    options?: RenderOptions
): RenderResult => {
    return render(UI, {
        wrapper: getProvider(),
        ...options,
    })
}

export * from '@testing-library/react'
export { customRender }
