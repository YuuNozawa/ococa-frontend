import React from 'react';

import { Typography } from '@mui/material';

import differenceInMinutes from 'date-fns/differenceInMinutes'
import differenceInHours from 'date-fns/differenceInHours'
import differenceInDays from 'date-fns/differenceInDays'

export default class MinuteTimer extends React.Component {
    constructor(props) {
        super(props);
        this.state = { time: null };
    }
    tick() {
        this.setState({time: new Date()});
    }
    getDispTime() {
        const diffDays = differenceInDays(this.state.time, this.props.earlier);
        const diffHours = differenceInHours(this.state.time, this.props.earlier);
        const diffMin = differenceInMinutes(this.state.time, this.props.earlier);
        if(diffDays > 1) return `(since ${diffDays} Days ago)`
        if(diffHours > 0) return `(since ${diffHours} Hours ago)`
        return `since (${diffMin} Minutes ago)`
    }
    componentWillUnmount() {
        clearInterval(this.timerID);
    }
    componentDidMount() {
        this.setState({time: this.props.startAt});
        this.timerID = setInterval(() => this.tick(), 1000);
    }
    render(){
        return (
            <Typography {...this.props}>
                {this.getDispTime()}
            </Typography>
        );
    }
}