import React from 'react';
import axiosInstance from '../../axios/axiosInstance';

import { Grid, List, Divider, TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

import UserListItem from './UserListItem';
import AppConst from '../shared/AppConst';
import { withAppData } from '../../context/props';


class UserList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            search: '',
            timer: '',
            users: [],
        };
        this.setUsers = this.setUsers.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
    } 
    setUsers(users) {
        this.setState({users: users});
    }
    handleTextChange(e) {
        if(this.state.timer) clearTimeout(this.state.timer);
        let timer = setTimeout(() => {
            if(e.target.value){
                axiosInstance.get(`/api/user/search/${e.target.value}`)
                .then(res => {
                    this.setState({users: res.data});
                });
            } else {
                this.setState({users: []});
            }
            this.setState({timer: null});
        }, 400);

        this.setState( {
            search : e.target.value,
            timer : timer
        } );
    }
    componentDidMount(){
        let url = "";
        
        switch( this.props.variant ) {
            case AppConst.REQUESTS.getLabel():
                url = `/api/user/${this.props.loginuser}/requester`;
                break;
            case AppConst.MY_FRIENDS.getLabel():
                url = `/api/user/${this.props.loginuser}/friends`;
                break;
            case AppConst.VIEWERS.getLabel():
                url = `/api/mood/${this.props.moodId}/view`;
                break;
            case AppConst.FAVORITES.getLabel():
                url = `/api/mood/${this.props.moodId}/favorite`;
                break;
            default:
                url = "";
        }
        if(url){
            axiosInstance.get(url).then(res => {
                if(res.status !== 403){
                    this.setState({users: res.data});
                } else {
                    this.setState({users: []});
                }
            });
        } else {
            this.setState({users: []});
        }

    }
    render(){
        const style = {
            search: {
                margin: 8,
                width: "18em",
            }
        };
        const ListItem = [];
        this.state.users.map((user, index) => {
            ListItem.push( 
                <UserListItem 
                    user={user}
                    search={this.state.search}
                    setUsers={this.setUsers} 
                    variant={this.props.variant} 
                    key={`item${index}`} />
            );
            if(this.state.users.length - 1 !== index){
                ListItem.push( 
                    <Divider variant="inset" component="li" key={`divider${index}`} />
                )
            }
            return user;
        });
        return (
            <Grid container direction="column" justifyContent="center">
                { AppConst.ADD_FRIENDS.getLabel() === this.props.variant &&
                <Grid item container justifyContent="center">
                    <TextField 
                        autoFocus
                        id="search_user" 
                        label="Search by User ID or Name" 
                        size="small"
                        variant="outlined"
                        style={style.search}
                        onChange={this.handleTextChange}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <SearchIcon/>
                                </InputAdornment>
                            )
                        }}/>
                </Grid>
                }
                <Grid item xs>
                    <List>{ListItem}</List>
                </Grid>
            </Grid>
        );
    }
}

export default withAppData(UserList);