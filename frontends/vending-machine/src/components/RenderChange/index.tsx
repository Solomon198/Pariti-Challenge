import { Typography, Container } from '@mui/material'
import { type CurrencyValue } from '@vending/utils'
import { Coin } from './styled'

interface Props {
    userChange: CurrencyValue[]
    title: string
}
const RenderChange = ({ userChange, title }: Props): JSX.Element => (
    <>
        {userChange.length > 0 && (
            <Typography
                variant="h6"
                fontWeight={'bold'}
                style={{ marginTop: 70, marginBottom: 20 }}
            >
                {title}
            </Typography>
        )}
        <Container
            disableGutters
            maxWidth={false}
            style={{ display: 'flex', flexWrap: 'wrap' }}
        >
            {userChange.map((coin, index) => (
                <Coin key={index}>
                    <Typography>
                        {coin.value} {coin.symbol}
                    </Typography>
                </Coin>
            ))}
        </Container>
    </>
)

export default RenderChange
