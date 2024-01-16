/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { Grid, Container, Typography, Paper, TextField } from '@mui/material'
import { useSelector, shallowEqual, useDispatch } from 'react-redux'
import { type IReduxStore } from '../../../_redux/config'
import { Loader, RenderProduct } from '../../../components'
import { useEffect, useState } from 'react'
import { SAGA_ACTIONS } from '../../../_redux/actions'
import { type IProduct } from '@vending/utils'
import { StyledInputContainer, StyledSubmitButton } from '../styled.components'
import InfoIcon from '@mui/icons-material/Info'
const Manageproduct = (): JSX.Element => {
    const [product, setProduct] = useState<IProduct>({} as any as IProduct)
    const [disabled, setDisable] = useState(true)
    const { loadingProduct, products, updatingProductStatus } = useSelector(
        (store: IReduxStore) => ({
            loadingProduct: store.admin.loadingProduct,
            products: store.admin.products,
            updatingProductStatus: store.admin.updatingProductStatus,
        }),
        shallowEqual
    )
    const dispatch = useDispatch()

    useEffect(() => {
        const findProduct = products.find((p) => p.slot === product.slot)
        if (findProduct) {
            if (
                product.price === findProduct.price &&
                product.quantity === findProduct.quantity
            ) {
                setDisable(true)
            } else {
                setDisable(false)
            }
        }
    }, [product.price, product.quantity])

    const handleFetchProduct = (): void => {
        dispatch({ type: SAGA_ACTIONS.ADMIN_FETCH_PRODUCTS })
    }

    const handleUpdate = (): void => {
        const { slot, price, quantity } = product

        dispatch({
            type: SAGA_ACTIONS.ADMIN_UPDATE_PRODUCT,
            payload: { slot, price, quantity },
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
                    <RenderProduct
                        onSelect={(prod) => {
                            setProduct(prod)
                        }}
                        products={products}
                    />
                </Grid>
                <StyledInputContainer item xs={4}>
                    {Object.keys(product).length > 0 && (
                        <>
                            <Typography variant="h6" fontWeight={'bold'} my={2}>
                                Update Product
                            </Typography>
                            <Paper style={{ padding: 10 }}>
                                <Typography>
                                    <b>Product Slot</b> = {product.slot}
                                </Typography>
                                <Typography>
                                    <b>Product</b> = {product.name}
                                </Typography>
                            </Paper>

                            <Paper
                                style={{
                                    padding: 10,
                                }}
                            >
                                <TextField
                                    value={product.price}
                                    type="number"
                                    sx={{ width: '100%' }}
                                    onChange={(e) => {
                                        setProduct((prev) => ({
                                            ...prev,
                                            price: parseInt(e.target.value),
                                        }))
                                    }}
                                    label="Update Product price"
                                />
                            </Paper>

                            <Paper
                                style={{
                                    padding: 10,
                                }}
                            >
                                <TextField
                                    label="Update Product Quantity"
                                    sx={{ width: '100%' }}
                                    type="number"
                                    placeholder=""
                                    value={product.quantity}
                                    onChange={(e) => {
                                        setProduct((prev) => ({
                                            ...prev,
                                            quantity: parseInt(e.target.value),
                                        }))
                                    }}
                                />
                            </Paper>

                            <StyledSubmitButton
                                onClick={handleUpdate}
                                disabled={disabled || updatingProductStatus}
                                isLoading={updatingProductStatus}
                                fullWidth
                                variant="contained"
                            >
                                Update Product
                            </StyledSubmitButton>
                        </>
                    )}
                    {Object.keys(product).length === 0 && (
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
                                Click any product to edit
                            </Typography>
                        </>
                    )}
                </StyledInputContainer>
            </Grid>
        </Container>
    )
}

export default Manageproduct
