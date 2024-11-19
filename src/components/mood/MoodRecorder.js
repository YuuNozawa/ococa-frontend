import React from 'react';
import axiosInstance from '../../axios/axiosInstance';

import { Dialog, DialogContent, Grid, IconButton, Button, Radio, RadioGroup, FormControlLabel, FormControl, 
    OutlinedInput, InputLabel, Typography, Slider, Chip, Stack, Link } from '@mui/material';

import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import DoneIcon from '@mui/icons-material/Done'
import CircleIcon from '@mui/icons-material/Circle';

import InnerCameraRoll from '../unsplash/InnerCameraRoll';
import AppConst from '../shared/AppConst';
import TagIcon from '../shared/TagIcon';
import { requireAuth, withRouter, withAppData } from '../../context/props'; 

import Slide from '@mui/material/Slide';
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const initialState= {
    emotionId: null,
    moodLevel: 0,
    startAt: null,
    endAt: null,
    steps: 0,
    tag: null,
    note: "",
    pictureId: "",
    url: "",
    alt: "",
    download_location: "",
}
class MoodRecorder extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            emotionId: null,
            userId: props.loginuser.userId,
            moodLevel: 0,
            startAt: null,
            endAt: null,
            steps: 0,
            tag: null,
            note: "",
            pictureId: "",
            url: "",
            alt: "",
            download_location: ""
        };
        this.setLevel = this.setLevel.bind(this);
        this.handleClickNext = this.handleClickNext.bind(this);
        this.handleClickBefore = this.handleClickBefore.bind(this);
        this.handleClickCreate = this.handleClickCreate.bind(this);
        this.handleClickPhotoIcon = this.handleClickPhotoIcon.bind(this);
        this.handleClickImage = this.handleClickImage.bind(this);
        this.handleClickTagIcon = this.handleClickTagIcon.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
        this.closeDialogAndInitialize = this.closeDialogAndInitialize.bind(this);
    }
    setLevel(newLevel) {
        this.setState({moodLevel: newLevel});
    }
    handleClickNext() {
        this.nextStep();
    }
    handleClickBefore() {
        this.prevStep();
    }
    handleClickCreate(e) {
        const newPost = {...this.state};
        newPost.startAt = new Date();

        axiosInstance.post('/api/mood', newPost).then((res) => {
            if(res.status !== 500) {
                newPost.moodId = res.data.moodId;
                this.props.appdata.mood.setUpdatedMood(newPost);
                // follow Unsplash API Guide 
                if(this.state.download_location){
                    axiosInstance.get(this.state.download_location)
                    .catch((error) => {
                        console.error("download count-up failed.");
                        console.error(error);
                    });
                }
                this.setState(initialState);
                this.closeDialogAndInitialize();
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
    handleClickPhotoIcon() {
        this.setState({isDialogOpen : true})
    }
    handleClickTagIcon(tag) {
        this.setState((prevState) => {
            if(tag === prevState.tag){
                return({tag : null});
            }
            return({tag : tag});
        })
    }
    nextStep() {
        this.setState((prevState) => { 
            return ({steps: ++prevState.steps});
        });
    }
    prevStep() {
        this.setState((prevState) => { 
            return ({steps: --prevState.steps});
        });
    }
    handleTextChange(e) {
        this.setState({note : e.target.value});
    }
    handleClickImage(target) {
        this.setState({pictureId : target.id});
        this.setState({url : target.src});
        this.setState({alt : target.alt});
        this.setState({download_location : target.dataset.download_location});
    }
    closeDialogAndInitialize(){
        this.props.closeDialog();
        this.setState(initialState);
    }
    render() {
        const radioJoyStyle = {
            color: AppConst.getSingleColor(AppConst.JOY.getId(), AppConst.MILD),
            '&.Mui-checked': {
                color: AppConst.getSingleColor(AppConst.JOY.getId(), AppConst.STRONG),
            },
            '& .MuiSvgIcon-root': {
                fontSize: this.state.emotionId === AppConst.JOY.getId() ? 50 : 45,
            },
        }
        const radioAngerStyle = {
            color: AppConst.getSingleColor(AppConst.ANGER.getId(), AppConst.MILD),
            '&.Mui-checked': {
                color: AppConst.getSingleColor(AppConst.ANGER.getId(), AppConst.STRONG),
            },
            '& .MuiSvgIcon-root': {
                fontSize: this.state.emotionId === AppConst.ANGER.getId() ? 50 : 45,
            }
        }
        const radioFearStyle = {
            color: AppConst.getSingleColor(AppConst.FEAR.getId(), AppConst.MILD),
            '&.Mui-checked': {
                color: AppConst.getSingleColor(AppConst.FEAR.getId(), AppConst.STRONG),
            },
            '& .MuiSvgIcon-root': {
                fontSize: this.state.emotionId === AppConst.FEAR.getId() ? 50 : 45,
            },
        }
        const radioSadStyle = {
            color: AppConst.getSingleColor(AppConst.SADNESS.getId(), AppConst.MILD),
            '&.Mui-checked': {
                color: AppConst.getSingleColor(AppConst.SADNESS.getId(), AppConst.STRONG),
            },
            '& .MuiSvgIcon-root': {
                fontSize: this.state.emotionId === AppConst.SADNESS.getId() ? 50 : 45,
            },
        }
        const sliderStyle = {
            width: "70%",
            '& .MuiSlider-thumb': {
                height: 50,
                width: 50,
                backgroundColor: `rgba(${AppConst.getSingleColorRgb(this.state.emotionId, AppConst.MILD)}, 0.3)`
            },
            '& .MuiSlider-mark': {
                height: 34,
                width: 34,
                transform: "translate(-17px, -17px)",
                backgroundColor: '#bfbfbf',
                borderRadius: "50%",
            },
            '& .MuiSlider-markActive': {
                backgroundColor: `rgba(${AppConst.getSingleColorRgb(this.state.emotionId, AppConst.STRONG)}, 1)`
            },
            '& .MuiSlider-rail': {
                backgroundColor: "rgba(191, 191, 191, 0.7)"
                ,
            },
            '& .MuiSlider-track': {
                border: "none",
                backgroundColor: 'rgba(191, 191, 191, 1)',
            },
            '& .MuiSlider-valueLabel': {
                fontSize: 22,
                fontWeight: 'normal',
                top: 45,
                zIndex: 100,
                backgroundColor: 'unset',
                '&:before': {
                  display: 'none',
                },
                '& *': {
                  background: 'transparent',
                },
            }
        }
        const moodStackStyle = {
            maxWidth: { xs: 200, sm: 200, md: 400 },
            flexWrap: { xs: "wrap", sm: "wrap", md: "none" }
        }
        return (
            <Dialog 
                open={this.props.open} 
                scroll='paper' 
                TransitionComponent={Transition} 
                onClose={this.closeDialogAndInitialize}
                fullWidth
                maxWidth={this.state.steps === 4 ? "sm" : "xs"} >
                <DialogContent>
                    <Grid container direction="column" >
                        <Grid item container spacing={2} justifyContent='center'>
                            <Grid item>
                                <Typography display="inline" variant="h4">
                                    {AppConst.getMoodTitleByStep(this.state.steps)}
                                </Typography>
                                { this.state.steps === 4 &&<>
                                <Typography display="inline" variant="body1" marginLeft={3}> powered by </Typography>
                                <Link variant="h6" target="_blank" href="https://unsplash.com/?utm_source=ococa&utm_medium=referral">
                                    Unsplash
                                </Link>
                                </>}
                            </Grid>
                        </Grid>
                        <Grid item container  alignItems='center' justifyContent="center" style={{height: this.state.steps === 4 ? 450 : 250}}>
                            { this.state.steps === 0 && 
                            <FormControl>
                                <RadioGroup
                                    aria-labelledby="mood radio group"
                                    value={this.state.emotionId}
                                    onChange={(e) => {this.setState({emotionId: e.target.value})}} >
                                    <Stack direction="row" sx={moodStackStyle}>
                                    <FormControlLabel 
                                        value={AppConst.JOY.getId()}
                                        label={AppConst.JOY.getLabelByLevel(AppConst.WEAK)}
                                        labelPlacement="bottom"
                                        control={<Radio sx={radioJoyStyle} icon={<CircleIcon/>} checkedIcon={AppConst.JOY.getIcon()} />} />
                                    <FormControlLabel 
                                        value={AppConst.ANGER.getId()}
                                        label={AppConst.ANGER.getLabelByLevel(AppConst.WEAK)}
                                        labelPlacement="bottom"
                                        control={<Radio sx={radioAngerStyle} icon={<CircleIcon/>} checkedIcon={AppConst.ANGER.getIcon()} />} />
                                    <FormControlLabel 
                                        value={AppConst.FEAR.getId()}
                                        label={AppConst.FEAR.getLabelByLevel(AppConst.WEAK)}
                                        labelPlacement="bottom"
                                        control={<Radio sx={radioFearStyle} icon={<CircleIcon/>} checkedIcon={AppConst.FEAR.getIcon()} />} />
                                    <FormControlLabel 
                                        value={AppConst.SADNESS.getId()}
                                        label={AppConst.SADNESS.getLabelByLevel(AppConst.WEAK)}
                                        labelPlacement="bottom"
                                        control={<Radio sx={radioSadStyle} icon={<CircleIcon/>} checkedIcon={AppConst.SADNESS.getIcon()} />} />
                                    </Stack>
                                </RadioGroup>
                            </FormControl>
                            }
                            { this.state.steps === 1 && 
                            <Slider 
                                sx={sliderStyle}
                                aria-labelledby="level-slider" 
                                value={this.state.moodLevel}
                                max={AppConst.STRONG} 
                                marks={AppConst.MARKS}
                                defaultValue={this.state.moodLevel} 
                                valueLabelDisplay="on"
                                onChange={ (e) => {this.setLevel(e.target.value)} } />
                            }
                            { this.state.steps === 2 && 
                            <Stack direction="column" spacing={1}>
                                <Chip 
                                    sx={{justifyContent: "flex-start"}}
                                    icon={<TagIcon tagid={AppConst.TAG01.getId()} />}
                                    label={AppConst.TAG01.getValue()} 
                                    color={this.state.tag === AppConst.TAG01.getId() ? "primary" :"default"}
                                    variant={this.state.tag === AppConst.TAG01.getId() ? "filled" :"outlined"}
                                    onClick={this.handleClickTagIcon.bind(this, AppConst.TAG01.getId())} />
                                <Chip 
                                    sx={{justifyContent: "flex-start"}}
                                    icon={<TagIcon tagid={AppConst.TAG02.getId()} />}
                                    label={AppConst.TAG02.getValue()} 
                                    color={this.state.tag === AppConst.TAG02.getId() ? "primary" :"default"}
                                    variant={this.state.tag === AppConst.TAG02.getId() ? "filled" :"outlined"}
                                    onClick={this.handleClickTagIcon.bind(this, AppConst.TAG02.getId())} />
                                <Chip 
                                    sx={{justifyContent: "flex-start"}}
                                    icon={<TagIcon tagid={AppConst.TAG03.getId()} />}
                                    label={AppConst.TAG03.getValue()} 
                                    color={this.state.tag === AppConst.TAG03.getId() ? "primary" :"default"}
                                    variant={this.state.tag === AppConst.TAG03.getId() ? "filled" :"outlined"}
                                    onClick={this.handleClickTagIcon.bind(this, AppConst.TAG03.getId())} />
                                <Chip 
                                    sx={{justifyContent: "flex-start"}}
                                    icon={<TagIcon tagid={AppConst.TAG04.getId()} />}
                                    label={AppConst.TAG04.getValue()} 
                                    color={this.state.tag === AppConst.TAG04.getId() ? "primary" :"default"}
                                    variant={this.state.tag === AppConst.TAG04.getId() ? "filled" :"outlined"}
                                    onClick={this.handleClickTagIcon.bind(this, AppConst.TAG04.getId())} />
                                <Chip 
                                    sx={{justifyContent: "flex-start"}}
                                    icon={<TagIcon tagid={AppConst.TAG05.getId()} />}
                                    label={AppConst.TAG05.getValue()} 
                                    color={this.state.tag === AppConst.TAG05.getId() ? "primary" :"default"}
                                    variant={this.state.tag === AppConst.TAG05.getId() ? "filled" :"outlined"}
                                    onClick={this.handleClickTagIcon.bind(this, AppConst.TAG05.getId())} />
                            </Stack>
                            }
                            { this.state.steps === 3 &&
                            <FormControl style={{"width" : "90%"}} variant="outlined" align="center">
                                <InputLabel htmlFor="note">add short text</InputLabel>
                                <OutlinedInput
                                    id="note"
                                    multiline
                                    rows={3}
                                    value={this.state.note} 
                                    onChange={this.handleTextChange}/>
                            </FormControl>
                            }
                            { this.state.steps === 4 &&
                            <InnerCameraRoll note={this.state.note} handleClickImage={this.handleClickImage} />
                            }
                        </Grid>
                        <Grid item container spacing={2} justifyContent='space-between'>
                            <Grid item>
                                {0 < this.state.steps && 
                                <Button 
                                    aria-label="before" 
                                    onClick={this.handleClickBefore} 
                                    variant="contained" 
                                    startIcon={<NavigateBeforeIcon fontSize="large" />}>
                                    Back
                                </Button>
                                }
                            </Grid>
                            <Grid item>
                                {this.state.steps < 4 && 
                                <Button 
                                    aria-label="next" 
                                    onClick={this.handleClickNext} 
                                    variant="contained" 
                                    disabled={this.state.emotionId === null}
                                    endIcon={<NavigateNextIcon fontSize="large" />}>
                                    Next
                                </Button>
                                }
                                {this.state.steps === 4 && 
                                <IconButton 
                                    edge="end" 
                                    aria-label="next" 
                                    onClick={this.handleClickCreate}>
                                    <DoneIcon fontSize="large" />
                                </IconButton>
                                }
                            </Grid>
                        </Grid>
                    </Grid>
                </DialogContent>
            </Dialog>
        );
    }
}
const ComponentAfterAuthChecked = requireAuth(MoodRecorder);
const ComponentWithAppData = withAppData(ComponentAfterAuthChecked);
export default withRouter(ComponentWithAppData);