import React from 'react';

import { Grid, ButtonGroup, Button, IconButton, Typography } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';

import { parseISO, format, startOfDay, endOfDay, startOfWeek, endOfWeek, startOfMonth, endOfMonth, 
    startOfYear, endOfYear, isToday, isThisWeek, isThisMonth,isThisYear, isBefore, isAfter, addDays, subDays, 
    addWeeks, subWeeks, addMonths, subMonths, addYears, subYears, differenceInDays } from 'date-fns'

import MoodDoughnut from './MoodDoughnut';
import DateWithPicker from '../date/DateWithPicker';
import CustomSwitch from './CustomSwitch';

import AppConst from '../shared/AppConst';
import { withAppData } from '../../context/props'; 

class InsightManager extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tabNo: 0,
            moods: null,
            start: new Date(),
            end: new Date(),
            amount: 0,
            mode: AppConst.TOTAL_TIME,
        };
        this.handleClickFuture = this.handleClickFuture.bind(this);
        this.handleClickPast = this.handleClickPast.bind(this);
        this.handleTabsOnChange = this.handleTabsOnChange.bind(this);
        this.handleSwitchOnChange = this.handleSwitchOnChange.bind(this);
        this.setNewDate = this.setNewDate.bind(this);
    }
    handleClickFuture() {
        this.setState((prevState) => { 
            const newAmount = ++prevState.amount;
            const start = this.getRangeStart(prevState.tabNo, newAmount);
            const end = this.getRangeEnd(prevState.tabNo, newAmount);
            const newMoods = this.props.appdata.mood.moods.filter(m => 
                m.userId === this.props.appdata.auth.user
             && isAfter(parseISO(m.createdAt), start)
             && isBefore(parseISO(m.createdAt), end));

            return ({
                moods: newMoods,
                start: start,
                end: end,
                amount: newAmount
            });
        });
    }
    handleClickPast() {
        this.setState((prevState) => { 
            const newAmount = --prevState.amount;
            const start = this.getRangeStart(prevState.tabNo, newAmount);
            const end = this.getRangeEnd(prevState.tabNo, newAmount);
            const newMoods = this.props.appdata.mood.moods.filter(m => 
                m.userId === this.props.appdata.auth.user
             && isAfter(parseISO(m.createdAt), start)
             && isBefore(parseISO(m.createdAt), end));

            return ({
                moods: newMoods,
                start: start,
                end: end,
                amount: newAmount
            });
        });
    }
    getRangeStart(tabNo, amount) {
        let start;
        switch (tabNo) {
            case 0:
                start = amount < 0 ? 
                  subDays(startOfDay( new Date() ) , Math.abs(amount))
                : addDays(startOfDay( new Date() ) , amount);
                break;
            case 1:
                start = amount < 0 ? 
                  subWeeks(startOfWeek( new Date(), { weekStartsOn: 1 } ) , Math.abs(amount))
                : addWeeks(startOfWeek( new Date(), { weekStartsOn: 1 } ) , amount);
                break;
            case 2:
                start = amount < 0 ? 
                  subMonths(startOfMonth( new Date() ) , Math.abs(amount))
                : addMonths(startOfMonth( new Date() ) , amount);
                break;
            case 3:
                start = amount < 0 ? 
                  subYears(startOfYear( new Date() ) , Math.abs(amount))
                : addYears(startOfYear( new Date() ) , amount);
                break;
            default: 
                break;
        }
        return start;
    }
    getRangeEnd(tabNo, amount) {
        let end;
        switch (tabNo) {
            case 0:
                end = amount < 0 ? 
                  subDays(endOfDay( new Date() ) , Math.abs(amount))
                : addDays(endOfDay( new Date() ) , amount);
                break;
            case 1:
                end = amount < 0 ? 
                  subWeeks(endOfWeek( new Date(), { weekStartsOn: 1 } ) , Math.abs(amount))
                : addWeeks(endOfWeek( new Date(), { weekStartsOn: 1 } ) , amount);
                break;
            case 2:
                end = amount < 0 ? 
                  subMonths(endOfMonth( new Date() ) , Math.abs(amount))
                : addMonths(endOfMonth( new Date() ) , amount);
                break;
            case 3:
                end = amount < 0 ? 
                  subYears(endOfYear( new Date() ) , Math.abs(amount))
                : addYears(endOfYear( new Date() ) , amount);
                break;
            default: 
                break;
        }
        return end;
    }
    handleTabsOnChange(newTabNo) {
        let newMoods = null;
        switch (newTabNo) {
            case 0:
                newMoods = this.props.appdata.mood.moods.filter(m => 
                    m.userId === this.props.appdata.auth.user
                 && isToday(parseISO(m.createdAt)));
                break;
            case 1:
                newMoods = this.props.appdata.mood.moods.filter(m => 
                    m.userId === this.props.appdata.auth.user
                 && isThisWeek(parseISO(m.createdAt), { weekStartsOn: 1 }));
                break;
            case 2:
                newMoods = this.props.appdata.mood.moods.filter(m => 
                    m.userId === this.props.appdata.auth.user
                 && isThisMonth(parseISO(m.createdAt)));
                break;
            case 3:
                newMoods = this.props.appdata.mood.moods.filter(m => 
                    m.userId === this.props.appdata.auth.user
                 && isThisYear(parseISO(m.createdAt)));
                break;
            default: 
                break;
        }
        this.setState({tabNo : newTabNo});
        this.setState({moods: newMoods});
        this.setState({amount: 0});
        this.setState({start: this.getRangeStart(newTabNo, 0)});
        this.setState({end: this.getRangeEnd(newTabNo, 0)});
    }
    handleSwitchOnChange() {
        this.setState((prevState) => { 
            if(prevState.mode === AppConst.TOTAL_RECORDS) {
                return ({mode: AppConst.TOTAL_TIME});
            }
            return ({mode: AppConst.TOTAL_RECORDS});
        });
    }
    setNewDate(newDate) {
        this.setState((prevState) => { 
            const newAmount = differenceInDays(newDate, endOfDay(new Date()));
            const start = this.getRangeStart(prevState.tabNo, newAmount);
            const end = this.getRangeEnd(prevState.tabNo, newAmount);
            const newMoods = this.props.appdata.mood.moods.filter(m => 
                m.userId === this.props.appdata.auth.user
             && isAfter(parseISO(m.createdAt), start)
             && isBefore(parseISO(m.createdAt), end));

             return ({
                moods: newMoods,
                start: start,
                end: end,
                amount: newAmount,
                showCal: false
            });
        });
    }
    componentDidMount(){
        const newMoods = this.props.appdata.mood.moods.filter(m => 
            m.userId === this.props.appdata.auth.user
         && isToday(parseISO(m.createdAt)));
        this.setState({moods: newMoods});
    }
    render() {
        const buttonGroupStyle = {
            borderRadius: 20, 
            '& > *': { p: 1 }
        }
        const gridContainerStyle = {
            flexDirection: "column",
            alignItems: "center",
            marginTop: 0,
            marginLeft: 0,
            width: "100%",
            height: "100%",
            ">.MuiGrid-item" : {
                width: "96%",
                paddingTop: { xs:2 , sm: 2, md: 5 },
                paddingLeft: 0,
            }
        }
        const gridButtonGroupStyle = {
            maxWidth: { xs:"100%", sm: "100%", md: "87%" },
            height: { xs:"60px", sm: "60px", md: "100px" },
            flex: "0 0 auto"
        }
        const gridDateBarStyle = {
            flexDirection: "row",
            justifyContent: "space-around",
            width: "100%",
            height: { xs:"50px", sm: "50px", md: "70px" },
            flex: "0 0 auto"
        }
        const gridDateStyle = {
            minWidth: "120px", 
            position: "relative",
            textAlign: "center",
        }
        const gridDateButtonStyle = {
            width: { xs:"30px", sm: "30px", md: "40px" },
            height: { xs:"30px", sm: "30px", md: "40px" },
        }
        const gridDoughnutStyle = {
            justifyContent: 'center',
            direction: "column",
            alignItems: "center",
            height: { xs:"150px", sm: "150px", md: "200px" },
            flex: "1 1 auto",
            ">*" : {
                maxHeight: "90vh",
                maxWidth: "90%"
            }
        }
        const gridOptionStyle = {
            justifyContent: 'center',
            height: { xs:"65px", sm: "65px", md: "90px" },
            flex: "0 0 auto",
            ">*" : {
                maxHeight: "100%"
            }
        }
        const timespan = AppConst.TIME_SPAN;
        const MenuItems = [];
        timespan.map( (menu, index) => {
            MenuItems.push(
                <Button
                    key={menu}
                    fullWidth
                    onClick={() => this.handleTabsOnChange(index)}
                    selected={this.state.tabNo === index}
                    size="medium" >
                    {menu}
                </Button>
            );
            return menu;
        });
        return(
            <Grid container spacing={3} sx={gridContainerStyle} aria-label="insight container grid">
                <Grid item sx={gridButtonGroupStyle}>
                    <ButtonGroup 
                        fullWidth
                        aria-label="insight time span bar" 
                        variant="contained" 
                        sx={buttonGroupStyle} >
                        {MenuItems}
                    </ButtonGroup>
                </Grid>
                <Grid item container sx={gridDateBarStyle} aria-label="insight date bar grid">
                    <Grid item >
                        <IconButton 
                            aria-label="navigation button to past" 
                            sx={gridDateButtonStyle}
                            onClick={this.handleClickPast}>
                            <NavigateBeforeIcon color="secondary" />
                        </IconButton>
                    </Grid>
                    <Grid item sx={gridDateStyle} >
                        {this.state.tabNo === 0 &&
                        <DateWithPicker 
                            start={this.state.start}
                            end={this.state.end}
                            setNewDate={this.setNewDate} />
                        }
                        <Typography display="inline" variant="h6" color="textSecondary">
                        {this.state.tabNo === 1 &&
                            `${format( this.state.start, AppConst.FORMAT_DATE2 )} ~ ${format( this.state.end, AppConst.FORMAT_DATE2 )}`
                        }
                        {this.state.tabNo === 2 &&
                            `${format( this.state.start, AppConst.FORMAT_DATE3 )}`
                        }
                        {this.state.tabNo === 3 &&
                            `${format( this.state.start, AppConst.FORMAT_DATE4 )}`
                        }
                        </Typography>
                    </Grid>
                    <Grid item >
                        <IconButton 
                            aria-label="navigation button to future" 
                            sx={gridDateButtonStyle}
                            onClick={()=>{
                                if(isBefore(this.state.start, subDays(endOfDay(new Date()), 1))){
                                    this.handleClickFuture();
                                }
                            }} >
                            <NavigateNextIcon color="secondary" />
                        </IconButton>
                    </Grid>
                </Grid>
                { this.state.moods?.length > 0 && <>
                <Grid item container sx={gridDoughnutStyle} >
                    {/* <Grid item container justifyContent='center'> */}
                        <MoodDoughnut moods={this.state.moods} mode={this.state.mode} legend={true}/>
                    {/* </Grid> */}
                </Grid>
                <Grid item container sx={gridOptionStyle} >
                    <CustomSwitch mode={this.state.mode} handleSwitchOnChange={this.handleSwitchOnChange} />
                </Grid>
                </>}
            </Grid>
        );
    }
}
export default withAppData(InsightManager);