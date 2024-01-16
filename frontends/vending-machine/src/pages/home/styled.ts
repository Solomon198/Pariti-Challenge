import { styled, Grid } from '@mui/material'
import { Button } from '../../components'

export const StyledButton = styled(Button)(() => ({
    textTransform: 'capitalize',
    margin: 10,
    width: 300,
    paddingTop: 10,
    paddingBottom: 10,
    fontWeight: 'bold',
}))

export const StyledRightPaneContainer = styled(Grid)(() => ({
    justifyContent: 'center',
    alignContent: 'center',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
}))

export const StyledBgImageContainer = styled(Grid)(() => ({
    backgroundImage: `url(/assets/machine.jpg)`,
    height: '100vh',
}))
