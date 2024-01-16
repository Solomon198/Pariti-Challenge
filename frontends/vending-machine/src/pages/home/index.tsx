import { Grid, Typography } from '@mui/material'
import {
    StyledBgImageContainer,
    StyledButton,
    StyledRightPaneContainer,
} from './styled'
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings'
import AccountBoxIcon from '@mui/icons-material/AccountBox'
import { Link } from 'react-router-dom'

const HomePage = (): JSX.Element => {
    return (
        <Grid container>
            <StyledBgImageContainer item xs={7}></StyledBgImageContainer>
            <StyledRightPaneContainer item xs={5}>
                <Typography style={{ marginBottom: 20 }} variant="h4">
                    Vending Demo UI
                </Typography>
                <Link to="/user">
                    <StyledButton
                        size="large"
                        variant="contained"
                        startIcon={<AccountBoxIcon />}
                    >
                        User Interface
                    </StyledButton>
                </Link>
                <Link to="/admin">
                    <StyledButton
                        startIcon={<AdminPanelSettingsIcon />}
                        size="large"
                        variant="contained"
                    >
                        Admin Interface
                    </StyledButton>
                </Link>
            </StyledRightPaneContainer>
        </Grid>
    )
}

export default HomePage
