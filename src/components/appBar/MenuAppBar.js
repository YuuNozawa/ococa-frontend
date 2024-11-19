import React from 'react';

import { AppBar, Toolbar, Button, Box, Card, CardMedia, Drawer, 
    IconButton, List, ListItem, ListItemButton, ListItemText } from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu';
import AddIcon from '@mui/icons-material/Add';
import ococa from '../../static/images/ococa.png';
import AppConst from '../shared/AppConst';

import MoodRecorder from '../mood/MoodRecorder';
import '../shared/Common.scss';
import { signoutRedirect } from '../../service/AuthService';

import { withRouter, withAppData, SignOut } from '../../context/props';

class MenuAppBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            menuOpen : false,
            openMoodDialog: false,
        };
        this.handleDrawerToggle = this.handleDrawerToggle.bind(this);
        this.handleClickAdd = this.handleClickAdd.bind(this);
    } 
    handleClickItem(mode) {
        this.setState({menuOpen: false});
        this.props.router.navigate(`/${mode}`);
    }
    handleDrawerToggle() {
        this.setState((prevState) => { 
            return {menuOpen: !prevState.menuOpen};
        });
    }
    handleClickAdd() {
        this.setState({openMoodDialog : true});
    }
    render(){
        const style = {
            appPhoto: {
                minWidth: 200,
                minHeight: 80,
                marginRight: 18,
            },
        }
        const { navigate, location } = this.props.router;
        const menues = AppConst.getMode().filter(menu => menu.getShowNavigation());
        const MenuItems = [];
        const MenuItemsXs = [];
        menues.map( menu => {
            MenuItems.push(
                <Button
                    key={menu.getValue()}
                    variant="text"
                    selected={location.pathname === `/${menu.getLabel()}`}
                    onClick={this.handleClickItem.bind(this, menu.getLabel())}
                    sx={{ 
                        fontSize: "1.7rem",
                        "&:hover": {
                            backgroundColor: "transparent",
                            textDecoration: "underline"
                        }
                    }}>
                    {menu.getLabel()}
                </Button>
            );
            MenuItemsXs.push(
                <ListItem key={menu.getValue()} >
                    <ListItemButton 
                        style={{flexDirection: "row"}}
                        selected={this.props.router.location.pathname === `/${menu.getLabel()}`}
                        onClick={this.handleClickItem.bind(this, menu.getLabel())}>
                        <ListItemText primary={menu.getLabel()} />
                    </ListItemButton>
                </ListItem>
            );
            return menu;
        });

        MenuItemsXs.push(
            <ListItem key="logout" >
                <ListItemButton 
                    style={{flexDirection: "row"}}
                    onClick={signoutRedirect}>
                    <ListItemText primary="Logout" />
                </ListItemButton>
            </ListItem>
        );
        return(
            <AppBar aria-label="main menu" position="static" color="transparent" elevation={0}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        edge="start"
                        onClick={this.handleDrawerToggle}
                        sx={{ mr: 2, display: { md: 'none' } }}>
                        <MenuIcon />
                    </IconButton>
                    <Drawer
                        aria-label="menu-sm"
                        variant="temporary"
                        open={this.state.menuOpen}
                        onClose={this.handleDrawerToggle}
                        ModalProps={{keepMounted: true}}
                        sx={{
                            display: { md: 'none' },
                            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
                        }} >
                        <List>{MenuItemsXs}</List>
                    </Drawer>
                    <Card elevation={0} sx={{flexGrow:1}}>
                        <CardMedia 
                            sx={{maxWidth: "200px"}}
                            image={ococa} 
                            style={style.appPhoto}
                            onClick={() => navigate("/" + AppConst.HOME.getLabel())} />
                    </Card>
                    <Box 
                        aria-label="menu-md"
                        sx={{ flexGrow: 1, justifyContent: "space-around", display: { xs: 'none', sm: 'none', md: 'flex' } }} >
                        {MenuItems}
                        <SignOut style={{ color: 'black', fontSize: 21, marginLeft: 18 }} />
                    </Box>
                    <IconButton
                        aria-label="add mood button"
                        aria-haspopup="true"
                        color="inherit"
                        edge="start"
                        sx={{ mr: 2, display: { md: 'none' } }}
                        onClick={this.handleClickAdd} >
                        <AddIcon />
                    </IconButton>
                </Toolbar>
                <MoodRecorder open={this.state.openMoodDialog} closeDialog={() => {this.setState({openMoodDialog : false}); }} />
            </AppBar>
        );
    }
}
const ComponentWithAppData = withAppData(MenuAppBar);
export default withRouter(ComponentWithAppData);