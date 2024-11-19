import React from 'react';

import { Snackbar, Alert } from '@mui/material';

import { withAppData } from '../../context/props'; 
import AppConst from './AppConst';

class Message extends React.Component {
    render() {
        const {message} = {...this.props.appdata};
        return ( 
            <Snackbar 
                open={message.msgOpen} 
                autoHideDuration={6000} 
                onClose={message.handleMsg.bind(this, null)}>
                <Alert 
                    onClose={message.handleMsg.bind(this, null)} 
                    severity={AppConst.getMessageById(message.msgId)?.getMessageType()}
                    sx={{ width: '100%' }} >
                        {AppConst.getMessageById(message.msgId)?.getMessage()}
                </Alert>
            </Snackbar>
        );
    }
}
export default withAppData(Message);