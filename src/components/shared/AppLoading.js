import React from 'react';

import { Box, Stack, Typography } from '@mui/material';

// import { withRouter, withAppData } from '../../context/props';
import Void from '../mood/icon/Void';
import AppConst from './AppConst';

class AppLoading extends React.Component {
    // componentDidMount() {
    //     let loading = setInterval(() => {
    //         // appdataのロード完了
    //         if( this.props.appdata.auth.user
    //          && this.props.appdata.user.users 
    //         //  && this.props.appdata.user.targetUser 
    //          && this.props.appdata.mood.moods ) {
    //             clearInterval(loading);
    //             // this.props.appdata.auth.endLoading();
    //             // オプショナルチェーンでNullishを回避, stateのfromが未設定の場合HOMEへ遷移
    //             let from = this.props.router.location?.state?.from.pathname || "/" + AppConst.HOME.getLabel();
    //             this.props.router.navigate(from, { replace: true });
    //         }
    //     }, 500);
    // }
    render(){
        return (
            <Box top={0} left={0} bottom={0} right={0} position="absolute" 
                display="flex" alignItems="center" justifyContent="center">
                <Stack direction="column" spacing={3} sx={{width:"100%"}} alignItems="center">
                    <Void />
                    <Typography variant="body1">{`©️${AppConst.APP_TITLE.getLabel()}`}</Typography>
                </Stack>
            </Box>
        );
    }
}
// const ComponentWithAppData = withAppData(AppLoading);
// export default withRouter(ComponentWithAppData);
export default AppLoading;