import React from 'react';

import { Container, Box, Link, Typography, Stack } from '@mui/material';

import FriendList from './components/avatar/FriendList';
import TimeLine from './components/timeline/TimeLine';
import Home from './components/home/Home';
import InsightManager from './components/insight/InsightManager';
import SettingManager from './components/setting/SettingManager';
import MenuAppBar from './components/appBar/MenuAppBar';
import RelationManager from './components/friends/RelationManager';
import Privacy from './components/setting/Privacy';
import Profile from './components/setting/Profile';
import Password from './components/setting/Password';
import Terms from './components/terms/Terms';
import Message from './components/shared/Message';

import './components/shared/Common.scss';
import AppConst from './components/shared/AppConst';
import ErrorBoundary from './components/shared/ErrorBoundary';

import getYear from 'date-fns/getYear'

import { requireAuth, withRouter, withAppData } from './context/props';
import { Routes, Route, Navigate } from "react-router-dom";

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.box = React.createRef();
        this.state = {
            openTermsDialog: false,
            scrollPosition: 0
        };
        this.handleTermsOnClick = this.handleTermsOnClick.bind(this);
        this.isScrollBottom = this.isScrollBottom.bind(this);
    }
    handleTermsOnClick(url) {
        this.setState({openTermsDialog : true});
    }
    isScrollBottom() {
        const box = this.box.current;
        return Math.abs(box.scrollHeight - box.clientHeight - box.scrollTop) < 1;
    }
    setFillHight() {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }
    componentWillUnmount() {
        window.removeEventListener('resize', this.setFillHight, true);
    }
    componentDidMount() {
        this.setFillHight();
        window.addEventListener('resize', this.setFillHight, true);
    }
    render() {
        const {showfriends, location} = this.props.router;
        const containerStyle = {
            display: "flex",
            flexDirection: "column",
            height: "100%",
            fontFamily: "Inter",
        }
        const boxHeaderStyle = {
            height: { xs: 80, sm: 80, md: 110 },
            flexShrink: 0,
            marginBottom: { xs: 0, sm: 0, md: 2 },
        }
        const boxBodyStyle = {
            // xs,sm = 99% - header[80px] - footer[30px(height + marginTop + marginBottom)]
            // md = 97% - header[110px] - footer[30px(height + marginTop + marginBottom)]
            height: { xs: "calc(99% - 80px - 30px)", sm: "calc(99% - 80px - 30px)", md: "calc(99% - 110px - 30px)" }, 
            display: "flex",
            flexDirection: { xs:"column-reverse" , sm: "column-reverse", md: "row" }, 
        }
        const boxBodyMainStyle = {
            display: "flex",
            flex: { xs:"" , sm: "", md: "11 1 500px" },
            minHeight: showfriends ? { xs: "calc(100% - 122px)", sm: "calc(100% - 122px)", md: "100%" } : "100%",
            flexDirection: "column",
            overflow: "hidden",
            ">*" : {
                minHeight: showfriends ? { xs: "calc(100% - 122px)", sm: "calc(100% - 122px)", md: "100%" } : "100%",
            },
            "&:hover": {
                overflowY: "scroll"
            }
        }
        const boxBodyFriendListStyle = {
            flex: { xs:"" , sm: "", md: "1 0 290px" },
            minHeight: showfriends ? { xs: "122px", sm: "122px", md: "90%" } : 0,
            overflowX: { xs: "auto", sm: "auto", md: "hidden" },
            overflowY: { xs: "hidden", sm: "hidden", md: "auto" },
            paddingRight: { xs: 0, sm: 0, md: 2 },
            paddingLeft: { xs: 0, sm: 0, md: 2 },
            boxSizing: "border-box"
        }
        const boxFooterStyle = {
            width: "100%",
            height: "26px",
            marginTop: "1px",
            marginBottom: "3px",
            boxSizing: "border-box",
        }
        return(
            <Container maxWidth="xl" sx={containerStyle}>
                <Box aria-label="app header" sx={boxHeaderStyle}>
                    <MenuAppBar />
                </Box>
                <Box aria-label="app body" sx={boxBodyStyle} >
                    <Box aria-label="main view" ref={this.box} sx={boxBodyMainStyle} >
                        <Routes>
                            {/* <Route path="/*" element={<Navigate to={`/${AppConst.HOME.getLabel()}`} replace />} /> */}
                            {/* <Route path={`/${AppConst.HOME.getLabel()}/*`} element={
                                <Typography variant="h5" >
                                    {location.pathname} is not found
                                </Typography>
                            } /> */}
                            <Route path={`/${AppConst.HOME.getLabel()}`} element={
                                <Navigate replace={false} to={`/${AppConst.MOOD.getLabel()}/${this.props.loginuser}`} />
                            } />
                            <Route path={`/${AppConst.MOOD.getLabel()}/:userId`} element={<Home key={location.pathname}/>} />
                            <Route path={`/${AppConst.TIMELINE.getLabel()}`} element={
                                <TimeLine isScrollBottom={this.isScrollBottom}/>
                            } />
                            <Route path={`/${AppConst.INSIGHT.getLabel()}`} element={
                                <InsightManager />
                            } />
                            <Route path={`/${AppConst.RELATION.getLabel()}`} element={<RelationManager />} />
                            <Route path={`/${AppConst.SETTING.getLabel()}`} element={<SettingManager />} />
                            <Route 
                                path={`/${AppConst.SETTING.getLabel()}/${AppConst.PRIVACY.getLabel()}`} 
                                element={<ErrorBoundary><Privacy /></ErrorBoundary>} />
                            <Route 
                                path={`/${AppConst.SETTING.getLabel()}/${AppConst.PROFILE.getLabel()}`} 
                                element={<ErrorBoundary><Profile /></ErrorBoundary>} />
                            <Route 
                                path={`/${AppConst.SETTING.getLabel()}/${AppConst.PASSWORD.getLabel()}`} 
                                element={<Password />} />
                            <Route 
                                path={`/${AppConst.SETTING.getLabel()}/${AppConst.INFO.getLabel()}`} 
                                element={<span>The Page "Info" is not ready</span>} />
                            <Route path={`/${AppConst.ABOUTUS.getLabel()}`} element={<span>The Page "About us" is not ready</span>} />
                        </Routes>
                    </Box>
                    <Box 
                        aria-label="friend user list" 
                        sx={boxBodyFriendListStyle}>
                        <FriendList />
                    </Box>
                </Box>
                <Box aria-label="app footer" sx={boxFooterStyle}>
                    <Stack direction="row" spacing={3} sx={{width:"100%"}} justifyContent="flex-end">
                        <Typography variant="subtitle1">2023-{getYear(new Date())} {`©️${AppConst.APP_TITLE.getLabel()}`}</Typography>
                        <Link 
                            variant="subtitle1" 
                            color="inherit"
                            underline="hover"
                            onClick={()=>{alert("I'm not ready ")}} >
                            about
                        </Link>
                        <Link 
                            variant="subtitle1" 
                            color="inherit"
                            underline="hover"
                            onClick={this.handleTermsOnClick} >
                            terms
                        </Link>
                        <Terms open={this.state.openTermsDialog} closeDialog={() => {this.setState({openTermsDialog : false}); }} />
                    </Stack>
                </Box>
                <Message />
            </Container>
        );
    }
}
const ComponentAfterAuthChecked = requireAuth(Main);
const ComponentWithAppData = withAppData(ComponentAfterAuthChecked);
export default withRouter(ComponentWithAppData);