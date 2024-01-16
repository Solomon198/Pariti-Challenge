/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import {
    Grid,
    Container,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
} from '@mui/material'
import { Outlet, useLocation, Link } from 'react-router-dom'
import Inventory2TwoToneIcon from '@mui/icons-material/Inventory2TwoTone'
import MonetizationOnTwoToneIcon from '@mui/icons-material/MonetizationOnTwoTone'

const items = [
    {
        text: 'Products',
        icon: <Inventory2TwoToneIcon />,
        path: '/admin/manage-product',
    },
    {
        text: 'Coins',
        icon: <MonetizationOnTwoToneIcon />,
        path: '/admin/manage-coins',
    },
]

const AdminDashboard = (): JSX.Element => {
    const location = useLocation()

    return (
        <Container disableGutters maxWidth={false}>
            <Grid container>
                <Grid item xs={2} style={{ padding: 10 }}>
                    <List>
                        {items.map(({ text, icon, path }) => (
                            <Link
                                style={{
                                    color: '#000',
                                    fontWeight: 'bold',
                                }}
                                key={text}
                                to={path}
                            >
                                <ListItem
                                    style={{
                                        background:
                                            location.pathname === path
                                                ? 'whitesmoke'
                                                : undefined,
                                    }}
                                    disablePadding
                                >
                                    <ListItemButton>
                                        <ListItemIcon>{icon}</ListItemIcon>
                                        <ListItemText primary={text} />
                                    </ListItemButton>
                                </ListItem>
                            </Link>
                        ))}
                    </List>
                </Grid>
                <Grid item xs={10} style={{ padding: 10 }}>
                    <Outlet />
                </Grid>
            </Grid>
        </Container>
    )
}

export default AdminDashboard
