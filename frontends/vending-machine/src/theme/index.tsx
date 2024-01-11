import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material'

const ThemeProvider = ({
    children,
}: {
    children: React.ReactElement
}): JSX.Element => {
    const theme = createTheme()
    return <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
}

export default ThemeProvider
