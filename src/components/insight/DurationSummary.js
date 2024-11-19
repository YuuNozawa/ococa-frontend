import React from 'react';

import { Typography } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import StorageIcon from '@mui/icons-material/Storage';

import differenceInMinutes from 'date-fns/differenceInMinutes'
import minutesToHours from 'date-fns/minutesToHours'
import parseISO from 'date-fns/parseISO'

import AppConst from '../shared/AppConst';
import { withAppData } from '../../context/props'; 

class DurationSummary extends React.Component {
    getCount(emotionId) {
        let count = 0;
        if(this.props.mode === AppConst.TOTAL_TIME){
            count = this.props?.moods?.filter(m => m.emotionId === emotionId)?.reduce((prev, curr) => {
                    //if(!curr.endAt){ return prev; }
                    const date = curr.endAt ? parseISO(curr.endAt) : new Date()
                    return prev + differenceInMinutes(date, parseISO(curr.startAt));
                }, 0);
            count = (count > 119) ? `${minutesToHours(count)} H` : `${count} Min`;
        } else {
            count = this.props.moods?.filter(m => m.emotionId === emotionId).length;
        }
        return count;
    }
    render() {
        return ( 
            <>
                <Typography variant="h5" gutterBottom >
                {this.props.mode === AppConst.TOTAL_TIME &&
                    <><AccessTimeIcon /> Total time</>
                }
                {this.props.mode === AppConst.TOTAL_RECORDS &&
                    <><StorageIcon /> Total records</>
                }
                </Typography>
                <Typography variant="h6">
                    {AppConst.getSingleEmo(AppConst.ANGER.getId(), 1)} : 
                    {this.getCount(AppConst.ANGER.getId())}
                </Typography>
                <Typography variant="h6">
                    {AppConst.getSingleEmo(AppConst.SADNESS.getId(), 1)} : 
                    {this.getCount(AppConst.SADNESS.getId())}
                </Typography>
                <Typography variant="h6">
                    {AppConst.getSingleEmo(AppConst.FEAR.getId(), 1)} : 
                    {this.getCount(AppConst.FEAR.getId())}
                </Typography>
                <Typography variant="h6">
                    {AppConst.getSingleEmo(AppConst.JOY.getId(), 1)} : 
                    {this.getCount(AppConst.JOY.getId())}
                </Typography>
            </>
        );
    }
}
export default withAppData(DurationSummary);