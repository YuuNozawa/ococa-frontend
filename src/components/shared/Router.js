import React from 'react';

import Signup from '../login/Signup';
import Login from '../login/Login';
import AppLoading from '../shared/AppLoading';
import Callback from './Callback';
import LogoutCallback from './LogoutCallback';
import Main from '../../Main';
import AppConst from './AppConst';
import { getUser } from '../../service/AuthService';
import { withRouter, withAppData } from '../../context/props';

import { Routes, Route } from "react-router-dom";

class Router extends React.Component {
    async componentDidMount() {
        try {
            const user = await getUser();
            if (user && !user.expired) {
              this.props.appdata.auth.setUser(user.profile.sub);
              await this.props.appdata.user.getUsers(user.profile.sub);
              await this.props.appdata.mood.getMood(user.profile.sub);
              await this.props.appdata.mood.getMoodStatus();
            } else {
                this.props.appdata.auth.setUser(null);
            }
            this.props.appdata.auth.setLoading(false);
        } catch (error) {
            console.error('ユーザー情報の読み込みエラー:', error);
            this.props.appdata.auth.setUser(null);
            this.props.appdata.auth.setLoading(false);
        }
    }
    render() {
        const { location } = this.props.router;
        if(this.props.appdata.auth.loading){
            return <AppLoading />;
        }

        if( location.pathname.match( AppConst.LOGIN.getLabel() ) ) {
            return(
                <Routes>
                    <Route path={`/${AppConst.LOGIN.getLabel()}`} element={<Login />} />
                </Routes>
            );
        } else if( location.pathname.match( AppConst.SIGNUP.getLabel() ) ) {
            return(
                <Routes>
                    <Route path={`/${AppConst.SIGNUP.getLabel()}`} element={<Signup />} />
                </Routes>
            );
        } else if( location.pathname.match( AppConst.CALLBACK.getLabel() ) ) {
            return(
                <Routes>
                    <Route path={`/${AppConst.CALLBACK.getLabel()}`} element={<Callback />} />
                </Routes>
            );
        } else if( location.pathname.match( AppConst.LOGOUT.getLabel() ) ) {
            return(
                <Routes>
                    <Route path={`/${AppConst.LOGOUT.getLabel()}`} element={<LogoutCallback />} />
                </Routes>
            );
        } else {
            return <Main />;
        }
    }
}
const ComponentWithAppData = withAppData(Router);
export default withRouter(ComponentWithAppData);