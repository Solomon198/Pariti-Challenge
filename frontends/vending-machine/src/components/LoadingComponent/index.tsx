import { CircularProgress, Container, Typography } from '@mui/material'

export interface Props {
    text: string
}
const Loader = ({ text }: Props): JSX.Element => {
    return (
        <Container
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignContent: 'center',
                alignItems: 'center',
                height: '100vh',
            }}
        >
            <CircularProgress data-testid="loading-spinner" />
            <Typography style={{ marginLeft: 10 }} variant="subtitle1">
                {text}
            </Typography>
        </Container>
    )
}

export default Loader
