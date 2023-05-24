import { ShoppingCart } from "@mui/icons-material";
import { Badge, Box } from "@mui/material";
import { AppBar, IconButton, List, ListItem, Switch, Toolbar, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";


interface Props {
    changeTheme: () => void
}
const midLinks = [
    { title: 'catalog', path: '/catalog' },
    { title: 'about', path: '/about' },
    { title: 'contact', path: '/contact' },
];
const rightLinks = [
    { title: 'login', path: '/login' },
    { title: 'register', path: '/register' }
]



export default function Header(props: Props) {
    return (
        <AppBar position="static" sx={{ mb: 4 }}>

            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant="h6" sx={{ color: 'white', textDecoration: 'none' }} component={NavLink} to='/'>ZeroWaste</Typography>
                    <Switch color="default" onClick={props.changeTheme} defaultChecked />
                </Box>



                <List sx={{ display: 'flex' }}>
                    {midLinks.map((link) => (
                        <ListItem
                            button component={NavLink} to={link.path} key={link.path} sx={{ color: 'inherit', typography: 'h7', ":hover": { color: 'black' }, "&.active": { backgroundColor: 'rgb(255, 135, 135)' } }}
                        >
                            {link.title.toUpperCase()}
                        </ListItem>
                    ))}
                </List>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <IconButton sx={{ color: 'inherit' }} size='large'>
                        <Badge badgeContent={4} color='secondary'>
                            <ShoppingCart />
                        </Badge>
                    </IconButton>
                    <List sx={{ display: 'flex' }}>
                        {rightLinks.map((link) => (
                            <ListItem
                                button component={NavLink} to={link.path} key={link.path} sx={{ color: 'inherit', typography: 'h7' }}
                            >
                                {link.title.toUpperCase()}
                            </ListItem>
                        ))}
                    </List>

                </Box>



            </Toolbar>


        </AppBar>

    );
}