import React from 'react';

import { Typography } from '@mui/material';

import parseISO from 'date-fns/parseISO'
import format from 'date-fns/format'

export default class FormatTime extends React.Component {
    render(){
        let formatDate = "";
        let isoDate = this.props.date;
        try{
            if( !(this.props.date instanceof Date) ){
                isoDate = parseISO(this.props.date);
            }
            formatDate = format( isoDate, this.props.format );
        } catch(e) {
            formatDate = "";
        } finally {
            return(
                <Typography {...this.props} >
                    {formatDate}
                </Typography>
            );
        }
    }
}