import React from 'react';

import { Grid, Divider, Typography, Chip, CardMedia, SpeedDial, SpeedDialIcon, 
    SpeedDialAction, FormGroup, FormControlLabel } from '@mui/material';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';

import parseISO from 'date-fns/parseISO'

import MinuteTimer from '../date/MinuteTimer'
import EditMood from './EditMood';
import NoImage from '../../static/images/NoImage.jpg';
import UserDialog from '../friends/UserDialog';
import Happy from './icon/Happy';
import Angry from './icon/Angry';
import Sad from './icon/Sad';
import Worried from './icon/Worried';

import '../shared/Common.scss';
import TagIcon from '../shared/TagIcon';

import AppConst from '../shared/AppConst';
import { requireAuth, withRouter, withAppData } from '../../context/props'; 

class PastMood extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            closeList: [],
            editMood: null,
            userDialogOpen: false,
            infoMoodId: null,
        };
        this.handleClickEdit = this.handleClickEdit.bind(this);
        this.handleClickDelete = this.handleClickDelete.bind(this);
        this.handleClickView = this.handleClickView.bind(this);
        this.handleClickFavoriteLink = this.handleClickFavoriteLink.bind(this);
        this.handleClickFavorite = this.handleClickFavorite.bind(this);
        this.handleAccordionChange = this.handleAccordionChange.bind(this);
    }
    handleClickEdit(e, mood){
        e.stopPropagation();
        const newEditMood = {};
        newEditMood.moodId = mood.moodId;
        newEditMood.userId = mood.userId;
        newEditMood.emotionId = mood.emotionId;
        newEditMood.moodLevel = mood.moodLevel;
        newEditMood.tag = mood.tag;
        newEditMood.startAt = mood.startAt;
        newEditMood.endAt = mood.endAt;
        newEditMood.note = mood.note;
        newEditMood.pictureId = mood.pictureId;
        newEditMood.url = mood.url;
        newEditMood.alt = mood.alt;
        // newEditMood.event = {
        //     note: mood.note,
        //     pictureId: mood.pictureId,
        //     url: mood.url,
        //     alt: mood.alt
        // }
        this.setState({editMood: newEditMood});
    }
    handleClickDelete(e, moodId){
        e.stopPropagation();
        if(window.confirm("Are you sure?")){
            this.props.appdata.mood.deleteMood(moodId)
            .catch((e)=>{
                this.props.appdata.message.handleMsg(e.messageID);
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
            this.props.appdata.mood.cancelFavorite(mood)
            .catch((e)=>{
                this.props.appdata.message.handleMsg(e.messageID);
            });
        } else {
            this.props.appdata.mood.favoriteMood(mood)
            .catch((e)=>{
                this.props.appdata.message.handleMsg(e.messageID);
            });
        }
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
    render() {
        const moodContainerStyle = {
            width: "100%"
        }
        const topInteractiveAreaStyle = {
            height: "40px", 
            justifyContent: "end"
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
        if(this.state.editMood){
            return(<EditMood editMood={this.state.editMood} setEditMood={(mood)=> {this.setState({editMood: mood});}}/>);
        } else {
            return (
                <Grid container direction="column" aria-label="past mod container" sx={moodContainerStyle}>
                    <Grid item container aria-label="top interactive area" sx={topInteractiveAreaStyle} >
                        {mood.userId === this.props.loginuser &&
                        <SpeedDial
                            ariaLabel="Mood-Menu"
                            direction="left"
                            FabProps={{size: "medium", color:"primary"}}
                            icon={<SpeedDialIcon />} >
                            <SpeedDialAction 
                                key="edit"
                                icon={<EditIcon />}
                                onClick={(e)=>{ this.handleClickEdit(e, mood); }}
                                tooltipTitle="edit" />
                            <SpeedDialAction 
                                key="delete"
                                icon={<DeleteIcon />}
                                onClick={(e)=>{ this.handleClickDelete(e, mood.moodId); }}
                                tooltipTitle="delete" />
                        </SpeedDial>
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
                                    variant="subtitle1"
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
}
const ComponentAfterAuthChecked = requireAuth(PastMood);
const ComponentWithAppData = withAppData(ComponentAfterAuthChecked);
export default withRouter(ComponentWithAppData);