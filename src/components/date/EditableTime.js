import React from 'react';

import { Typography, TextField } from '@mui/material';
import parseISO from 'date-fns/parseISO'
import parse from 'date-fns/parse'
import isAfter from 'date-fns/isAfter'
import format from 'date-fns/format'
import formatISO from 'date-fns/formatISO'

import AppConst from '../shared/AppConst';
import { withAppData } from '../../context/props';

class EditableTime extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            time: "",
            parseErr: false,
        }
        this.handleTimeOnChange = this.handleTimeOnChange.bind(this);
    }
    handleTimeOnChange(time) {
        const date = parse(time, AppConst.FORMAT_TIME_2, new Date()); // 協定世界時 (UTC) の 1970 年 1 月 1 日からの経過ミリ秒数
        const isoDateString = formatISO(date); // タイムゾーン指定子なしのISO 8601形式の日時(UTC)
        if(isAfter(parseISO(isoDateString), parseISO(this.props.refdate) )){
            this.props.setEndAt(isoDateString);
            this.setState({time: time});
        } else {
            this.props.appdata.message.handleMsg(AppConst.MSG404.getId());
        }
    }
    componentDidMount() {
        let formatDate = "";
        let isoDate = this.props.date;
        try{
            if( !(this.props.date instanceof Date) ){
                isoDate = parseISO(this.props.date);
            }
            formatDate = format( isoDate, AppConst.FORMAT_TIME_2 );
        } catch(e) {
            this.setState({parseErr: true});
        } finally {
            this.setState({time: formatDate});
        }
    }
    render() {
        if(this.state.parseErr){
            return <Typography>invalid datetime</Typography>
        }
        return (
            <TextField
                id="endAt"
                type="time"
                value={this.state.time}
                InputLabelProps={{shrink: true,}} 
                onChange={(e)=>{ this.handleTimeOnChange(e.target.value) }} /> 
        );
    }
}

export default withAppData(EditableTime);