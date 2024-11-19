import React from 'react';

import { Typography } from '@mui/material';

import parseISO from 'date-fns/parseISO'
import formatRelative from 'date-fns/formatRelative'

// Styles

// External
import { withAppData } from '../../router';

class RelativeTime extends React.Component {
    render(){
        let relativeTime = "";
        const isoDate = this.props.date;
        try{
            if( !(this.props.date instanceof Date) ){
                isoDate = parseISO(this.props.date);
            }
            relativeTime = formatRelative( isoDate );
        } catch(e) {
            relativeTime = "";
        } finally {
            return(
                <Typography variant="body2" style={this.props.style}>{relativeTime}</Typography>
            );
        }
    }
}

export default withAppData(RelativeTime);