import React from 'react';

import { List, ListItem, ListItemAvatar, ListItemText, ListSubheader, Divider, AvatarGroup, Avatar } from '@mui/material';

import Eyebrow from './Eyebrow';
import '../shared/Common.scss';
import AppConst from '../shared/AppConst';

import { requireAuth, withRouter, withAppData } from '../../context/props'; 


class FriendList extends React.Component {
    constructor(props) {
        super(props);
        this.handleItemOnClick = this.handleItemOnClick.bind(this);
    }
    handleItemOnClick(userId) {
        this.props.router.navigate(`/${AppConst.MOOD.getLabel()}/${userId}`);
    }
    render() {
        const listStyle = {
            display: { xs: "flex", sm: "flex", md: "block" },
        }
        const listSubHeaderStyle = {
            fontSize: "1.25rem", 
            zIndex: 1, 
            display: { xs: "none", sm: "none", md: "block" }
        }
        const listItemStyle = {
            flexDirection: { xs: "column", sm: "column", md: "row" },
            justifyContent: { xs: "center", sm: "center", md: "flex-start" },
            paddingBottom: { xs: 0, sm: 0 },
            "&:hover": { 
                backgroundColor: "#FAA828", 
                cursor: "pointer"
            }
        }
        const listItemAvatarStyle = {
            position: "relative",
            marginRight: { xs:0 , sm: 0, md: 1 },
        }
        const avatarStyle = {
            color: "black",
            width: 50,
            height: 50
        }
        const listItemTextStyle = {
            fontSize: { xs:"0.7em" , sm: "0.8em", md: "1em" }
        }
        const avatarGroupStyle = {
            '&.MuiAvatarGroup-root': {
                justifyContent:"flex-end"
            },
            '& .MuiAvatarGroup-avatar': {
                width: { xs:16, sm: 18, md: 21 }, 
                height: { xs:16, sm: 18, md: 21 }, 
                // fontSize: { xs:"0.4em" , sm: "0.6em", md: "0.8em" }
            }
        }
        const dividerStyle = {
            display: { xs: "none", sm: "none", md: "block" }
        }
        const {user, mood} = {...this.props.appdata};
        const listItems = [];
        user.users.map((u, index) => {
            const styledAvatar = {...avatarStyle};
            styledAvatar.backgroundColor = u.color;

            const avatar = [];
            mood.status.filter(s => s.userId === u.userId).map((s, index) => {
                avatar.unshift(
                    <Avatar key={`Status-${index}`} sx={{ backgroundColor: AppConst.getSingleColor(s.emotionId, s.moodLevel) }} > </Avatar>
                )
                return s;
            });
            listItems.push(
                <ListItem 
                    key={`moodListItems-${index}`} 
                    onClick={this.handleItemOnClick.bind(this, u.userId)} 
                    sx={listItemStyle}>
                    <ListItemAvatar sx={listItemAvatarStyle}>
                        <Eyebrow show={`/${AppConst.MOOD.getLabel()}/${u.userId}` === this.props.router.location.pathname}>
                            <Avatar sx={styledAvatar} >{u.icon}</Avatar>
                        </Eyebrow>
                    </ListItemAvatar>
                    <ListItemText 
                        disableTypography
                        sx={listItemTextStyle}
                        primary={u.userName.length > 19 ? u.userName.substring(0, 17) + ".." : u.userName} 
                        secondary={<AvatarGroup max={5} spacing={5} sx={avatarGroupStyle} >{avatar}</AvatarGroup>}
                    />
                </ListItem>
            );
            listItems.push(<Divider variant="inset" component="li" key={`divider${index}`} sx={dividerStyle}/>);
            return u;
        });
        return ( 
            <List 
                subheader= {<ListSubheader component="div" sx={listSubHeaderStyle}>Friends</ListSubheader>}
                sx={listStyle} >
                {listItems}
            </List> 
        );
    }
}
const ComponentAfterAuthChecked = requireAuth(FriendList);
const ComponentWithAppData = withAppData(ComponentAfterAuthChecked);
export default withRouter(ComponentWithAppData);