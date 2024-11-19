import React from 'react';

import { Grid, Card, CardHeader, CardContent } from '@mui/material';

import CurrentMood from './CurrentMood';
import { requireAuth, withRouter, withAppData } from '../../context/props'; 

class Carousel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currItemNo: 0,
            diffX: 0,
            startX: null,
            isAnimating: false
        };
        this.handleOnMouseDown = this.handleOnMouseDown.bind(this);
        this.handleOnMouseMove = this.handleOnMouseMove.bind(this);
        this.handleOnMouseUp = this.handleOnMouseUp.bind(this);
        this.handleOnTouchStart = this.handleOnTouchStart.bind(this);
        this.handleOnTouchMove = this.handleOnTouchMove.bind(this);
    }
    // For Desktop
    handleOnMouseDown(e) {
        this.setState({startX: e.clientX});
        this.setState({isAnimating: false});
    }
    handleOnMouseMove(e) {
        this.setState((prevState) => {
            let newDiffX = prevState.diffX;
            if(prevState.startX !== null) newDiffX = e.clientX - prevState.startX;
            return { diffX: newDiffX };
        });
    }
    handleOnMouseUp() {
        this.setState((prevState) => {
            const userMood = this.props.appdata.mood.moods.filter(m => m.userId === this.props.router.params.userId && m.endAt === null);
            const total = userMood.length ? userMood.length - 1 : 0;
            let newCurrItemNo = prevState.currItemNo;
            if(prevState.diffX > 20) newCurrItemNo--;
            if(prevState.diffX < -20) newCurrItemNo++;
            if(newCurrItemNo < 0 || total < newCurrItemNo ) newCurrItemNo = prevState.currItemNo;
            return {
                startX: null,
                currItemNo: newCurrItemNo,
                diffX: 0,
                isAnimating: true
            }
        });
    }
    // For Mobile
    handleOnTouchStart(e) {
        this.setState({startX: e.touches[0].clientX});
        this.setState({isAnimating: false});
    } 
    handleOnTouchMove(e) {
        this.setState((prevState) => {
            let newDiffX = prevState.diffX;
            if(prevState.startX !== null) newDiffX = e.touches[0].clientX - prevState.startX;
            return { diffX: newDiffX };
        });
    }
    componentWillUnmount() {
        window.removeEventListener('mousemove', this.handleOnMouseMove, true);
        window.removeEventListener('mouseup', this.handleOnMouseUp, true);
        window.removeEventListener('touchmove', this.handleOnTouchMove, true);
        window.removeEventListener('touchend', this.handleOnMouseUp, true);
    }
    componentDidMount() {
        window.addEventListener('mousemove', this.handleOnMouseMove, true);
        window.addEventListener('mouseup', this.handleOnMouseUp, true);
        window.addEventListener('touchmove', this.handleOnTouchMove, true);
        window.addEventListener('touchend', this.handleOnMouseUp, true);
    }
    render() {
        const carouselContainerStyle= {
            width: "100%",
            height: "100%",
            overflow: "hidden",
            minHeight: {xs: "400px", sm: "400px", md: "420px"},
            flexDirection:"row",
            flexWrap: "nowrap",
            ">*" : {
                maxHeight: "100%",
                maxWidth: {xs: "96%", sm: "96%", md: "80%"},
                marginLeft: {xs: "10px", sm: "10px", md: "20px"},
                boxSizing: "border-box"
            }
        }
        const latestPostCardStyle= {
            flex: "0 0 auto",
            width: "100%",
            transition: this.state.isAnimating ? "transform 0.5s" : "",
            transform: this.state.currItemNo > 0 ? 
            `translate3d(calc(${-100 * this.state.currItemNo}% - 20px), 0, 0) translate3d(${this.state.diffX}px, 0, 0)` :
            `translate3d(${this.state.diffX}px, 0, 0)`
        }

        const {mood} = {...this.props.appdata};
        const userMood = mood.moods.filter(m => m.userId === this.props.router.params.userId && m.endAt === null);
        const MoodList = [];
        userMood.map((myMood, index) => {
            MoodList.push(
                <Card 
                    sx={latestPostCardStyle} 
                    elevation={3} 
                    key={`carousel-item-${index}`} 
                    aria-label="carousel item"
                    onMouseDown={(e) => {this.handleOnMouseDown(e)}} 
                    onTouchStart={(e) => {this.handleOnTouchStart(e)}} >
                    <CardHeader 
                        title="Latest Post" 
                        subheaderTypographyProps={{textAlign:"end"}} />
                    <CardContent>
                        <CurrentMood mood={myMood} />
                    </CardContent>
                </Card>
            );
            return myMood;
        });
        return (
            <Grid item container aria-label="carousel container" sx={carouselContainerStyle}>
                {MoodList}
            </Grid>
        );
    }
}
const ComponentAfterAuthChecked = requireAuth(Carousel);
const ComponentWithAppData = withAppData(ComponentAfterAuthChecked);
export default withRouter(ComponentWithAppData);