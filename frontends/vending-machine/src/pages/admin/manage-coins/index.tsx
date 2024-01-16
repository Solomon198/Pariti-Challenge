/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { Grid, Container, Typography, Paper, TextField } from '@mui/material'
import { useSelector, shallowEqual, useDispatch } from 'react-redux'
import { type IReduxStore } from '../../../_redux/config'
import { Loader, RenderChange } from '../../../components'
import { useEffect, useState } from 'react'
import { SAGA_ACTIONS } from '../../../_redux/actions'
import { type CurrencyValue } from '@vending/utils'
import { StyledInputContainer, StyledSubmitButton } from '../styled.components'
import InfoIcon from '@mui/icons-material/Info'
import RenderCoins from '../../../components/RenderCoins'

const Manageproduct = (): JSX.Element => {
    const [coin, setCoin] = useState<CurrencyValue>({} as any as CurrencyValue)
    const {
        loadingVault,
        machineVault,
        updatingCoin,
        withdrawingCashStatus,
        withdrawals,
    } = useSelector(
        (store: IReduxStore) => ({
            loadingVault: store.admin.loadingVault,
            machineVault: store.admin.machineVault,
            updatingCoin: store.admin.updatingCoin,
            withdrawingCashStatus: store.admin.withdrawingCashStatus,
            withdrawals: store.admin.withdrawals,
        }),
        shallowEqual
    )
    const dispatch = useDispatch()

    const handleFetchValut = (): void => {
        dispatch({ type: SAGA_ACTIONS.ADMIN_FETCH_VAULT })
    }

    const handleWithdrawCoin = (): void => {
        const { balance, value } = coin

        dispatch({
            type: SAGA_ACTIONS.ADMIN_WITHDRAW_COIN,
            payload: { coinValue: value, quantity: balance },
        })
    }

    const handleUpdateCoin = (): void => {
        const { balance, value } = coin
        console.log(balance, value)
        dispatch({
            type: SAGA_ACTIONS.ADMIN_UPATE_COIN,
            payload: { coinValue: value, quantity: balance },
        })
    }

    useEffect(() => {
        handleFetchValut()
    }, [])

    return (
        <Container disableGutters maxWidth={false}>
            <Grid container>
                <Grid item xs={8} style={{ padding: 10 }}>
                    <Typography style={{ fontWeight: 'bold' }} variant="h5">
                        Coins
                    </Typography>
                    {Boolean(loadingVault) && machineVault.length === 0 && (
                        <Loader text="Fetching Coins" />
                    )}
                    <RenderCoins
                        onSelect={(coin) => {
                            setCoin(coin)
                        }}
                        coins={machineVault}
                    />
                </Grid>
                <StyledInputContainer item xs={4}>
                    {Object.keys(coin).length > 0 && (
                        <>
                            <Typography variant="h6" fontWeight={'bold'} my={2}>
                                Update / Withdraw Coin
                            </Typography>
                            <Paper style={{ padding: 10 }}>
                                <Typography>
                                    <b>Currency Name</b> = {coin.name}
                                </Typography>
                                <Typography>
                                    <b>Currency Value</b> = {coin.value}
                                    {coin.symbol}
                                </Typography>
                            </Paper>

                            <Paper
                                style={{
                                    padding: 10,
                                }}
                            >
                                <TextField
                                    label="Update / Withdraw Quantity"
                                    sx={{ width: '100%' }}
                                    type="number"
                                    placeholder=""
                                    value={coin.balance}
                                    onChange={(e) => {
                                        setCoin((prev) => ({
                                            ...prev,
                                            balance: parseInt(e.target.value),
                                        }))
                                    }}
                                />
                            </Paper>

                            <StyledSubmitButton
                                onClick={handleUpdateCoin}
                                disabled={updatingCoin}
                                isLoading={updatingCoin}
                                fullWidth
                                variant="contained"
                            >
                                Update Coin
                            </StyledSubmitButton>
                            <StyledSubmitButton
                                onClick={handleWithdrawCoin}
                                disabled={withdrawingCashStatus}
                                isLoading={withdrawingCashStatus}
                                fullWidth
                                variant="contained"
                            >
                                Withdraw Coin
                            </StyledSubmitButton>
                        </>
                    )}
                    {Object.keys(coin).length === 0 && (
                        <>
                            <InfoIcon
                                style={{
                                    fontSize: 50,
                                    alignSelf: 'center',
                                    color: 'gray',
                                }}
                            />
                            <Typography
                                style={{ textAlign: 'center' }}
                                variant="body1"
                            >
                                Click any Coin to edit
                            </Typography>
                        </>
                    )}
                    {!withdrawingCashStatus && (
                        <RenderChange
                            title="Money Withdrawn!"
                            userChange={withdrawals}
                        />
                    )}
                </StyledInputContainer>
            </Grid>
        </Container>
    )
}

export default Manageproduct
