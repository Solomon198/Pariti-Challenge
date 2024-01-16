import { Grid, Typography } from '@mui/material'
import { type IProduct } from '@vending/utils'
import { ProductContainer, Slot, SlotContainer } from './styled'

interface Props {
    products: IProduct[]
    onSelect?: (product: IProduct) => void
}

const RenderProduct = ({ products, onSelect }: Props): JSX.Element => {
    const handleSelect = (prod: IProduct): void => {
        if (onSelect !== undefined) {
            onSelect(prod)
        }
    }
    return (
        <Grid container spacing={2}>
            {products.map((product) => (
                <Grid item key={product.slot} md={4}>
                    <ProductContainer
                        onClick={() => {
                            handleSelect(product)
                        }}
                    >
                        <Typography variant="h6">
                            {product.name} <br />
                            <span style={{ fontSize: 12 }}>
                                {product.quantity} unit remaining
                            </span>
                        </Typography>
                        <Typography variant="h4">
                            {product.price}
                            {product.currencySymbol}
                        </Typography>
                    </ProductContainer>
                    <SlotContainer style={{}}>
                        <Slot>
                            <Typography fontWeight="bold" variant="subtitle1">
                                {product.slot}
                            </Typography>
                        </Slot>
                    </SlotContainer>
                </Grid>
            ))}
        </Grid>
    )
}

export default RenderProduct
