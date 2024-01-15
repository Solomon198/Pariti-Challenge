import { AxiosError } from 'axios'
import { isArray } from 'lodash'

export const handleRequestErrors = (error: any): string[] => {
    if (error instanceof AxiosError) {
        if (isArray(error.response?.data?.errors)) {
            return error.response?.data?.errors.map((d: any) => d.message)
        }
        return [error.message]
    }
    return [error.message] ?? ['Unable to process request']
}
