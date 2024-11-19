import React from 'react';
import axiosInstance from '../../axios/axiosInstance';

import { Container, Box, Card, CardContent, CardActions, Button, Typography, TextField, CardMedia } from '@mui/material';
import { Link } from "react-router-dom";

import ococa from '../../static/images/ococa.png';
import AppConst from '../shared/AppConst';

// External
import { withRouter, withAppData } from '../../context/props'; 

class Signup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            newAccount: {
                userId: "",
                userName: "",
                icon: "",
                bio: "",
                password: "",
            },
            errors: {
                userId: null,
                userName: null,
                icon: null,
                password: null,
            },
            timer: "",
            isValidId: null,
            isCreating: false
        };
        this.handleClickDone = this.handleClickDone.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
    } 
    handleClickDone() {
        this.setState({isCreating: true});
        axiosInstance.post('/api/signup', {"newAccount": this.state.newAccount}).then((res) => {
            setTimeout(()=>{ 
                this.setState({isCreating: false}); 
                //this.props.router.navigate("/" + AppConst.LOGIN.getLabel());
            }, 500);
        }).catch((error) => {
            if(error.response.status === 400){
                this.setState((prevState) => { 
                    const errors = prevState.errors;
                    errors.userId = error.response.data?.errors?.userId?.message;
                    errors.userName = error.response.data?.errors?.userName?.message;
                    errors.icon = error.response.data?.errors?.icon?.message;
                    errors.password = error.response.data?.errors?.password?.message;
                    return ({errors: errors});
                });
            } else {
                console.error(error);
            }
            this.setState({isCreating: false});
        });
    }
    handleTextChange( e ) {
        if(this.state.timer) clearTimeout(this.state.timer);
        let timer = setTimeout(() => {
            axiosInstance.get("/api/user/" + e.target.value + "/exist")
            .then(res => {
                if(res.data.isExist){
                    this.setState({isValidId: false});
                } else {
                    this.setState({isValidId: true});
                }
            });

            this.setState({timer: null});
        }, 1000);

        this.setState((prevState) => { 
            const newAccount = prevState.newAccount;
            newAccount.userId = e.target.value;
            return ({newAccount: newAccount});
        });
        this.setState({timer: timer});
    }
    render(){
        const style = {
            loginHeader: {
                display: "flex",
                justifyContent: "center",
                marginBottom: 30,
                loginAppPhoto: {
                    minWidth: 300,
                    minHeight: 100,
                    position: "relative",
                }
            },
            root: {
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "stretch",
                height: "100%",
                borderColor: "#ECB865",
                borderStyle: "solid",
                borderWidth:  6,
                boxSizing: "border-box",
                borderRadius: 25,
                content: {
                    display: "flex",
                    flex: 1,
                    flexDirection: "column",
                    alignItems: "baseline",
                    justifyContent: "flex-start",
                    // justify-content: flex-start;
                    actions: {
                        padding: 0,
                        width: "100%",
                        button: {
                            width: "100%",
                            margin: 8
                        }
                    },
                    text: {
                        margin: 8,
                        width: "25em",
                    }
                }
            },
        };
        return (
            <Container maxWidth="sm" >
                <Box style={style.loginHeader}>
                    <Card elevation={0}>
                        <CardMedia image={ococa} style={style.loginHeader.loginAppPhoto} onClick={this.handleLogoClick}/>
                    </Card>
                </Box>
                <Box>
                    <Card style={style.root} elevation={1}>
                        <CardContent style={style.root.content}>
                            <Typography variant="inherit"　style={style.root.content.text}>
                                already have an account? <Link to={`/${AppConst.LOGIN.getLabel()}`}>login</Link>
                            </Typography>
                            <TextField 
                                id="userId" 
                                label="id" 
                                style={style.root.content.text}
                                size="small"
                                variant="outlined"
                                required
                                value={this.state.newAccount.userId} onChange={this.handleTextChange} />
                            { this.state.isValidId === false &&
                            <Typography variant="inherit" color="error">
                                {AppConst.MSG402.getMessage()}
                            </Typography>
                            }
                            <TextField 
                                id="userName" 
                                label="userName" 
                                style={style.root.content.text}
                                size="small"
                                variant="outlined"
                                required
                                value={this.state.newAccount.userName} 
                                onChange={(e) => { 
                                    this.setState((prevState) => { 
                                        const newAccount = prevState.newAccount;
                                        newAccount.userName = e.target.value;
                                        return ({newAccount: newAccount});
                                    })} 
                                } 
                            />
                            { this.state.errors.userName &&
                            <Typography variant="inherit" color="error">
                                {this.state.errors.userName}
                            </Typography>
                            }
                            <TextField 
                                id="password" 
                                type="password"
                                label="password" 
                                style={style.root.content.text}
                                size="small"
                                variant="outlined"
                                required
                                value={this.state.newAccount.password} 
                                onChange={(e) => { 
                                    this.setState((prevState) => { 
                                        const newAccount = prevState.newAccount;
                                        newAccount.password = e.target.value;
                                        return ({newAccount: newAccount});
                                    })} 
                                } 
                            />
                            { this.state.errors.password &&
                            <Typography variant="inherit" color="error">
                                {this.state.errors.password}
                            </Typography>
                            }
                            <TextField 
                                id="icon" 
                                label="icon" 
                                style={style.root.content.text}
                                size="small"
                                variant="outlined"
                                required
                                value={this.state.newAccount.icon} 
                                onChange={(e) => { 
                                    this.setState((prevState) => { 
                                        const newAccount = prevState.newAccount;
                                        newAccount.icon = e.target.value;
                                        return ({newAccount: newAccount});
                                    })} 
                                } 
                            />
                            { this.state.errors.icon &&
                            <Typography variant="inherit" color="error">
                                {this.state.errors.icon}
                            </Typography>
                            }
                            <TextField 
                                id="bio" 
                                label="bio" 
                                style={style.root.content.text}
                                multiline
                                rows={3}
                                variant="outlined"
                                value={this.state.newAccount.bio} 
                                onChange={(e) => { 
                                    this.setState((prevState) => { 
                                        const newAccount = prevState.newAccount;
                                        newAccount.bio = e.target.value;
                                        return ({newAccount: newAccount});
                                    })} 
                                } 
                            />
                        </CardContent>
                        <CardContent style={style.root.content}>
                            <CardActions style={style.root.content.actions}>
                                <Button style={style.root.content.actions.button} onClick={this.handleClickDone} variant="contained" color="primary" disableElevation>
                                    { this.state.isCreating ? "Creating..." : "Create Account" }
                                </Button>
                            </CardActions>
                        </CardContent>
                    </Card>
                </Box>
            </Container>
        );
    }
}

const ComponentWithAppData = withAppData(Signup);
export default withRouter(ComponentWithAppData);