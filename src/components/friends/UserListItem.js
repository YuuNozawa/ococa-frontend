import React from 'react';
import axiosInstance from '../../axios/axiosInstance';

// Components
import { ListItem, ListItemText, ListItemAvatar, ListItemSecondaryAction, Avatar, Typography, Fab } from '@mui/material';
import DoneIcon from '@mui/icons-material/Done'
import CloseIcon from '@mui/icons-material/Close';
// Styles

// External
import AppConst from '../shared/AppConst';
import { withAppData } from '../../context/props';


class UserListItem extends React.Component {
    constructor(props) {
        super(props);
        this.handleRequestBtnOnClick = this.handleRequestBtnOnClick.bind(this);
        this.handleCancelBtnOnClick = this.handleCancelBtnOnClick.bind(this);
        this.handleConfirmBtnOnClick = this.handleConfirmBtnOnClick.bind(this);
        this.handleDeclineBtnOnClick = this.handleDeclineBtnOnClick.bind(this);
    } 
    async newRequest(target) {
        try {
            const upsert = await axiosInstance.post('', {
                "userId": this.props.loginuser,
                "target": target
            });
            if(upsert.status === 500) console.error("リクエストに失敗しました。ステータス：" + upsert.status);

            const res = await axiosInstance.get(`/api/user/search/${this.props.search}`);
            if( res.data ) {
                this.props.setUsers( res.data );
            }

        } catch(err) {
            console.error(err);
        }
    }
    async cancelRequest(userId) {
        try {
            const cancel = axiosInstance.delete(`/api/relation/request/cancel/${userId}`);
            if(cancel.status === 500) console.error("リクエストのキャンセルに失敗しました。ステータス：" + cancel.status);

            const res = await axiosInstance.get(`/api/user/search/${this.props.search}`);
            if( res.data ) this.props.setUsers( res.data );

        } catch(err) {
            console.error(err);
        }
    }
    async confirmRequest(target) {
        try {
            const confirm = await axiosInstance.post('/api/relation/request/confirm', {
                "userId": target
            });
            if(confirm.status === 500) console.error("リクエストの許可に失敗しました。ステータス：" + confirm.status);

            const res = await axiosInstance.get(`/api/user/${this.props.loginuser}/requester`);
            if( res.data ) this.props.setUsers( res.data );

        } catch(err) {
            console.error(err);
        }
    }
    async declineRequest(userId) {
        try {
            const decline = axiosInstance.delete(`/api/relation/request/decline/${userId}`);
            if(decline.status === 500) console.error("リクエストの却下に失敗しました。ステータス：" + decline.status);

            const res = await axiosInstance.get(`/api/user/${this.props.loginuser}/requester`);
            if( res.data ) this.props.setUsers( res.data );

        } catch(err) {
            console.error(err);
        }
    }
    async deleteFriend(userId) {
        try {
            const del = axiosInstance.delete(`/api/relation/friend/${userId}`);
            if(del.status === 500) console.error("フレンドの削除に失敗しました。ステータス：" + del.status);

            const res = await axiosInstance.get(`/api/user/${this.props.loginuser}/friends`);
            if( res.data ) this.props.setUsers( res.data );

        } catch(err) {
            console.error(err);
        }
    }
    handleRequestBtnOnClick(target) {
        this.newRequest(target);
    }
    handleCancelBtnOnClick(userId) {
        this.cancelRequest(userId);
    }
    handleConfirmBtnOnClick(target) {
        this.confirmRequest(target);
    }
    handleDeclineBtnOnClick(userId) {
        this.declineRequest(userId);
    }
    handleDeleteBtnOnClick(userId) {
        this.deleteFriend(userId);
    }
    render(){
        const {user, variant} = this.props;
        let fab;
        if( variant === AppConst.ADD_FRIENDS.getLabel() ) {
            if( user.isFriend ) {
                fab = <Typography variant="body2" color="primary">friend user</Typography>
            } else if( user.userId !== this.props.loginuser ) {
                fab = (
                    <Fab
                        variant="extended"
                        size="small"
                        color="primary"
                        aria-label="request"
                        onClick={
                            user.isRequested
                            ? this.handleCancelBtnOnClick.bind(this, user.userId)
                            : this.handleRequestBtnOnClick.bind(this, user.userId)
                        }>
                        { user.isRequested ? "cancel" : "request"}
                    </Fab>
                );
            }
        } else if( variant === AppConst.REQUESTS.getLabel() ) {
            fab = (
                <React.Fragment>
                    <Fab
                        variant="extended"
                        size="small"
                        color="primary"
                        aria-label="request"
                        onClick={this.handleConfirmBtnOnClick.bind(this, user.userId)}>
                        <DoneIcon />
                    </Fab>
                    <Fab
                        variant="extended"
                        size="small"
                        color="secondary"
                        aria-label="request"
                        onClick={this.handleDeclineBtnOnClick.bind(this, user.userId)}>
                        <CloseIcon />
                    </Fab>
                </React.Fragment>
            );
        } else if( variant === AppConst.MY_FRIENDS.getLabel() ) {
            fab = (
                <Fab
                    variant="extended"
                    size="small"
                    color="primary"
                    aria-label="request"
                    onClick={this.handleDeleteBtnOnClick.bind(this, user.userId)}
                >DELETE</Fab>
            );
        }
        return (
            <ListItem alignItems="flex-start" key={user.userId}>
                <ListItemAvatar>
                    <Avatar style={{backgroundColor: user.color}}>{user.icon}</Avatar>
                </ListItemAvatar>
                <ListItemText
                    style={{paddingRight: "50px"}}
                    primary={user.userName}
                    secondary={
                        `@${user.userId} ${user.bio ? " — " + user.bio : " — Hello."}`
                    }
                />
                <ListItemSecondaryAction>{fab}</ListItemSecondaryAction>
            </ListItem>
        );
    }
}

export default withAppData(UserListItem);