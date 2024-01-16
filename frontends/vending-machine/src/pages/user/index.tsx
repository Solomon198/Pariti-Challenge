/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { Grid, Container, Paper, Typography, Input } from '@mui/material'
import { useSelector, shallowEqual, useDispatch } from 'react-redux'
import DialpadTwoToneIcon from '@mui/icons-material/DialpadTwoTone'
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag'
import MoneyTwoToneIcon from '@mui/icons-material/MoneyTwoTone'
import { type IReduxStore } from '../../_redux/config'
import { Loader, RenderChange, RenderProduct } from '../../components'
import { useEffect, useState } from 'react'
import { SAGA_ACTIONS } from '../../_redux/actions'
import {
    StyledInputButton,
    StyledInputContainer,
    StyledSubmitButton,
} from './styled.components'

const UserDashboard = (): JSX.Element => {
    const [slot, setSlot] = useState<number | null>(null)
    const [coin, setCoin] = useState<number | null>(null)

    const {
        loadingProduct,
        products,
        selectedSlot,
        userDeposit,
        isAddingCoin,
        isSelectingSlot,
        isBuyingProduct,
        userChange,
    } = useSelector(
        (store: IReduxStore) => ({
            loadingProduct: store.user.loadingProduct,
            products: store.user.products,
            selectedSlot: store.user.selectedSlot,
            userDeposit: store.user.userDeposit,
            isAddingCoin: store.user.depositingCoin,
            isSelectingSlot: store.user.selectingSlot,
            isBuyingProduct: store.user.buyingProduct,
            userChange: store.user.userChange,
        }),
        shallowEqual
    )
    const dispatch = useDispatch()

    const handleFetchProduct = (): void => {
        dispatch({ type: SAGA_ACTIONS.USER_FETCH_PRODUCTS })
    }

    const handleSelectSlot = (): void => {
        dispatch({ type: SAGA_ACTIONS.USER_SELECT_SLOT, payload: { slot } })
    }

    const handleAddCoin = (): void => {
        dispatch({
            type: SAGA_ACTIONS.USER_DEPOSIT_COIN,
            payload: { coinValue: coin },
        })
    }

    const handleGetProduct = (): void => {
        dispatch({
            type: SAGA_ACTIONS.USER_BUY_PRODUCT,
        })
    }

    useEffect(() => {
        handleFetchProduct()
    }, [])

    return (
        <Container disableGutters maxWidth={false}>
            <Grid container>
                <Grid item xs={8} style={{ padding: 10 }}>
                    <Typography style={{ fontWeight: 'bold' }} variant="h5">
                        Products
                    </Typography>
                    {Boolean(loadingProduct) && products.length === 0 && (
                        <Loader text="Fetching Products" />
                    )}
                    <RenderProduct products={products} />
                </Grid>
                <StyledInputContainer item xs={4}>
                    <Paper style={{ padding: 10 }}>
                        <Typography>
                            <b> Slot</b> = {selectedSlot}
                        </Typography>
                        <Typography>
                            <b>Coins</b> = {userDeposit}
                            {products[0]?.currencySymbol}
                        </Typography>
                    </Paper>

                    <Paper
                        style={{
                            padding: 10,
                            display: 'flex',
                        }}
                    >
                        <Input
                            disableUnderline
                            sx={{ width: '50%' }}
                            placeholder="Enter slot number"
                            type="number"
                            value={slot}
                            onChange={(e) => {
                                setSlot(parseInt(e.target.value))
                            }}
                        />
                        <StyledInputButton
                            startIcon={<DialpadTwoToneIcon />}
                            variant="contained"
                            fullWidth
                            disabled={!slot || isSelectingSlot}
                            isLoading={isSelectingSlot}
                            onClick={handleSelectSlot}
                        >
                            Select Slot
                        </StyledInputButton>
                    </Paper>

                    <Paper
                        style={{
                            padding: 10,
                            display: 'flex',
                        }}
                    >
                        <Input
                            disableUnderline
                            placeholder="Enter coins"
                            sx={{ width: '50%' }}
                            type="number"
                            value={coin}
                            onChange={(e) => {
                                setCoin(parseInt(e.target.value))
                            }}
                        />
                        <StyledInputButton
                            startIcon={<MoneyTwoToneIcon />}
                            fullWidth
                            size="large"
                            isLoading={isAddingCoin}
                            disabled={!coin || isAddingCoin}
                            variant="contained"
                            onClick={handleAddCoin}
                        >
                            Add Coin
                        </StyledInputButton>
                    </Paper>

                    <StyledSubmitButton
                        fullWidth
                        variant="contained"
                        disabled={!userDeposit || !selectedSlot}
                        startIcon={<ShoppingBagIcon />}
                        isLoading={isBuyingProduct}
                        onClick={handleGetProduct}
                    >
                        Buy Item
                    </StyledSubmitButton>

                    {!isBuyingProduct && (
                        <RenderChange
                            title="Your change!"
                            userChange={userChange}
                        />
                    )}
                </StyledInputContainer>
            </Grid>
        </Container>
    )
}

export default UserDashboard
