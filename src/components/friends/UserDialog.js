import React from 'react';

import { Dialog, DialogTitle, DialogContent, Zoom } from '@mui/material';

import UserList from './UserList';
import AppConst from '../shared/AppConst';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Zoom style={{ transitionDelay: props.open ? '500ms' : '300ms' }} ref={ref} {...props}  />;
});
export default class UserDialog extends React.Component {
    render(){
        let Icon, Title;
        switch( this.props.variant ) {
            case AppConst.VIEWERS.getLabel():
                Icon = AppConst.VIEWERS.getIcon({sx:{verticalAlign: "middle", fontSize: 35, marginRight: 1}});
                Title = AppConst.VIEWERS.getLabel();
                break;
            case AppConst.FAVORITES.getLabel():
                Icon = AppConst.FAVORITES.getIcon({sx:{verticalAlign: "middle", fontSize: 35, marginRight: 1}});
                Title = AppConst.FAVORITES.getLabel();
                break;
            default:
                Icon = null;
                Title = null;
        }
        return (
            <Dialog 
                open={this.props.open} 
                scroll='paper' 
                TransitionComponent={Transition} 
                onClose={this.props.closeDialog}
                sx={{minWidth: 200, minHeight: 200}} >
                <DialogTitle sx={{fontSize: "1.75em"}} >
                    {Icon}{Title}
                </DialogTitle>
                <DialogContent>
                    <UserList variant={this.props.variant} moodId={this.props.moodId} />
                </DialogContent>
            </Dialog>
        );
    }
}