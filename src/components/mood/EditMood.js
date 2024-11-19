import React from 'react';
import axiosInstance from '../../axios/axiosInstance';

import { Grid, Divider, Typography, Stack, Chip, 
    CardMedia, SpeedDial, SpeedDialIcon, SpeedDialAction, FormControl, OutlinedInput, InputLabel } from '@mui/material';

import DoneIcon from '@mui/icons-material/Done'
import CloseIcon from '@mui/icons-material/Close';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';

import parseISO from 'date-fns/parseISO'

import MinuteTimer from '../date/MinuteTimer'
import CameraRoll from '../unsplash/CameraRoll';
import Happy from './icon/Happy';
import Angry from './icon/Angry';
import Sad from './icon/Sad';
import Worried from './icon/Worried';

import '../shared/Common.scss';
import TagIcon from '../shared/TagIcon';
import AppConst from '../shared/AppConst';
import { requireAuth, withRouter, withAppData } from '../../context/props'; 

class EditMood extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            closeList: [],
            photoDialogOpen: false,
            editMood: this.props.editMood
        };
        this.handleTextChange = this.handleTextChange.bind(this);
        this.handleClickInfo = this.handleClickInfo.bind(this);
        this.handleClickPhoto = this.handleClickPhoto.bind(this);
        this.handleClickTagIcon = this.handleClickTagIcon.bind(this);
        this.handleClickDone = this.handleClickDone.bind(this);
        this.handleClickImage = this.handleClickImage.bind(this);
        this.setEndAt = this.setEndAt.bind(this);
    }
    handleTextChange(e) {
        this.setState((prevState) => { 
            const newEditMood = {...prevState.editMood};
            newEditMood.note = e.target.value;
            return {editMood: newEditMood};
        });
    }
    handleClickInfo(mood){
        this.setState({userDialogOpen : true}); 
        this.setState({infoMoodId: mood._id});
    }
    handleClickPhoto() {
        this.setState({photoDialogOpen: true});
    }
    handleClickTagIcon(tag) {
        this.setState((prevState) => {
            const newEditMood = {...prevState.editMood};
            newEditMood.tag = (tag === newEditMood.tag) ? "" : tag;
            return({editMood : newEditMood});
        });
    }
    handleClickDone(moodId){
        const params = {...this.state.editMood}; 
        axiosInstance.put(`/api/mood/${moodId}`, params).then((res) => {
            if(res.status !== 500){
                // res.data.url = this.state.editMood.url;
                // res.data.alt = this.state.editMood.alt;
                // follow Unsplash API Guide 
                if(this.state.editMood.download_location){
                    axiosInstance.get(this.state.editMood.download_location)
                    .catch((error) => {
                        console.error("download count-up failed.");
                        console.error(error);
                    });
                }
                console.log(params);
                this.props.appdata.mood.setUpdatedMood(params);
                this.props.setEditMood(null);
            } else {
                console.error("データの登録に失敗しました。");
                console.error("ステータス：" + res.status);
            }
        }).catch(() => {
            this.props.appdata.message.handleMsg(AppConst.MSG405.getId());
        });
    }
    handleClickImage(target) {
        this.setState((prevState) => { 
            const newEditMood = {...prevState.editMood};
            newEditMood.pictureId = target.id;
            newEditMood.url = target.src;
            newEditMood.alt = target.alt;
            newEditMood.download_location = target.dataset.download_location;
            return {editMood: newEditMood};
        });
    }
    setEndAt(newEndAt) {
        this.setState((prevState) => { 
            const newEditMood = {...prevState.editMood};
            newEditMood.endAt = newEndAt;
            return {editMood: newEditMood};
        });
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
        const style = {
            editableTime: {
                marginLeft: 10,
                marginRight: 10,
            },
            photoArea: {
                flex: 0.5,
                display: "flex",
                minWidth: 220,
                maxWidth: 220,
                minHeight: 160,
                maxHeight: 160,
                position: "relative",
                overflow: "hidden",
                photo: {
                    width : "calc(100% - 10px)", 
                    height: "calc(100% - 10px)",
                    margin: "5px 5px 5px 5px",
                },
                clickablePhoto: {
                    width : "100%", 
                    height: "100%",
                    transition: "0.5s",
                    textAlign:"center",
                    filter: "opacity(60%) brightness(110%)"
                },
                camera: {
                    position:"absolute",
                    top: "47%",
                    left: "45%",
                    zIndex: 10,
                }
            },
            chipArea: {
                display: "grid",
                stack: {
                    width: "80%",
                    overflow: "scroll",
                },
            },
            moodMenu: {
                position: "absolute", 
                bottom: 16, 
                right: 16
            }
        };
        const mood = this.state.editMood;
        return (
            <Grid container direction="column" aria-label="edit mod container" sx={moodContainerStyle}>
                <Grid item container aria-label="top interactive area" sx={topInteractiveAreaStyle} >
                    <SpeedDial
                        ariaLabel="Mood-Menu"
                        direction="left"
                        FabProps={{size: "medium", color:"secondary"}}
                        // sx={style.moodMenu}
                        icon={<SpeedDialIcon />} >
                        <SpeedDialAction 
                            key="cancel"
                            icon={<CloseIcon />}
                            onClick={()=>{this.props.setEditMood(null)}}
                            tooltipTitle="cancel" />
                        <SpeedDialAction 
                            key="done"
                            icon={<DoneIcon />}
                            onClick={this.handleClickDone.bind(this, mood.moodId)}
                            tooltipTitle="done" />
                    </SpeedDial>
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
                            {/* <FormatTime
                                date={mood.startAt} 
                                display="inline"
                                format={AppConst.FORMAT_TIME_1}
                                variant="h6" 
                                color="textSecondary" 
                                align="center" />
                            <span> ~ </span>
                            <EditableTime 
                                onClick={(e)=>{e.stopPropagation()}}
                                onFocus={(e)=>{e.stopPropagation()}}
                                style={style.editableTime}
                                date={mood.endAt} 
                                refdate={mood.startAt}
                                setEndAt={()=>{ this.setEndAt(); }} />
                            <DifferenceTime 
                                display="inline" 
                                variant="subtitle1" 
                                color="textSecondary" 
                                later={parseISO(mood.endAt)}
                                earlier={parseISO(mood.startAt)} /> */}
                        </Grid>
                    </Grid>
                </Grid>
                <Divider light sx={{marginBottom: "5px"}}/>
                <Grid item container aria-label="mood sub info area" direction="row" sx={moodSubInfoAreaStyle}>
                    <Grid item aria-label="mood sub info left area" sx={moodSubInfoLeftStyle} onClick={this.handleClickPhoto}>
                        <CardMedia 
                            style={style.photoArea.clickablePhoto} 
                            image={mood.url} 
                            alt={mood.alt}
                            sx={photoStyle} />
                        <PhotoLibraryIcon 
                            style={style.photoArea.camera} 
                            fontSize="large" 
                            className="camera" 
                            sx={{
                                display: "none",
                                "&:hover": {
                                    display: "block !important"
                                }
                            }}/>
                    </Grid>
                    <Grid item container aria-label="mood sub info right area" direction="column" sx={moodSubInfoRightStyle}>
                        <Grid item aria-label="mood tag area" sx={moodTagAreaStyle}>
                            <Stack direction="row" spacing={1} style={style.chipArea.stack}>
                                <Chip 
                                    icon={<TagIcon tagid={AppConst.TAG01.getId()} />}
                                    label={AppConst.TAG01.getValue()} 
                                    variant={mood.tag === AppConst.TAG01.getId() ? "filled" :"outlined"}
                                    onClick={this.handleClickTagIcon.bind(this, AppConst.TAG01.getId())} />
                                <Chip 
                                    icon={<TagIcon tagid={AppConst.TAG02.getId()} />}
                                    label={AppConst.TAG02.getValue()} 
                                    variant={mood.tag === AppConst.TAG02.getId() ? "filled" :"outlined"}
                                    onClick={this.handleClickTagIcon.bind(this, AppConst.TAG02.getId())} />
                                <Chip 
                                    icon={<TagIcon tagid={AppConst.TAG03.getId()} />}
                                    label={AppConst.TAG03.getValue()} 
                                    variant={mood.tag === AppConst.TAG03.getId() ? "filled" :"outlined"}
                                    onClick={this.handleClickTagIcon.bind(this, AppConst.TAG03.getId())} />
                                <Chip 
                                    icon={<TagIcon tagid={AppConst.TAG04.getId()} />}
                                    label={AppConst.TAG04.getValue()} 
                                    variant={mood.tag === AppConst.TAG04.getId() ? "filled" :"outlined"}
                                    onClick={this.handleClickTagIcon.bind(this, AppConst.TAG04.getId())} />
                                <Chip 
                                    icon={<TagIcon tagid={AppConst.TAG05.getId()} />}
                                    label={AppConst.TAG05.getValue()} 
                                    variant={mood.tag === AppConst.TAG05.getId() ? "filled" :"outlined"}
                                    onClick={this.handleClickTagIcon.bind(this, AppConst.TAG05.getId())} />
                            </Stack>
                        </Grid>
                        <Grid item aria-label="mood detail text area" sx={moodDetailTextAreaStyle}>
                            <FormControl sx={{"height" : "100%"}} variant="outlined" align="center">
                                <InputLabel htmlFor="note">add short text here</InputLabel>
                                <OutlinedInput
                                    id="note"
                                    multiline
                                    maxRows={3}
                                    sx={{"height" : "100%"}}
                                    value={mood.note} 
                                    onChange={this.handleTextChange} />
                            </FormControl>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item >
                    <CameraRoll 
                        open={this.state.photoDialogOpen } 
                        handleClickImage={this.handleClickImage} 
                        closeDialog={() => {this.setState({photoDialogOpen : false}); }} />
                </Grid>
            </Grid>
            // <Accordion 
            //     expanded={this.state.closeList.filter(expand => expand === mood._id).length === 0} 
            //     disableGutters
            //     sx={{
            //         '&.MuiAccordion-root': { boxShadow: "none"},
            //         '&.MuiAccordion-root:before': { backgroundColor: "inherit" },
            //     }} >
            //     <AccordionSummary>
            //         <Grid container direction="row" alignItems="center"> 
            //             <Grid item xs={1.2}>
            //                 <Avatar sx={{ width: 47, height: 47, backgroundColor: "transparent" }} >
            //                     { AppConst.getEmos().filter(e => e.getId() === mood.emotionId)[0]
            //                         .getIcon({
            //                             htmlColor: AppConst.getSingleColor(mood.emotionId, mood.moodLevel),
            //                             sx:{fontSize: 50}
            //                         }) 
            //                     }
            //                 </Avatar>
            //             </Grid>
            //             <Grid item container xs direction="column">
            //                 <Grid item>
            //                     <Typography display="inline" align="center" variant="h6">
            //                         {`I was ${AppConst.getSingleEmo(mood.emotionId, mood.moodLevel)}`}
            //                     </Typography>
            //                 </Grid>
            //                 <Grid item container alignItems="baseline">
            //                     <FormatTime
            //                         date={mood.startAt} 
            //                         display="inline"
            //                         format={AppConst.FORMAT_TIME_1}
            //                         variant="h6" 
            //                         color="textSecondary" 
            //                         align="center" />
            //                     <span> ~ </span>
            //                     <EditableTime 
            //                         onClick={(e)=>{e.stopPropagation()}}
            //                         onFocus={(e)=>{e.stopPropagation()}}
            //                         style={style.editableTime}
            //                         date={mood.endAt} 
            //                         refdate={mood.startAt}
            //                         setEndAt={()=>{ this.setEndAt(); }} />
            //                     <DifferenceTime 
            //                         display="inline" 
            //                         variant="subtitle1" 
            //                         color="textSecondary" 
            //                         later={parseISO(mood.endAt)}
            //                         earlier={parseISO(mood.startAt)} />
            //                 </Grid>
            //                 <Grid item xs="auto">
            //                     <SpeedDial
            //                         ariaLabel="Mood-Menu"
            //                         direction="left"
            //                         FabProps={{color:"secondary"}}
            //                         sx={style.moodMenu}
            //                         icon={<SpeedDialIcon />} >
            //                         <SpeedDialAction 
            //                             key="cancel"
            //                             icon={<CloseIcon />}
            //                             onClick={()=>{this.props.setEditMood(null)}}
            //                             tooltipTitle="cancel" />
            //                         <SpeedDialAction 
            //                             key="done"
            //                             icon={<DoneIcon />}
            //                             onClick={this.handleClickDone}
            //                             tooltipTitle="done" />
            //                     </SpeedDial>
            //                 </Grid>
            //             </Grid>
            //         </Grid>
            //     </AccordionSummary>
            //     <AccordionDetails>
            //         <Grid container spacing={2} direction="row">
            //             <Grid item xs="auto" style={style.photoArea} onClick={this.handleClickPhoto}>
            //                 <CardMedia 
            //                     style={style.photoArea.clickablePhoto} 
            //                     image={mood.url} 
            //                     alt={mood.alt}
            //                     sx={{
            //                         "&:hover": {
            //                             cursor: "pointer",
            //                             transform: "scale(1.2)",
            //                             "+.camera": {
            //                                 display: "block"
            //                             }
            //                         }
            //                     }} />
            //                 <PhotoLibraryIcon 
            //                     style={style.photoArea.camera} 
            //                     fontSize="large" 
            //                     className="camera" 
            //                     sx={{
            //                         display: "none",
            //                         "&:hover": {
            //                             display: "block !important"
            //                         }
            //                     }}/>
            //             </Grid>
            //             <Grid item container xs spacing={2} direction="column">
            //                 <Grid item container xs="auto" alignItems="center">
            //                     <Grid item xs style={style.chipArea}>
            //                         <Stack direction="row" spacing={1} style={style.chipArea.stack}>
            //                             <Chip 
            //                                 icon={<TagIcon tagid={AppConst.TAG01.getId()} />}
            //                                 label={AppConst.TAG01.getValue()} 
            //                                 variant={mood.tag === AppConst.TAG01.getId() ? "filled" :"outlined"}
            //                                 onClick={this.handleClickTagIcon.bind(this, AppConst.TAG01.getId())} />
            //                             <Chip 
            //                                 icon={<TagIcon tagid={AppConst.TAG02.getId()} />}
            //                                 label={AppConst.TAG02.getValue()} 
            //                                 variant={mood.tag === AppConst.TAG02.getId() ? "filled" :"outlined"}
            //                                 onClick={this.handleClickTagIcon.bind(this, AppConst.TAG02.getId())} />
            //                             <Chip 
            //                                 icon={<TagIcon tagid={AppConst.TAG03.getId()} />}
            //                                 label={AppConst.TAG03.getValue()} 
            //                                 variant={mood.tag === AppConst.TAG03.getId() ? "filled" :"outlined"}
            //                                 onClick={this.handleClickTagIcon.bind(this, AppConst.TAG03.getId())} />
            //                             <Chip 
            //                                 icon={<TagIcon tagid={AppConst.TAG04.getId()} />}
            //                                 label={AppConst.TAG04.getValue()} 
            //                                 variant={mood.tag === AppConst.TAG04.getId() ? "filled" :"outlined"}
            //                                 onClick={this.handleClickTagIcon.bind(this, AppConst.TAG04.getId())} />
            //                             <Chip 
            //                                 icon={<TagIcon tagid={AppConst.TAG05.getId()} />}
            //                                 label={AppConst.TAG05.getValue()} 
            //                                 variant={mood.tag === AppConst.TAG05.getId() ? "filled" :"outlined"}
            //                                 onClick={this.handleClickTagIcon.bind(this, AppConst.TAG05.getId())} />
            //                         </Stack>
            //                     </Grid>
            //                 </Grid>
            //                 <Grid item xs>
            //                     <FormControl style={{"width" : "80%"}} variant="outlined" align="center">
            //                         <InputLabel htmlFor="note">add short text here</InputLabel>
            //                         <OutlinedInput
            //                             id="note"
            //                             multiline
            //                             maxRows={3}
            //                             value={mood.note} 
            //                             onChange={this.handleTextChange} />
            //                     </FormControl>
            //                 </Grid>
            //             </Grid>
            //         </Grid>
            //         <CameraRoll 
            //             open={this.state.photoDialogOpen } 
            //             handleClickImage={this.handleClickImage} 
            //             closeDialog={() => {this.setState({photoDialogOpen : false}); }} />
            //     </AccordionDetails>
            // </Accordion>
        );
    }
}
const ComponentAfterAuthChecked = requireAuth(EditMood);
const ComponentWithAppData = withAppData(ComponentAfterAuthChecked);
export default withRouter(ComponentWithAppData);