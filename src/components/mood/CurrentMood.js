import React from 'react';
import axiosInstance from '../../axios/axiosInstance';

import { Grid, Button, Typography, Chip, Divider, CardMedia, FormGroup, FormControlLabel } from '@mui/material';

import VisibilityIcon from '@mui/icons-material/Visibility';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import ArchiveIcon from '@mui/icons-material/Archive';

import parseISO from 'date-fns/parseISO'

import MinuteTimer from '../date/MinuteTimer'
import UserDialog from '../friends/UserDialog';
import NoImage from '../../static/images/NoImage.jpg';
import '../shared/Common.scss';
import AppConst from '../shared/AppConst';
import TagIcon from '../shared/TagIcon';
import Happy from './icon/Happy';
import Angry from './icon/Angry';
import Sad from './icon/Sad';
import Worried from './icon/Worried';
import { requireAuth, withRouter, withAppData } from '../../context/props'; 

class CurrentMood extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            closeList: [],
            userDialogOpen: false,
            variant: null,
            moodId: null,
        };
        this.handleClickArchive = this.handleClickArchive.bind(this);
        this.handleAccordionChange = this.handleAccordionChange.bind(this);
        this.handleClickView = this.handleClickView.bind(this);
        this.handleClickFavoriteLink = this.handleClickFavoriteLink.bind(this);
        this.handleClickFavorite = this.handleClickFavorite.bind(this);
    }
    handleClickArchive(e, mood) {
        e.stopPropagation();
        axiosInstance.put(`/api/mood/${mood.moodId}/archive`, {"endAt": new Date().toISOString()})
        .then((res) => {
            if(res.status !== 500){
                mood.endAt = res.data;
                this.props.appdata.mood.setUpdatedMood(mood);
            } else {
                console.error("データの登録に失敗しました。");
                console.error("ステータス：" + res.status);
            }
        }).catch((error) => {
            this.props.appdata.message.handleMsg(AppConst.MSG405.getId());
            if(error.response.status === 400){
                this.setState((prevState) => { 
                    const errors = prevState.errors;
                    errors.emotionId = error.response.data?.errors?.emotionId?.message;
                    return ({errors: errors});
                });
            } else {
                console.error(error);
            }
        });
    }
    handleAccordionChange(mood, isExpanded){
        if( !isExpanded ){
            this.setState((prevState) => { 
                const newCloseList = [...prevState.closeList];
                newCloseList.unshift(mood.moodId);
                return {closeList: newCloseList};
            });
        } else {
            this.setState((prevState) => { 
                const idx = prevState.closeList.findIndex(expand => mood.moodId === expand);
                const newCloseList = [...prevState.closeList];
                newCloseList.splice(idx, 1);
                return {closeList: newCloseList};
            });
        }
    }
    handleClickView(mood){
        this.setState({variant: AppConst.VIEWERS.getLabel()});
        this.setState({userDialogOpen : true}); 
        this.setState({moodId: mood.moodId});
    }
    handleClickFavoriteLink(mood){
        this.setState({variant: AppConst.FAVORITES.getLabel()});
        this.setState({userDialogOpen : true}); 
        this.setState({moodId: mood.moodId});
    }
    handleClickFavorite(e, mood){
        // prevent to trigger the event from the label
        e.stopPropagation();
        if( mood.likedByCurrentUser ) {
            this.props.appdata.mood.cancelFavorite(mood);
        } else {
            this.props.appdata.mood.favoriteMood(mood);
        }
    }
    render() {
        const moodContainerStyle = {
            width: "100%"
        }
        const topInteractiveAreaStyle = {
            height: "40px", 
            justifyContent: "end"
        }
        const archiveButtonStyle = {
            height:"25px"
        }
        const moodMainInfoAreaStyle = {
            height: {xs: "80px", sm: "80px", md: "100px"}
        }
        const moodMainInfoLeftStyle = {
            width: "140px", 
            flex: "0 0 auto", 
            justifyContent: "center", 
            alignItems: "center"
        }
        const moodMainInfoRightStyle = {
            width: "20px", 
            flex: "1 1 auto"
        }
        const moodTypeTextAreaStyle = {
            height: "10px", 
            flex: "2 1 auto", 
            justifyContent: "center", 
            alignItems: "center"
        }
        const moodPeriodTextAreaStyle = {
            height: "1px", 
            flex: "1 1 auto", 
            justifyContent: "center", 
            alignItems: "center"
        }
        const moodSubInfoAreaStyle = {
            height: "140px", 
            flexWrap: "nowrap"
        }
        const moodSubInfoLeftStyle = {
            width: "20px", 
            flex: "1 1 auto"
        }
        const photoStyle = {
            width : "calc(100% - 10px)", 
            height: "calc(100% - 10px)",
            margin: "5px 5px 5px 5px",
        }
        const cameraIconStyle = {
            position:"absolute",
            top: "47%",
            left: "45%",
            zIndex: 10,
            margin: "10px",
            display: "none",
            "&:hover": {
                display: "block !important"
            }
        }
        const moodSubInfoRightStyle = {
            width: "20px", 
            flex: "1 1 auto"
        }
        const moodTagAreaStyle = {
            height: "10px", 
            flex: "1 1 auto"
        }
        const moodDetailTextAreaStyle = {
            height: "10px", 
            flex: "2 1 auto"
        }
        const bottomInteractiveAreaStyle = {
            height: "40px", 
            justifyContent: "end"
        }
        const mood = this.props.mood;
        return (
            <Grid container direction="column" aria-label="current mod container" sx={moodContainerStyle}>
                <Grid item container aria-label="top interactive area" sx={topInteractiveAreaStyle} >
                    {mood.userId === this.props.loginuser &&
                    <Button 
                        variant="contained" 
                        startIcon={<ArchiveIcon fontSize="medium" />}
                        onClick={(e) => {this.handleClickArchive(e, mood)}}
                        sx={archiveButtonStyle} >
                        Archive
                    </Button>
                    }
                </Grid>
                <Grid item container aria-label="mood main info area" direction="row" sx={moodMainInfoAreaStyle} >
                    <Grid item container aria-label="mood main info left" sx={moodMainInfoLeftStyle} >
                        {mood.emotionId === AppConst.ANGER.getId() && <Angry />}
                        {mood.emotionId === AppConst.JOY.getId() && <Happy />}
                        {mood.emotionId === AppConst.SADNESS.getId() && <Sad />}
                        {mood.emotionId === AppConst.FEAR.getId() && <Worried />}
                    </Grid>
                    <Grid item container aria-label="mood main info right" direction="column" sx={moodMainInfoRightStyle} >
                        <Grid item container aria-label="mood type text area" sx={moodTypeTextAreaStyle} >
                            <Typography display="inline" align="center" variant="h3">
                                {AppConst.getSingleEmo(mood.emotionId, mood.moodLevel)}
                            </Typography>
                        </Grid>
                        <Grid item container aria-label="mood period text area" sx={moodPeriodTextAreaStyle} >
                            <MinuteTimer 
                                display="inline" 
                                variant="subtitle2"
                                earlier={parseISO(mood.startAt)} />
                        </Grid>
                    </Grid>
                </Grid>
                <Divider light sx={{marginBottom: "5px"}}/>
                <Grid item container aria-label="mood sub info area" direction="row" sx={moodSubInfoAreaStyle}>
                    <Grid item aria-label="mood sub info left area" sx={moodSubInfoLeftStyle}>
                        <CardMedia 
                            sx={photoStyle}
                            image={mood.url ? mood.url : NoImage} 
                            alt={mood.alt} />
                        <PhotoLibraryIcon fontSize="large" sx={cameraIconStyle}/>
                    </Grid>
                    <Grid item container aria-label="mood sub info right area" direction="column" sx={moodSubInfoRightStyle}>
                        <Grid item aria-label="mood tag area" sx={moodTagAreaStyle}>
                            <Chip 
                                size="small"
                                hidden={mood?.tag}
                                icon={<TagIcon tagid={mood?.tag} />}  
                                label={AppConst.getTagById(mood?.tag)?.getValue()} 
                                color="primary"
                                variant="outlined" />
                        </Grid>
                        <Grid item aria-label="mood detail text area" sx={moodDetailTextAreaStyle}>
                            <Typography display="inline" variant="body1">
                                {mood.note?.split('\n')?.map((str, index) => 
                                    <React.Fragment key={index}>{str}<br/></React.Fragment>
                                )}
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item container aria-label="bottom interactive area" sx={bottomInteractiveAreaStyle} >
                    <FormGroup row >
                        {mood.userId === this.props.loginuser &&
                        <FormControlLabel 
                            control={<VisibilityIcon />}
                            label={mood.viewCount}
                            onClick={this.handleClickView.bind(this, mood)}
                            sx={{
                                '&.MuiFormControlLabel-root': {marginRight: "35px"},
                            '& .MuiFormControlLabel-label': {marginLeft: "7px", "&:hover": {textDecoration: "underline"}}
                            }} />
                        }
                        <FormControlLabel 
                            control={
                                <FavoriteIcon 
                                    stroke={mood.likedByCurrentUser ? "red" : "rgba(0, 0, 0)"}
                                    strokeOpacity="0.8"
                                    sx={{color: mood.likedByCurrentUser ? "red" : "transparent"}}
                                    onClick={(e)=>{this.handleClickFavorite(e, mood)}} />
                            } 
                            label={mood.likeCount}
                            onClick={this.handleClickFavoriteLink.bind(this, mood)}
                            sx={{
                                '&.MuiFormControlLabel-root': {marginRight: "35px"},
                            '& .MuiFormControlLabel-label': {marginLeft: "7px", "&:hover": {textDecoration: "underline"}}
                            }} />
                    </FormGroup>
                </Grid>
                <Grid item >
                    <UserDialog 
                        moodId={this.state.moodId}
                        variant={this.state.variant}
                        open={this.state.userDialogOpen} 
                        closeDialog={() => {this.setState({userDialogOpen : false}); }} />
                </Grid>
            </Grid>
        );
    }
}
const ComponentAfterAuthChecked = requireAuth(CurrentMood);
const ComponentWithAppData = withAppData(ComponentAfterAuthChecked);
export default withRouter(ComponentWithAppData);