import axios, { type AxiosResponse } from 'axios'

export const fetchProduct = async (): Promise<AxiosResponse<any, any>> => {
    return await axios.get('/admin/products')
}

export const fetchVault = async (): Promise<AxiosResponse<any, any>> => {
    return await axios.get('/admin/coins')
}

export const updateCoin = async ({
    coinValue,
    quantity,
}: {
    coinValue: number
    quantity: number
}): Promise<AxiosResponse<any, any>> => {
    return await axios.put(`admin/coins/${coinValue}`, { quantity })
}

export const updateProduct = async ({
    slot,
    quantity,
    price,
}: {
    slot: number
    quantity?: number
    price?: number
}): Promise<AxiosResponse<any, any>> => {
    return await axios.put(`/admin/products/${slot}`, { quantity, price })
}

export const withdrawCoin = async ({
    coinValue,
    quantity,
}: {
    coinValue: number
    quantity: number
}): Promise<AxiosResponse<any, any>> => {
    return await axios.put(`/admin/coins/withdraw/${coinValue}`, { quantity })
}
