import axios, { type AxiosResponse } from 'axios'
export const fetchUserProduct = async (): Promise<AxiosResponse<any, any>> => {
    return await axios.get('/users/products')
}

export const depositCoin = async (payload: {
    coinValue: number
}): Promise<AxiosResponse<any, any>> => {
    return await axios.post('/users/deposit-coin', payload)
}

export const selectSlot = async (payload: {
    slot: number
}): Promise<AxiosResponse<any, any>> => {
    return await axios.post('/users/select-slot', payload)
}

export const confirmPurchase = async (): Promise<AxiosResponse<any, any>> => {
    return await axios.post('/users/confirm-purchase')
}
