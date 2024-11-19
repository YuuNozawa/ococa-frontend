import React from 'react';
import axiosInstance from '../../axios/axiosInstance';

import { Grid, Button, TextField, Typography, IconButton } from '@mui/material';

import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';

import { requireAuth, withRouter, withAppData } from '../../context/props'; 
import AppConst from '../shared/AppConst';

class Password extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            newPassword: {
                oldPassword: "",
                newPassword: "",
                newPassword2: "",
            },
            errors: {
                oldPassword: "",
                newPassword: "",
                newPassword2: "",
            },
            isUpdating: false,
            showCLWarning: false
        };
        this.handleClickDone = this.handleClickDone.bind(this);
    } 
    resetErrors() {
        this.setState((prevState) => { 
            const {errors} = prevState;
            errors.oldPassword = "";
            errors.newPassword = "";
            errors.newPassword2 = "";
            return ({errors: errors});
        })
    }
    handleClickDone() {
        this.resetErrors();
        this.setState({isUpdating: true});
        const params = {
            userId: this.props.loginuser,
            password: this.state.newPassword.oldPassword,
            newPassword: this.state.newPassword
        }
        if(this.state.newPassword.newPassword2 === "" || this.state.newPassword.newPassword2 === null){
            this.setState((prevState) => { 
                const {errors} = prevState;
                errors.newPassword2 = AppConst.MSG408.getMessage();
                return ({errors: errors});
            });
            return;
        } else if( this.state.newPassword.newPassword2 !== this.state.newPassword.newPassword ) {
            this.setState((prevState) => { 
                const {errors} = prevState;
                errors.newPassword2 = AppConst.MSG409.getMessage();
                return ({errors: errors});
            });
            return;
        }
        
        axiosInstance.put('/api/password', params)
        .then((res) => {
            setTimeout(()=>{ 
                this.setState({isUpdating: false}); 
                this.props.appdata.message.handleMsg(AppConst.MSG103.getId());
            }, 500)
        })
        .catch((e) => {
            switch( e.response.status ) {
                case 400:
                    this.setState((prevState) => { 
                        const {errors} = prevState;
                        errors.newPassword = e.response.data?.errors?.password?.message;
                        return ({errors: errors});
                    });
                    break;
                case 401:
                    this.setState((prevState) => { 
                        const {errors} = prevState;
                        errors.oldPassword = AppConst.MSG401.getMessage();
                        return ({errors: errors});
                    });
                    break;
                default:
                    console.error(e);
                    this.props.appdata.message.handleMsg(AppConst.MSG405.getId());
            }
            this.setState({isUpdating: false});
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
                paddingTop: { xs: 2, sm: 2, md: 4 },
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
            flexDirection: "column",
            // Main(100%) - Top - Bottom - Bottom's Margin
            height: { xs:"calc(100% - 60px - 60px - 20px )", sm: "calc(100% - 60px - 60px - 20px )", md: "calc(100% - 100px - 60px - 40px)" },
            ">.MuiGrid-item" : {
                marginBottom: { xs:3 , sm: 3, md: 5 },
                marginLeft: "45px",
                marginRight: "45px"
            }
        }
        const gridItemButtonStyle = {
            maxWidth: "100%",
            justifyContent: "center",
            height: "60px",
            flex: "0 0 auto",
            marginBottom: { xs:"20px" , sm: "20px", md: "40px" },
        }
        const textFieldStyle = {
            width: "80%",
            maxWidth: "25rem"
        }
        const buttonStyle = {
            // width:{ xs:"calc(80% - 45px)", sm: "calc(80% - 45px)", md: "calc(60% - 45px)" }
            width: "90%"
        }
        return (
            <Grid container sx={gridContainerStyle} aria-label="password setting container">
                <Grid item sx={gridItemTopStyle} aria-label="setting common button area" >
                    <IconButton 
                        edge="end" 
                        aria-label="go back button" 
                        onClick={() => this.props.router.navigate("/" + AppConst.SETTING.getLabel())} >
                        <NavigateBeforeIcon sx={iconButtonStyle}/>
                    </IconButton>
                </Grid>
                <Grid item container sx={gridItemMiddleStyle} aria-label="password setting items area">
                    <Grid item textAlign="center">
                        <TextField 
                            id="oldPassword" 
                            type="password"
                            label="Old Password" 
                            size="small"
                            variant="outlined"
                            value={this.state.newPassword.oldPassword} 
                            sx={textFieldStyle}
                            onChange={(e) => { 
                                this.setState((prevState) => { 
                                    const {newPassword} = prevState;
                                    newPassword.oldPassword = e.target.value;
                                    return ({newPassword: newPassword});
                                })
                            }} 
                            onKeyDown={(e) => { 
                                if(e.getModifierState("CapsLock")){
                                    this.setState({showCLWarning : true});
                                } else {
                                    this.setState({showCLWarning : false});
                                } 
                            }}/>
                        { this.state.errors.oldPassword &&
                        <Typography variant="inherit" color="error">
                            {this.state.errors.oldPassword}
                        </Typography>
                        }
                    </Grid>
                    <Grid item textAlign="center">
                        <TextField 
                            id="newPassword" 
                            type="password"
                            label="New Password" 
                            size="small"
                            variant="outlined"
                            value={this.state.newPassword.newPassword} 
                            sx={textFieldStyle}
                            onChange={(e) => { 
                                this.setState((prevState) => { 
                                    const {newPassword} = prevState;
                                    newPassword.newPassword = e.target.value;
                                    return ({newPassword: newPassword});
                                })
                            }} 
                            onKeyDown={(e) => { 
                                if(e.getModifierState("CapsLock")){
                                    this.setState({showCLWarning : true});
                                } else {
                                    this.setState({showCLWarning : false});
                                } 
                            }} />
                        { this.state.errors.newPassword &&
                        <Typography variant="inherit" color="error">
                            {this.state.errors.newPassword}
                        </Typography>
                        }
                    </Grid>
                    <Grid item textAlign="center">
                        <TextField 
                            id="newPassword2" 
                            type="password"
                            label="Confirm Password" 
                            size="small"
                            variant="outlined"
                            value={this.state.newPassword.newPassword2} 
                            sx={textFieldStyle}
                            onChange={(e) => { 
                                this.setState((prevState) => { 
                                    const {newPassword} = prevState;
                                    newPassword.newPassword2 = e.target.value;
                                    return ({newPassword: newPassword});
                                })
                            }} 
                            onKeyDown={(e) => { 
                                if(e.getModifierState("CapsLock")){
                                    this.setState({showCLWarning : true});
                                } else {
                                    this.setState({showCLWarning : false});
                                } 
                            }} />
                        { this.state.errors.newPassword2 &&
                        <Typography variant="inherit" color="error">
                            {this.state.errors.newPassword2}
                        </Typography>
                        }
                        { this.state.showCLWarning &&
                        <Typography variant="inherit" color="error">
                            {AppConst.MSG301.getMessage()}
                        </Typography>
                        }
                    </Grid>
                </Grid>
                <Grid item container sx={gridItemButtonStyle} aria-label="password setting Button area" >
                    <Button onClick={this.handleClickDone} variant="contained" sx={buttonStyle}>
                        { this.state.isUpdating ? "Updating..." : "Update Password" }
                    </Button>
                </Grid>
            </Grid>
        );
    }
}

const ComponentAfterAuthChecked = requireAuth(Password);
const ComponentWithAppData = withAppData(ComponentAfterAuthChecked);
export default withRouter(ComponentWithAppData);