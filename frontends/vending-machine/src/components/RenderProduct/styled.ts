import { styled, Paper } from '@mui/material'

export const Slot = styled('div')(({ theme }) => ({
    width: 25,
    height: 25,
    borderRadius: '100%',
    backgroundColor: theme.palette.primary.main,
    color: 'white',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    display: 'flex',
    fontWeight: 'bold',
}))

export const SlotContainer = styled('div')({
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    display: 'flex',
    marginTop: 5,
})

export const ProductContainer = styled(Paper)({
    padding: 16,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'whitesmoke',
    height: 60,
})
