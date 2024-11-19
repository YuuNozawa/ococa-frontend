import React from 'react';
import axiosInstance from '../../axios/axiosInstance';

import { Grid, ImageList, ImageListItem, ImageListItemBar, TextField, InputAdornment, Typography, Link } from '@mui/material';

import SearchIcon from '@mui/icons-material/Search';

import AppConst from '../shared/AppConst';

export default class InnerCameraRoll extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            search: '',
            timer: '',
            itemData: [],
            selected: null
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
            timer : timer,
            selected : null
        } );
    }
    onClickImage( e ) {
        this.props.handleClickImage(e.target);
        this.setState((prevState)=>{
            return {selected: e.target.id === prevState.selected ? "" : e.target.id}
        });
    }
    render(){
        const style = {
            imageList: {
                width: 440,
                height: 320,
                image: {
                    width: 220,
                    height: 160,
                }
            }
        }
        return (
            <Grid container direction="column" spacing={2} >
                <Grid item container justifyContent="center">
                    <Typography align="center" sx={{width:"28em", wordWrap:"break-word"}}>
                        {this.props.note?.length > 122 ? this.props.note?.substring(0, 120) + ".." : this.props.note}
                    </Typography>
                </Grid>
                <Grid item container justifyContent="center">
                    <TextField 
                        autoFocus
                        size="small"
                        label="search images" 
                        value={this.state.search} 
                        onChange={this.handleTextChange} 
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <SearchIcon/>
                                </InputAdornment>
                            )
                        }}/>
                </Grid>
                { this.state.itemData.length !== 0 &&
                <Grid item container direction="column" >
                    <Grid item container justifyContent="center">
                        <ImageList rowHeight={160} style={style.imageList}>
                            {this.state.itemData.map((item) => (
                                <ImageListItem 
                                    key={item.id} 
                                    onClick={this.onClickImage} 
                                    sx={{
                                        border: this.state.selected === item.id ? "solid 3px #ECB865" : "none",
                                        filter: this.state.selected && this.state.selected !== item.id ? "opacity(60%) brightness(70%)": "none"
                                    }} >
                                    <img 
                                        id={item.id}
                                        src={`${item.urls.raw}&w=220&h=160`} 
                                        alt={item.alt_description} 
                                        data-download_location={
                                            item.links.download_location.replace(
                                                /https:\/\/api.unsplash.com\/photos/g, 
                                                "/api/Unsplash/photos")}
                                         />
                                    <ImageListItemBar 
                                        position="bottom"
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
                                        }
                                        sx={{display: this.state.selected === item.id ? "show" : "none"}} />
                                </ImageListItem>
                            ))}
                        </ImageList>
                    </Grid>
                </Grid>
                }
                { this.state.itemData.length === 0 &&
                <Grid item >
                    <Typography variant="h6" color="textSecondary" align="center">
                        {AppConst.getMessageById(AppConst.MSG102.getId())?.getMessage()}
                    </Typography>
                </Grid>
                }
            </Grid>
        );
    }
}