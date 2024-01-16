import { Grid, Typography } from '@mui/material'
import { type CurrencyValue } from '@vending/utils'
import { ProductContainer } from './styled'

interface Props {
    coins: CurrencyValue[]
    onSelect?: (product: CurrencyValue) => void
}

const RenderCoins = ({ coins, onSelect }: Props): JSX.Element => {
    const handleSelect = (coins: CurrencyValue): void => {
        if (onSelect !== undefined) {
            onSelect(coins)
        }
    }
    return (
        <Grid container spacing={2}>
            {coins.map((coin) => (
                <Grid item key={coin.value} md={4}>
                    <ProductContainer
                        onClick={() => {
                            handleSelect(coin)
                        }}
                    >
                        <Typography variant="h6">
                            {coin.name} <br />
                            <span style={{ fontSize: 12 }}>
                                {coin.balance} coins remaining
                            </span>
                        </Typography>
                        <Typography variant="h4">
                            {coin.value}
                            {coin.symbol}
                        </Typography>
                    </ProductContainer>
                </Grid>
            ))}
        </Grid>
    )
}

export default RenderCoins
