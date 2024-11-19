import React from 'react';
import axiosInstance from '../../axios/axiosInstance';

import { ImageList, ImageListItem, ImageListItemBar, Typography, Link, InputAdornment, 
    Dialog, DialogTitle, DialogContent, DialogActions, TextField, Zoom } from '@mui/material';

import SearchIcon from '@mui/icons-material/Search';

import AppConst from '../shared/AppConst';

// Transitions
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Zoom style={{ transitionDelay: props.open ? '500ms' : '300ms' }} ref={ref} {...props}  />;
});

export default class CameraRoll extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            search: '',
            timer: '',
            itemData: []
        };
        this.handleTextChange = this.handleTextChange.bind(this);
        this.onClickImage = this.onClickImage.bind(this);
    }

    handleTextChange( e ) {
        if(this.state.timer) clearTimeout(this.state.timer);
        let timer = setTimeout(() => {
            axiosInstance.get('/api/Unsplash/search/photos?query=' + e.target.value + "&per_page=60")
            .then(res => {
                if(res.status !== 403){
                    this.setState({itemData: res.data.results});
                } else {
                    this.setState({itemData: []});
                }
            });

            this.setState({timer: null});
        }, 400);

        this.setState( {
            search : e.target.value,
            timer : timer
        } );
    }
    onClickImage( e ) {
        this.props.handleClickImage(e.target);
        this.props.closeDialog();
    }
    render(){
        const style = {
            dialog: {
                minWidth: 200,
                minHeight: 200,
                dialogAction: {
                    flex: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                },
                dialogContent: {
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "space-around",
                    overflow: "hidden",
                    imageList: {
                        width: 500,
                        height: 450,
                    }
                }
            }
        }
        return (
            <Dialog 
                open={this.props.open} 
                scroll='paper' 
                TransitionComponent={Transition} 
                onClose={this.props.closeDialog}
                style={style.dialog}>
                <DialogTitle>
                    <Typography display="inline" variant="body1" marginLeft={3}> powered by </Typography>
                    <Link variant="h6" target="_blank" href="https://unsplash.com/?utm_source=ococa&utm_medium=referral">Unsplash</Link>
                </DialogTitle>
                <DialogActions style={style.dialog.dialogAction} >
                    <TextField 
                        id="search" 
                        label="search photos" 
                        value={this.state.search} 
                        onChange={this.handleTextChange} 
                        autoFocus
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <SearchIcon/>
                                </InputAdornment>
                            )
                        }}/>
                </DialogActions>
                <DialogContent style={style.dialog.dialogContent}>
                    { this.state.itemData.length !== 0 &&
                    <ImageList rowHeight={180} style={style.dialog.dialogContent.imageList}>
                        {this.state.itemData.map((item) => (
                            <ImageListItem key={item.id} onClick={this.onClickImage}>
                                <img 
                                    id={item.id}
                                    src={`${item.urls.raw}&w=220&h=160`} 
                                    alt={item.alt_description} 
                                    data-download_location={
                                        item.links.download_location.replace(
                                            /https:\/\/api.unsplash.com\/photos/g, 
                                            "/api/Unsplash/photos")} />
                                <ImageListItemBar 
                                    subtitle={
                                        <span>@ 
                                            <Link 
                                                variant="caption" 
                                                color="inherit"
                                                target="_blank" 
                                                href={"https://unsplash.com/@" + item.user.username + "?utm_source=" + AppConst.APP_TITLE.getLabel() + "&utm_medium=referral"} >
                                                {item.user.name}
                                            </Link>
                                        </span>
                                    } />
                            </ImageListItem>
                        ))}
                    </ImageList>
                    }
                    { this.state.itemData.length === 0 &&
                    <Typography variant="h6" color="textSecondary" align="center">
                        {AppConst.getMessageById(AppConst.MSG102.getId())?.getMessage()}
                    </Typography>
                    }
                </DialogContent>
            </Dialog>
        );
    }
}