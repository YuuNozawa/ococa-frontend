import React from 'react';
import axiosInstance from '../../axios/axiosInstance';

import { Grid, Stack, Card, CardHeader, CardContent, Avatar, Typography } from '@mui/material';

import MoodDoughnut from '../insight/MoodDoughnut';
import Carousel from '../mood/Carousel';
import AppConst from '../shared/AppConst';
import Void from '../mood/icon/Void';
import { requireAuth, withRouter, withAppData } from '../../context/props'; 

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: null,
            imgHash: new Date().getTime(),
            openMoodDialog: false,
            mode: AppConst.TOTAL_TIME,
        };
        this.handleAvatarOnClick = this.handleAvatarOnClick.bind(this);
        this.handleClickAdd = this.handleClickAdd.bind(this);
        this.handleSwitchOnChange = this.handleSwitchOnChange.bind(this);
    }
    handleClickAdd() {
        this.setState({openMoodDialog : true});
    }
    handleAvatarOnClick(moodId) {
        this.setState({selected : moodId});
        if( this.props.router.params.userId !== this.props.loginuser ){
            axiosInstance.post(`/api/mood/${moodId}/view`, {
                "viewDate": new Date().toISOString()
               ,"timeZone": Intl.DateTimeFormat().resolvedOptions().timeZone
            })
            .then((res) => {
                // do nothing.
            })
            .catch((e) => {
                console.error("viewerのカウントアップに失敗しました。");
                console.error(e);
            });
        }
    }
    handleSwitchOnChange() {
        this.setState((prevState) => { 
            if(prevState.mode === AppConst.TOTAL_RECORDS) {
                return ({mode: AppConst.TOTAL_TIME});
            }
            return ({mode: AppConst.TOTAL_RECORDS});
        });
    }
    componentDidMount() {
        this.props.appdata.mood.setImagesByUid(this.props.router.params.userId);
    }
    render() {
        const {user, mood} = {...this.props.appdata};
        const currUser = user.users.filter(u => u.userId === this.props.router.params.userId)[0];
        if(!currUser) return <Typography variant="inherit" color="error">{AppConst.MSG406.getMessage()}</Typography>

        const gridContainerStyle = {
            flexDirection: "column",
            flexWrap: "nowrap",
            width: { xs: "100%", sm: "100%", md: "calc(100% - 60px)" },
            height: "100%",
            marginLeft: { xs: 0, sm: 0, md: "30px" },
            marginRight: { xs: 0, sm: 0, md: "30px" },
            overflowY: "scroll",
            ">.MuiGrid-item" : {
                paddingTop: { xs: 2, sm: 2, md: 4 },
                paddingLeft: 0,
            }
        }
        const userInfoGridStyle= {
            justifyContent: "center"
        }
        const userInfoCardStyle= {
            justifyContent: "center",
            width: "100%"
        }
        const userInfoCardAvatarStyle= {
            width: { xs: "70px", sm: "70px", md: "90px" },
            height: { xs: "70px", sm: "70px", md: "90px" },
            fontSize: { xs: "2rem", sm: "2rem", md: "3rem" },
            backgroundColor: currUser.color
        }
        const currentMoodGridStyle= {
            height: "100%",
            justifyContent: "center",
            ">*" : {
                maxHeight: "90%",
                maxWidth: "90%"
            }
        }
        const currentMoodCardStyle= {
            justifyContent: "center",
            width: "100%",
        }
        const gridDoughnutStyle = {
            justifyContent: 'center',
            direction: "column",
            alignItems: "center",
            height: { xs:"130px", sm: "130px", md: "200px" },
            width: "50%",
            ">*" : {
                maxHeight: "90%",
                maxWidth: "90%"
            }
        }
        const noMoodGridStyle= {
            height: "100%",
            justifyContent: "center",
        }
        const statsGridStyle= {
            height: "100%",
            justifyContent: "center",
        }
        const statsCardStyle= {
            justifyContent: "center",
            width: "100%"
        }

        const userMood = mood.moods.filter(m => m.userId === this.props.router.params.userId && m.endAt === null);
        const Items = [];
        userMood.map((mood, index) => {
            let item = (
                <Grid item key={`Mood-${index}`} sx={{margin: "20px"}}>
                    <Avatar 
                        src={`${mood.url}&${this.state.imgHash}`}
                        onClick={this.handleAvatarOnClick.bind(this, mood.moodId)}
                        sx={{ 
                            width: 80, 
                            height: 80, 
                            border: `5px solid rgb(${AppConst.getSingleColorRgb(mood.emotionId, mood.moodLevel)})`,
                            boxShadow: `0 0 0 4px rgba(${AppConst.getSingleColorRgb(mood.emotionId, mood.moodLevel)}, 0.45)`,
                            "&:hover": {
                                cursor: "pointer"
                            },
                            "&.MuiAvatar-root": {
                                backgroundColor: !mood.url ? AppConst.getSingleColor(mood.emotionId, mood.moodLevel) : "default"
                            },
                            "& .MuiAvatar-fallback": {
                                fill: !mood.url ? AppConst.getSingleColor(mood.emotionId, mood.moodLevel) : "default"
                            }
                        }} >
                    </Avatar>
                </Grid>
            )
            Items.push(item);
            return mood;
        });
        return (
            <Grid container sx={gridContainerStyle} aria-label="home container" spacing={3}>
                <Grid item container aria-label="user info container" sx={userInfoGridStyle}>
                    <Card sx={userInfoCardStyle} elevation={0}>
                        <CardHeader
                            avatar={<Avatar sx={userInfoCardAvatarStyle} >{currUser.icon}</Avatar>}
                            title={currUser.userName}
                            titleTypographyProps={{variant:"h3"}}
                            subheader={`@${currUser.userId}`}
                            subheaderTypographyProps={{variant:"body1"}} />
                        <CardContent sx={{padding:"0 0 0 16px"}}>
                            <Typography variant="h6" color="text.secondary">{currUser.bio}</Typography>
                        </CardContent>
                    </Card>
                </Grid>
                {userMood.length > 0 && <>
                <Carousel />
                <Grid item container aria-label="current mood container" sx={currentMoodGridStyle}>
                    <Card sx={currentMoodCardStyle} elevation={3}>
                        <CardHeader title="Current Mood" />
                        <CardContent>
                            <Grid container direction="row" >
                                <Grid item container sx={gridDoughnutStyle} >
                                    <MoodDoughnut moods={userMood} mode={AppConst.TOTAL_TIME} legend={false}/>
                                </Grid>
                                <Grid item container sx={gridDoughnutStyle} >
                                    <MoodDoughnut moods={userMood} mode={AppConst.TOTAL_RECORDS} legend={false}/>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>
                </>}
                {userMood.length === 0 && 
                <Grid item container aria-label="no mood container" sx={noMoodGridStyle}>
                    <Stack direction="column" spacing={3} sx={{width:"100%"}} alignItems="center">
                        <Void />
                        <Typography variant="inherit">{AppConst.MSG101.getMessage()}</Typography>
                    </Stack>
                </Grid>
                }
                <Grid item container aria-label="recent activity" sx={statsGridStyle}>
                    <Card sx={statsCardStyle} elevation={3}>
                        <CardHeader title="Stats" />
                        <CardContent>I'm not ready</CardContent>
                    </Card>
                </Grid>
            </Grid>
        );
    }
}
const ComponentAfterAuthChecked = requireAuth(Home);
const ComponentWithAppData = withAppData(ComponentAfterAuthChecked);
export default withRouter(ComponentWithAppData);