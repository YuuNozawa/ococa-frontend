import React from 'react';

import { Typography } from '@mui/material';

import differenceInMinutes from 'date-fns/differenceInMinutes'
import differenceInHours from 'date-fns/differenceInHours'
import differenceInDays from 'date-fns/differenceInDays'


export default class DifferenceTime extends React.Component {
    getDispTime() {
        const diffDays = differenceInDays(this.props.later, this.props.earlier);
        const diffHours = differenceInHours(this.props.later, this.props.earlier);
        const diffMin = differenceInMinutes(this.props.later, this.props.earlier);
        if(diffDays > 1) return `(${diffDays} Days)`
        if(diffHours > 0) return `(${diffHours} H)`
        return `(${diffMin} Min)`
    }

    render(){
        return (
            <Typography {...this.props}>
                {this.getDispTime()}
            </Typography>
        );
    }
}