import React from 'react';

import { Grid, List, ListItem, ListItemAvatar, ListItemText, ListItemSecondaryAction, Avatar, IconButton } from '@mui/material';

import NavigateNextIcon from '@mui/icons-material/NavigateNext';

import AppConst from '../shared/AppConst';

import '../shared/Common.scss';

import { requireAuth, withRouter, withAppData } from '../../context/props'; 


class SettingManager extends React.Component {
    constructor(props) {
        super(props);
        this.handleClickMode = this.handleClickMode.bind(this);
    }
    handleClickMode(mode) {
        this.props.router.navigate(`/${AppConst.SETTING.getLabel()}/${mode}`);
    }
    render() {
        const gridContainerStyle = {
            width: "100%",
            height: "100%",
            justifyContent: "center",
            ">.MuiGrid-item" : {
                width: { xs:"96%" , sm: "96%", md: "80%" },
                paddingTop: { xs:2 , sm: 2, md: 5 },
                paddingLeft: 0,
            }
        }
        return(
            <Grid container sx={gridContainerStyle} aria-label="setting container grid">
                <Grid item >
                    <List >
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar sx={{ width: 53, height: 53, backgroundColor: "#FAA828", marginRight: "15px" }}>
                                    {AppConst.PRIVACY.getIcon({fontSize:"large"})}
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText 
                                primary={AppConst.PRIVACY.getLabel()}
                                primaryTypographyProps={{fontSize : "x-large"}}
                                secondary="Take a look if you dont like to be seen by other users."
                                secondaryTypographyProps={{fontSize : "medium"}}/>
                            <ListItemSecondaryAction>
                                <IconButton 
                                    edge="end" 
                                    aria-label="go to Privacy setting" 
                                    onClick={()=>{this.handleClickMode(AppConst.PRIVACY.getLabel())}} >
                                    <NavigateNextIcon sx={{ fontSize: 45 }} />
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar sx={{ width: 53, height: 53, backgroundColor: "#FAA828", marginRight: "15px" }}>
                                    {AppConst.PROFILE.getIcon({fontSize:"large"})}
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText 
                                primary={AppConst.PROFILE.getLabel()}
                                primaryTypographyProps={{fontSize : "x-large"}}
                                secondary="Why don't you try other color for a change?"
                                secondaryTypographyProps={{fontSize : "medium"}}/>
                            <ListItemSecondaryAction>
                                <IconButton 
                                    edge="end" 
                                    aria-label="go to Profile setting" 
                                    onClick={()=>{this.handleClickMode(AppConst.PROFILE.getLabel())}} >
                                    <NavigateNextIcon sx={{ fontSize: 45 }} />
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar sx={{ width: 53, height: 53, backgroundColor: "#FAA828", marginRight: "15px" }}>
                                    {AppConst.PASSWORD.getIcon({fontSize:"large"})}
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText 
                                primary={AppConst.PASSWORD.getLabel()}
                                primaryTypographyProps={{fontSize : "x-large"}}
                                secondary="Keep your password secured."
                                secondaryTypographyProps={{fontSize : "medium"}}/>
                            <ListItemSecondaryAction>
                                <IconButton 
                                    edge="end" 
                                    aria-label="go to Password setting" 
                                    onClick={()=>{this.handleClickMode(AppConst.PASSWORD.getLabel())}} >
                                    <NavigateNextIcon sx={{ fontSize: 45 }}/>
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar sx={{ width: 53, height: 53, backgroundColor: "#FAA828", marginRight: "15px" }}>
                                    {AppConst.INFO.getIcon({fontSize:"large"})}
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText 
                                primary={AppConst.INFO.getLabel()}
                                primaryTypographyProps={{fontSize : "x-large"}}
                                secondary="Catch up the new information about ococa."
                                secondaryTypographyProps={{fontSize : "medium"}}/>
                            <ListItemSecondaryAction>
                                <IconButton 
                                    edge="end" 
                                    aria-label="go to About Page" 
                                    onClick={()=>{this.handleClickMode(AppConst.INFO.getLabel())}} >
                                    <NavigateNextIcon sx={{ fontSize: 45 }}/>
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                    </List> 
                </Grid>
            </Grid>
        );
    }
}
const ComponentAfterAuthChecked = requireAuth(SettingManager);
const ComponentWithAppData = withAppData(ComponentAfterAuthChecked);
export default withRouter(ComponentWithAppData);