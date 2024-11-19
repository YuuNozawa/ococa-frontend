import React from 'react';
import axiosInstance from '../../axios/axiosInstance';

// Components
import { Grid, List, ListItem, ListItemText, ListItemAvatar, Avatar, Button, TextField, IconButton } from '@mui/material';

import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';

import ColorPicker from '../shared/ColorPicker';
import CharPicker from '../shared/CharPicker';
import AppConst from '../shared/AppConst';

// External
import { requireAuth, withRouter, withAppData } from '../../context/props'; 

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            icon: "",
            color: "",
            bio: "",
            email: "",
            isUpdating: false
        };
        this.handleClickDone = this.handleClickDone.bind(this);
        this.setColor = this.setColor.bind(this);
        this.setChar = this.setChar.bind(this);
    } 
    newProfile() {
        this.setState({isUpdating: true});
        axiosInstance.put('/api/user', this.state)
        .then((res) => {
            if(res.status === 500) console.error("リクエストに失敗しました。ステータス：" + res.status);
            setTimeout(()=>{ 
                this.setState({isUpdating: false}); 
                this.props.appdata.message.handleMsg(AppConst.MSG104.getId());
            }, 500)
        })
        .catch((e) => {
            console.error(e);
            this.props.appdata.message.handleMsg(AppConst.MSG405.getId());
            this.setState({isUpdating: false});
        });
    }
    handleClickDone() {
        this.newProfile();
    }
    setColor(color) {
        this.setState({color: color});
    }
    setChar(char) {
        this.setState({icon: char});
    }
    componentDidMount() {
        // missed catch statement on purpose to jump to error page when error.
        axiosInstance.get(`/api/user/profile`).then(res => {
            this.setState({
                userName: res.data[0].userName,
                icon: res.data[0].icon,
                bio: res.data[0].bio,
                color: res.data[0].color
            });
        });
    }
    render(){
        const gridContainerStyle = {
            flexDirection: "row",
            justifyContent: "center",
            width: "100%",
            height: "100%",
            ">.MuiGrid-item" : {
                width: "100%",
                paddingTop: { xs: 1, sm: 1, md: 2 },
                paddingBottom: { xs: 1, sm: 1, md: 2 },
                paddingLeft: 0,
            }
        }
        const gridItemTopStyle = {
            maxWidth: "100%",
            height: { xs:"60px", sm: "60px", md: "100px" },
            flex: "0 0 auto"
        }
        const iconButtonStyle = {
            fontSize: "45px",
        }
        const gridItemMiddleStyle = {
            flexWrap: "nowrap",
            overflowY: "scroll",
            flexDirection: "column",
            // Main(100%) - Top - Bottom - Bottom's Margin
            height: { xs:"calc(100% - 60px - 60px - 20px )", sm: "calc(100% - 60px - 60px - 20px )", md: "calc(100% - 100px - 60px - 40px)" },
            ">.MuiGrid-item" : {
                marginBottom: { xs:3 , sm: 3, md: 5 },
            }
        }
        const gridInputAreaStyle = {
            flexDirection: { xs:"column", sm: "column", md: "row" },
            paddingRight: "8px",
            marginBottom: "8px",
            justifyContent:"center",
        }
        const listAvatarStyle = {
            height: "100%", 
            paddingRight: "15px"
        }
        const avatarStyle = {
            width: 50, 
            height: 50, 
            backgroundColor: this.state.color
        }
        const textFieldStyle = {
            width: "80%",
            maxWidth: "25rem"
        }
        const gridItemButtonStyle = {
            maxWidth: "100%",
            justifyContent: "center",
            height: "60px",
            flex: "0 0 auto",
            marginBottom: { xs:"20px" , sm: "20px", md: "40px" },
        }
        const buttonStyle = {
            // width:{ xs:"calc(80% - 45px)", sm: "calc(80% - 45px)", md: "calc(60% - 45px)" }
            width: "90%"
        }
        return (
            <Grid container sx={gridContainerStyle} aria-label="profile setting container">
                <Grid item sx={gridItemTopStyle} aria-label="setting common button area" >
                    <IconButton 
                        edge="end" 
                        aria-label="go back button" 
                        onClick={() => this.props.router.navigate("/" + AppConst.SETTING.getLabel())} >
                        <NavigateBeforeIcon sx={iconButtonStyle} />
                    </IconButton>
                </Grid>
                <Grid item container sx={gridItemMiddleStyle} aria-label="profile setting items area" spacing={{ xs: 1, sm: 1, md: 2 }}>
                    <Grid item container justifyContent="center" >
                        <List>
                            <ListItem alignItems="center" divider>
                                <ListItemAvatar sx={listAvatarStyle}>
                                    <Avatar sx={avatarStyle}>{this.state.icon}</Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    style={{paddingRight: "50px"}}
                                    primary={this.state.userName}
                                    secondary={
                                        `@${this.props.loginuser} ${this.state.bio ? " — " + this.state.bio : " — Hello."}`
                                    }
                                />
                            </ListItem>
                        </List>
                    </Grid>
                    <Grid item container sx={gridInputAreaStyle} spacing={{xs:2, sm: 2, md: 0}}>
                        <Grid item container direction="column" spacing={1} xs="auto" justifyContent="center">
                            <Grid item textAlign="center">
                                <TextField 
                                    label="Username" 
                                    size="small"
                                    variant="outlined"
                                    sx={textFieldStyle}
                                    value={this.state.userName} onChange={(e) => { this.setState({name : e.target.value}); } } />
                            </Grid>
                            <Grid item textAlign="center" >
                                <TextField 
                                    label="Bio" 
                                    multiline
                                    rows={3}
                                    variant="outlined"
                                    sx={textFieldStyle}
                                    value={this.state.bio} onChange={(e) => { this.setState({bio : e.target.value}); } } />
                            </Grid>
                        </Grid>
                        <Grid item container xs="auto" justifyContent="center">
                            <ColorPicker setColor={this.setColor} color={this.state.color} />
                        </Grid>
                    </Grid>
                    <Grid item>
                        <CharPicker setChar={this.setChar} char={this.state.icon} />
                    </Grid>
                </Grid>
                <Grid item container sx={gridItemButtonStyle} aria-label="profile setting Button area" >
                    <Button onClick={this.handleClickDone} variant="contained" sx={buttonStyle}>
                        { this.state.isUpdating ? "Updating..." : "Update Profile" }
                    </Button>
                </Grid>
            </Grid>
        );
    }
}

const ComponentAfterAuthChecked = requireAuth(Profile);
const ComponentWithAppData = withAppData(ComponentAfterAuthChecked);
export default withRouter(ComponentWithAppData);