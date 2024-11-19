import React from 'react';

import { Grid, ButtonGroup, Button } from '@mui/material';

import TabPanel from './TabPanel';
import UserList from './UserList';

import AppConst from '../shared/AppConst';
import { requireAuth, withRouter, withAppData } from '../../context/props'; 

class RelationManager extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tabNo : 0
        };
    } 
    render(){
        const gridContainerStyle = {
            flexDirection: "column",
            alignItems: "center",
            marginTop: 0,
            marginLeft: 0,
            width: "100%",
            height: "100%",
            ">.MuiGrid-item" : {
                width: "96%",
                paddingTop: { xs:2 , sm: 2, md: 5 },
                paddingLeft: 0,
            }
        }
        const gridButtonGroupStyle = {
            maxWidth: { xs:"100%", sm: "100%", md: "87%" },
            height: { xs:"80px", sm: "80px", md: "100px" },
            flex: "0 0 auto",
            ">*" : {
                maxHeight: "100%"
            }
        }
        const buttonGroupStyle = {
            borderRadius: 20, 
            '& > *': { p: 1 }
        }
        const griduserListStyle = {
            width: "100%",
            height: { xs:"calc(100% - 80px)", sm: "calc(100% - 80px)", md: "calc(100% - 100px)" }
            // justifyContent: 'center',
            // direction: "column",
            // alignItems: "center",
            // height: { xs:"150px", sm: "150px", md: "200px" },
            // flex: "1 1 auto",
            // ">*" : {
            //     maxHeight: "90vh",
            //     maxWidth: "90%"
            // }
        }
        const menues = AppConst.getFriendTypes().filter(type => type.getShowNavigation());
        const MenuItems = [];
        menues.map( menu => {
            MenuItems.push(
                <Button
                    key={menu.getValue()}
                    fullWidth
                    onClick={() => this.setState({tabNo : menu.getValue()})}
                    selected={this.state.tabNo === menu.getValue()}
                    size="medium" >
                    {menu.getLabel()}
                </Button>
            );
            return menu;
        });

        return (
            <Grid container sx={gridContainerStyle} aria-label="friends container grid">
                <Grid item sx={gridButtonGroupStyle}>
                    <ButtonGroup 
                        fullWidth
                        aria-label="relation menu bar" 
                        variant="contained" 
                        sx={buttonGroupStyle} >
                        {MenuItems}
                    </ButtonGroup>
                </Grid>
                <Grid item sx={griduserListStyle} >
                    <TabPanel value={this.state.tabNo} index={AppConst.MY_FRIENDS.getValue()} dir="x">
                        <UserList variant={AppConst.MY_FRIENDS.getLabel()}/>
                    </TabPanel>
                    <TabPanel value={this.state.tabNo} index={AppConst.REQUESTS.getValue()} dir="x">
                        <UserList variant={AppConst.REQUESTS.getLabel()}/>
                    </TabPanel>
                    <TabPanel value={this.state.tabNo} index={AppConst.ADD_FRIENDS.getValue()} dir="x">
                        <UserList variant={AppConst.ADD_FRIENDS.getLabel()} />
                    </TabPanel>
                </Grid>
            </Grid>
        );
    }
}

const ComponentAfterAuthChecked = requireAuth(RelationManager);
const ComponentWithAppData = withAppData(ComponentAfterAuthChecked);
export default withRouter(ComponentWithAppData);