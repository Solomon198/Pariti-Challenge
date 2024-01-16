import { CircularProgress, Container, Typography } from '@mui/material'

const Loader = ({ text }: { text: string }): JSX.Element => {
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
            <CircularProgress />
            <Typography style={{ marginLeft: 10 }} variant="subtitle1">
                {text}
            </Typography>
        </Container>
    )
}

export default Loader
