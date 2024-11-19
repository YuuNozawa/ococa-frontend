import React from 'react';

import CircleIcon from '@mui/icons-material/Circle';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import SpaIcon from '@mui/icons-material/Spa';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import WorkIcon from '@mui/icons-material/Work';
import HomeIcon from '@mui/icons-material/Home';

import AppConst from './AppConst';

export default class TagIcon extends React.Component {
    render(){
        switch( this.props.tagid ) {
            case AppConst.TAG01.getId():
                return (<SupervisedUserCircleIcon {...this.props} />);
            case AppConst.TAG02.getId():
                return (<SpaIcon {...this.props} />);
            case AppConst.TAG03.getId():
                return (<TravelExploreIcon {...this.props} />);
            case AppConst.TAG04.getId():
                return (<WorkIcon {...this.props} />);
            case AppConst.TAG05.getId():
                return (<HomeIcon {...this.props} />);
            default:
                return (<CircleIcon {...this.props} />);
        }

    }
}