import React from 'react';
import axiosInstance from '../../axios/axiosInstance';

import { Grid, Button, FormControlLabel, Switch, Typography, IconButton } from '@mui/material';

import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';

import AppConst from '../shared/AppConst';
import { requireAuth, withRouter, withAppData } from '../../context/props'; 

class Privacy extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            privateMode: true,
            allowSearch: true,
            isUpdating: false,
        };
        this.handleClickDone = this.handleClickDone.bind(this);
        this.handleSwitchAChange = this.handleSwitchAChange.bind(this);
        this.handleSwitchBChange = this.handleSwitchBChange.bind(this);
    } 
    newSetting() {
        this.setState({isUpdating: true});
        axiosInstance.put('/api/setting', this.state)
        .then((res) => {
            if(res.status === 500) console.error("リクエストに失敗しました。ステータス：" + res.status);
            setTimeout(()=>{ 
                this.setState({isUpdating: false}); 
                this.props.appdata.message.handleMsg(AppConst.MSG105.getId());
            }, 500)
        })
        .catch((e) => {
            console.error(e);
            this.props.appdata.message.handleMsg(AppConst.MSG405.getId());
            this.setState({isUpdating: false});
        });
    }
    handleClickDone() {
        this.newSetting();
    }
    handleSwitchAChange() {
        this.setState((prevState) => {
            return ({privateMode: !prevState.privateMode});
        });
    }
    handleSwitchBChange() {
        this.setState((prevState) => {
            return ({allowSearch: !prevState.allowSearch});
        });
    }
    componentDidMount(){
        // missed catch statement on purpose to jump to error page when error.
        axiosInstance.get('/api/setting')
        .then(res => {
            this.setState({privateMode: res.data.privateMode});
            this.setState({allowSearch: res.data.allowSearch});
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
            }
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
        return(
            <Grid container sx={gridContainerStyle} aria-label="privacy setting container"> 
                <Grid item sx={gridItemTopStyle} aria-label="setting common button area">
                    <IconButton 
                        edge="end" 
                        aria-label="go back button" 
                        onClick={() => this.props.router.navigate("/" + AppConst.SETTING.getLabel())}>
                        <NavigateBeforeIcon sx={iconButtonStyle}/>
                    </IconButton>
                </Grid>
                <Grid item container sx={gridItemMiddleStyle} aria-label="privacy setting items area" >
                    <Grid item textAlign="center">
                        <FormControlLabel
                            label={<Typography display="inline" variant="h6">enable private mode</Typography>}
                            control={
                                <Switch
                                    id="switchA"
                                    name="privateMode"
                                    color="primary"
                                    checked={this.state.privateMode}
                                    onChange={this.handleSwitchAChange} />
                            }
                            sx={{width: "25em"}} />
                    </Grid>
                    <Grid item textAlign="center">
                        <FormControlLabel
                            label={<Typography display="inline" variant="h6">allow ID search</Typography>}
                            control={
                                <Switch
                                    name="allowSearch"
                                    color="primary"
                                    checked={this.state.allowSearch}
                                    onChange={this.handleSwitchBChange} />
                            }
                            sx={{width: "25em"}} />
                    </Grid>
                </Grid>
                <Grid item container sx={gridItemButtonStyle} aria-label="privacy setting Button area" >
                    <Button onClick={this.handleClickDone} variant="contained" sx={buttonStyle}>
                        { this.state.isUpdating ? "Updating..." : "Update Setting" }
                    </Button>
                </Grid>
            </Grid>
        );
    }
}
const ComponentAfterAuthChecked = requireAuth(Privacy);
const ComponentWithAppData = withAppData(ComponentAfterAuthChecked);
export default withRouter(ComponentWithAppData);