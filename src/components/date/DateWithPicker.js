import React from 'react';

import { Box, Link } from '@mui/material';

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { PickersDay } from '@mui/x-date-pickers/PickersDay';
import { DayCalendarSkeleton } from '@mui/x-date-pickers/DayCalendarSkeleton';

import { parseISO, isToday, isAfter, isSameDay, format } from 'date-fns'

import AppConst from '../shared/AppConst';
import { withAppData } from '../../context/props'; 

// Styles
import '../shared/Common.scss';

export class DateWithPicker extends React.Component {
    constructor(props) {
        super(props);
        this.box = React.createRef();
        this.state = {
            visible: false,
        };
        this.handleClickOutside = this.handleClickOutside.bind(this);
        this.handleDatePickerOnChange = this.handleDatePickerOnChange.bind(this);
        this.handleClickDate = this.handleClickDate.bind(this);
    }
    handleClickOutside(e) {
        if(!this.box.current || !this.box.current.contains(e.target)){
            this.setState({ visible: false });
        }
    }
    handleDatePickerOnChange(newDate) {
        this.props.setNewDate(newDate);
    }
    handleClickDate() {
        this.setState((prevState) => { 
            return ({visible: !prevState.visible});
        });
    }
    componentWillUnmount() {
        document.removeEventListener('click', this.handleClickOutside, true);
    }
    componentDidMount() {
        document.addEventListener('click', this.handleClickOutside, true);
    }
    render(){
        const style = {
            calendar:{
                zIndex: 1,
                backgroundColor: "#FFF",
                position: "absolute", 
                left: "-100px",
                boxShadow: "0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)",
                day: {
                    position: "relative",
                    badge: {
                        width: 10,
                        height:10,
                        borderRadius: "50%",
                        zIndex: 0,
                        position: "absolute",
                        right: "0%",
                        bottom: "3%",
                        boxSizing: "border-box",
                        boxShadow: "0 0 0 2px white",
                    },
                }
            }

        };
        return (
        <>
            <Link display="inline" variant="h6" color="textSecondary" onClick={this.handleClickDate}>
                {isToday(this.props.start) ? "Today" : format( this.props.start, AppConst.FORMAT_DATE2 )}
            </Link>
            { this.state.visible &&
                <Box style={style.calendar} ref={this.box}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <StaticDatePicker
                            value={this.props.start}
                            minDate={new Date('2020/01/01')}
                            disableFuture
                            displayStaticWrapperAs="desktop"
                            onChange={(newDate) => {this.handleDatePickerOnChange(newDate)}}
                            renderLoading={() => <DayCalendarSkeleton />}
                            renderDay={(day, selectedDays, pickersDayProps) => {
                                const marked = !pickersDayProps.outsideCurrentMonth &&
                                    this.props.appdata.mood.moods.some(m => isSameDay(parseISO(m.startAt), day));

                                const latestMood = this.props.appdata.mood.moods
                                    .filter(m => isSameDay(parseISO(m.startAt), day))
                                    ?.reduce((prev, curr) => {
                                        return isAfter(parseISO(prev.startAt), parseISO(curr.startAt)) ? prev : curr;
                                    }, {});

                                const styledBadge = {...style.calendar.day.badge};
                                styledBadge.backgroundColor = AppConst.getSingleColor(latestMood?.emotionId, latestMood?.moodLevel);
                                styledBadge.color = AppConst.getSingleColor(latestMood?.emotionId, latestMood?.moodLevel);

                                if(marked){
                                    return (
                                    <Box style={style.calendar.day} key={day}>
                                        <PickersDay {...pickersDayProps} />
                                        <Box className="Badge" style={styledBadge} />
                                    </Box>
                                    );
                                }

                                return(<PickersDay 
                                    // sx={{
                                    // "&.MuiButtonBase-root-MuiPickersDay-root": {
                                        // height: { xs: "15px", sm: "15px", md: "25px" },
                                        // width: { xs: "15px", sm: "15px", md: "25px" }
                                    // }
                                    // }} 
                                {...pickersDayProps} key={day} />);
                            }}/>
                    </LocalizationProvider>
                </Box>
            }
        </>
        );
    }
}

export default withAppData(DateWithPicker);