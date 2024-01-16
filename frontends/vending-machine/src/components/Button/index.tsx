import {
    Button as MUIBtn,
    type ButtonProps,
    CircularProgress,
} from '@mui/material'

export interface IButton extends ButtonProps {
    children?: React.ReactNode
    isLoading?: boolean
}

const Button: React.FC<IButton> = ({
    children,
    isLoading,
    ...props
}: IButton) => {
    return (
        <MUIBtn {...props}>
            {children}{' '}
            {(isLoading ?? false) && (
                <CircularProgress
                    size={20}
                    style={{ marginLeft: 10, color: 'white' }}
                />
            )}
        </MUIBtn>
    )
}

export default Button
