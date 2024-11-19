import React from 'react';

import { Button } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import AppConst from '../components/shared/AppConst';
import { UserContext } from './UserContext';
import { MoodContext } from './MoodContext';
import { AuthContext } from './AuthContext';
import { MessageContext } from './MessageContext';
import { useLocation, useNavigate, useParams, Navigate } from "react-router-dom";

import { signoutRedirect } from '../service/AuthService';

function useAuth(){
    return React.useContext(AuthContext);
}

function useUser(){
    return React.useContext(UserContext);
}

function useMood(){
    return React.useContext(MoodContext);
}

function useMessage(){
    return React.useContext(MessageContext);
}

export function withAppData(Component) {
    function ComponentWithAppDataProp(props) {
        let user = useUser();
        let auth = useAuth();
        let mood = useMood();
        let message = useMessage();

        return( <Component {...props} appdata={{ user, auth, mood, message }} loginuser={auth.user} /> );
    }
    return ComponentWithAppDataProp;
}

export function withRouter(Component) {
    function ComponentWithRouterProp(props) {
        let location = useLocation();
        let navigate = useNavigate();
        let params = useParams();

        const showFriends = () => {
            const regex = new RegExp('/Mood/.*'); 
            const isMood = regex.test(location.pathname); 
            const isHome = location.pathname === `/${AppConst.HOME.getLabel()}`
            // show when path is Mood or Home
            if(isMood || isHome) return true;
            return false;
        }
        const showfriends=showFriends();
        
        return( <Component {...props} router={{ location, navigate, params, showfriends }}/> );
    }
    return ComponentWithRouterProp;
}
export function withTheme(Component) {
    function ComponentWithThemeProp(props) {
        let theme = useTheme();
        const isLg = useMediaQuery(theme.breakpoints.up('lg'));
        const isMd = useMediaQuery(theme.breakpoints.up('md'));
        const isSm = useMediaQuery(theme.breakpoints.up('sm'));
        const isXs = useMediaQuery(theme.breakpoints.up('xs'));

        const getValByMedia = (styleAry) => {
            const {lg, md, sm, xs} = styleAry;
            let val = null;
            if(isLg) { val = lg ? lg : ""; }
            else if(isMd) { val = md ? md : ""; }
            else if(isSm) { val = sm ? sm : ""; }
            else if(isXs) { val = xs ? xs : ""; }
            return val;
        }
        
        // ここはmui/stylesのuninstall以前からコメント
        // const getCurrentBreakPoint = () => {
        //     let val = null;
        //     if(isLg) { val = "lg"; }
        //     else if(isMd) { val = "md"; }
        //     else if(isSm) { val = "sm"; }
        //     else if(isXs) { val = "xs"; }
        //     return val;
        // }
        //gcbp={getCurrentBreakPoint}
        // ここはmui/stylesのuninstall以前からコメント

        return( <Component {...props} gvbm={getValByMedia} theme={{ theme }}/> );

    }
    return ComponentWithThemeProp;
}
export function requireAuth(Component) {
    function ComponentAfterAuthChecked(props) {
        let location = useLocation();
        let auth = useAuth();

        if(!auth.user){
            return <Navigate to={`/${AppConst.LOGIN.getLabel()}`} state={{ from: location }} replace />;
        }
        return( <Component {...props} /> );
    }
    return ComponentAfterAuthChecked;
}
export function SignOut(props){
    let auth = useAuth();
    let navigate = useNavigate();
    if(!auth.user){
        return(
            <Button variant="text" {...props} startIcon={<LoginIcon />} onClick={()=>{navigate("/" + AppConst.LOGIN.getLabel());}} >
                Signin
            </Button>
        );
    }
    return(
        <Button variant="text" {...props} startIcon={<LogoutIcon />} onClick={signoutRedirect} >
            Signout
        </Button>
    );
}