import { Grid, styled } from '@mui/material'
import { Button } from '../../components'

export const StyledInputContainer = styled(Grid)({
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'center',
    justifyContent: 'center',
    backgroundColor: 'whitesmoke',
    height: '100vh',
    padding: 10,
})

export const StyledInputButton = styled(Button)({
    textTransform: 'capitalize',
    paddingTop: 10,
    paddingBottom: 10,
    fontWeight: 'bold',
})

export const StyledSubmitButton = styled(Button)({
    textTransform: 'capitalize',
    paddingTop: 10,
    paddingBottom: 10,
    marginTop: 15,
    fontWeight: 'bold',
})
