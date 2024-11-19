import React from 'react';

import { Grid, Stack, Box, Typography } from '@mui/material';

import parseISO from 'date-fns/parseISO'
import isAfter from 'date-fns/isAfter'
import isSameDay from 'date-fns/isSameDay'
import subWeeks from 'date-fns/subWeeks'

import FormatTime from '../date/FormatTime';
import CurrentMood from '../mood/CurrentMood';
import PastMood from '../mood/PastMood';
import '../shared/Common.scss';
import Void from '../mood/icon/Void';
import Loading from '../shared/Loading';

import AppConst from '../shared/AppConst';
import { requireAuth, withRouter, withAppData } from '../../context/props'; 

class TimeLine extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            range: null,
            closeList: [],
            isBottom: false,
        };
        this.readMore = this.readMore.bind(this);
    }
    readMore() {
        if( this.props.isScrollBottom() ){
            console.log("最下点開始");
            this.setState({isBottom: true});
            const {mood} = {...this.props.appdata};
            this.setState((prevState) => {
                const newRange = subWeeks(prevState.range, 1);
                mood.getMoodWithImages(mood.moods, newRange)
                .then(moods => {
                    mood.setMood(moods);
                }).catch((error) => {
                    // console.error("イメージの取得失敗");
                    // console.error(error);
                }).finally(() => {
                    let loading = setInterval(() => {
                        clearInterval(loading);
                        console.log("最下点クリア");
                        this.setState({isBottom: false});
                    }, 1000);
                });
                return ({range: newRange});
            });
        }
    }
    componentWillUnmount() {
        document.removeEventListener('scroll', this.readMore, true);
    }
    componentDidMount() {
        const {mood} = {...this.props.appdata};
        document.addEventListener('scroll', this.readMore, true);
        let initRange = mood.getLastPostDate(mood.moods.filter(m=> m.userId === this.props.loginuser));
        initRange = subWeeks(initRange, 3);
        this.setState({range : initRange});
    }
    render() {
        const gridContainerStyle = {
            flexDirection: "column",
            flexWrap: "nowrap",
            width: { xs: "100%", sm: "100%", md: "calc(100% - 60px)" },
            marginLeft: { xs: 0, sm: 0, md: "30px" },
            marginRight: { xs: 0, sm: 0, md: "30px" },
            height: "100%",
        }
        const gridItemBottomStyle = {
            flexDirection: "column",
            width: "100%",
            // maxWidth: "800px"
        }
        const dateBarBoxStyle = {
            backgroundColor: "#ECECEA",
            boxShadow: "0px 3px 5px -1px rgb(86 86 78 / 20%), 0px 6px 10px 0px rgb(86 86 78 / 14%)",
            borderTopRightRadius: 20,
            height: 52,
            borderBottomRightRadius: 20,
            width: "100%",
            marginTop: { xs: "5px", sm: "5px", md: "15px" },
            marginBottom: { xs: "5px", sm: "5px", md: "15px" },
            display: "flex",
            justifyContent: "center",
            alignItems: "end",
        }
        const {mood} = {...this.props.appdata};
        const myMoods = mood.moods
            .filter(m => m.userId === this.props.loginuser && isAfter(parseISO(m.startAt), this.state.range ) );
        const MoodList = [];
        let dateRight = new Date(2999, 11, 30, 0, 0); //month starts with 0, dont you remember?
        myMoods.map((myMood, index) => {
            if( !isSameDay( parseISO(myMood.startAt), dateRight ) ){
                dateRight = new Date( parseISO(myMood.startAt) );
                MoodList.push( 
                    <Grid item key={`dateBar-${index}`} aria-label="dateBar">
                        <Box sx={dateBarBoxStyle} >
                            <FormatTime 
                                date={myMood.startAt} 
                                format={AppConst.FORMAT_DATE}
                                align="center" 
                                variant="h5"
                                gutterBottom /> 
                        </Box>
                    </Grid>
                );
            }
            if(myMood.endAt){
                MoodList.push(
                    <Grid item key={`accordion${index}`} aria-label="mood-container">
                        <PastMood mood={myMood} photoDialogOpen={this.photoDialogOpen}/>
                    </Grid>
                );
            } else {
                MoodList.push(
                    <Grid item key={`accordion${index}`} aria-label="mood-container">
                        <CurrentMood mood={myMood} />
                    </Grid>
                );
            }
            return myMood;
        });
        return(
            <Grid container sx={gridContainerStyle} aria-label="mood container">
                <Grid item container sx={gridItemBottomStyle} spacing={1} aria-label="Home Feed">
                    { MoodList.length === 0 &&
                    <Stack direction="column" spacing={3} sx={{width:"100%"}} alignItems="center">
                        <Void />
                        <Typography variant="inherit">{AppConst.MSG101.getMessage()}</Typography>
                    </Stack>
                    }
                    { MoodList.length > 0 && MoodList}
                </Grid>
                {this.state.isBottom &&
                <Grid item aria-label="Loading" sx={{height: "50px", position: "relative"}}>
                    <Loading />
                </Grid>
                }
            </Grid>
        );
    }
}
const ComponentAfterAuthChecked = requireAuth(TimeLine);
const ComponentWithAppData = withAppData(ComponentAfterAuthChecked);
export default withRouter(ComponentWithAppData);