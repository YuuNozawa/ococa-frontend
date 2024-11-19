import React from 'react';

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut }  from 'react-chartjs-2';

import { differenceInMinutes, minutesToHours, parseISO } from 'date-fns'

import AppConst from '../shared/AppConst';
import { withAppData, withTheme } from '../../context/props';


class MoodDoughnut extends React.Component {
    constructor(props) {
        super(props);
        this.chart = React.createRef();
        this.state = {
            prevMediaSize: null
        };
    }
    getCount(emotionId) {
        let count = 0;
        if(this.props.mode === AppConst.TOTAL_TIME){
            count = this.props?.moods?.filter(m => m.emotionId === emotionId)?.reduce((prev, curr) => {
                    // if(!curr.endAt){ return prev; }
                    const date = curr.endAt ? parseISO(curr.endAt) : new Date()
                    return prev + differenceInMinutes(date, parseISO(curr.startAt));
                }, 0);
        } else if(this.props.mode === AppConst.TOTAL_RECORDS) {
            count = this.props.moods?.filter(m => m.emotionId === emotionId).length;
        }
        return count;
    }
    getLabel(emotionId) {
        let label = AppConst.getSingleEmo(emotionId, 1);
        let count = this.getCount(emotionId);
        let time = count > 119 ? `${minutesToHours(count)} H` : `${count} Min`
        label += count > 0 ? " : " : "";
        if(this.props.mode === AppConst.TOTAL_TIME){
            label += count > 0 ? time : "";
        } else {
            label += count;
        }
        return label;
    }
    getFooter(emotionId) {
        let label = AppConst.getSingleEmo(emotionId, 1);
        let count = this.getCount(emotionId);
        let time = count > 119 ? `${minutesToHours(count)} H` : `${count} Min`
        label += count > 0 ? " : " : "";
        if(this.props.mode === AppConst.TOTAL_TIME){
            label += count > 0 ? time : "";
        } else {
            label += count;
        }
        return label;
    }
    getImage(label) {
        const img = new Image(30, 30);
        switch(label){
            case AppConst.getSingleEmo(AppConst.ANGER.getId(), 1) : 
                img.src = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="25" width="25" viewBox="0 0 23 23"><path fill="${encodeURIComponent(AppConst.getSingleColor(AppConst.ANGER.getId(), 1))}" d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 3c-2.33 0-4.31 1.46-5.11 3.5h10.22c-.8-2.04-2.78-3.5-5.11-3.5z"/></svg>`;
                break;
            case AppConst.getSingleEmo(AppConst.SADNESS.getId(), 1) :
                img.src = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="25" width="25" viewBox="0 0 23 23"><path fill="${encodeURIComponent(AppConst.getSingleColor(AppConst.SADNESS.getId(), 1))}" d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm0-3.5c.73 0 1.39.19 1.97.53.12-.14.86-.98 1.01-1.14-.85-.56-1.87-.89-2.98-.89-1.11 0-2.13.33-2.99.88.97 1.09.01.02 1.01 1.14.59-.33 1.25-.52 1.98-.52z"/></svg>`;
                break;
            case AppConst.getSingleEmo(AppConst.FEAR.getId(), 1) :
                img.src = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="25" width="25" viewBox="0 0 23 23"><path fill="${encodeURIComponent(AppConst.getSingleColor(AppConst.FEAR.getId(), 1))}" d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm0-4c-.73 0-1.38-.18-1.96-.52-.12.14-.86.98-1.01 1.15.86.55 1.87.87 2.97.87 1.11 0 2.12-.33 2.98-.88-.97-1.09-.01-.02-1.01-1.15-.59.35-1.24.53-1.97.53z"/></svg>`;
                break;
            case AppConst.getSingleEmo(AppConst.JOY.getId(), 1) :
                img.src = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="25" width="25" viewBox="0 0 23 23"><path fill="${encodeURIComponent(AppConst.getSingleColor(AppConst.JOY.getId(), 1))}" d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z"/></svg>`;
                break;
            default: 
                break;
        }
        return img;
    }
    render() {
        const gvbm = this.props.gvbm;
        const doughnutOptions = {
            height: "90%",
            maintainAspectRatio : false,
            // responsive: false,
            // interaction: {
            //     mode: "nearest",
            //     intersect: true
            // },
            onClick: (e) => {
                const chart = this.chart.current;
                const points = chart.getElementsAtEventForMode(e, 'nearest', { intersect: true }, true);
                if (points.length) {
                    const firstPoint = points[0];
                    const label = chart.data.labels[firstPoint.index];
                    const value = chart.data.datasets[firstPoint.datasetIndex].data[firstPoint.index];
                    console.log(label);
                    console.log(value);
                }
            },
            plugins: {
                tooltip: {
                    enabled: true,
                    usePointStyle: true,
                    // intersect:false,
                    // displayColors: false,
                    callbacks: {
                        labelPointStyle: (context) => {
                            return {
                                pointStyle: this.getImage(context.label)
                            };
                        },
                        label: (context) => {
                            let label = context.label;
                            let count = context.formattedValue;
                            label += count > 0 ? " : " : "";
                            if(this.props.mode === AppConst.TOTAL_TIME){
                                let time = count > 119 ? `${minutesToHours(count)} H` : `${count} Min`;
                                label += count > 0 ? time : "";
                            } else {
                                label += `${count} record`;
                            }
                            return label;
                        },
                        footer:() => {
                            return "hoge";
                        }
                    },
                    bodyFont: {
                        size: 30
                        // size: 50
                    }
                },
                legend: {
                    display: this.props.legend,
                    position: gvbm({lg:"left",md:"left",sm:"top",xs:"top"}),
                    maxHeight: 500,
                    labels: {
                        padding: gvbm({lg:10,md:7,sm:5,xs:5}),
                        font: {
                            size: gvbm({lg:30,md:25,sm:15,xs:15}),
                        },
                        usePointStyle: true,
                        pointStyle: "rectRounded"
                    },
                },
            }
        }

        ChartJS.register(ArcElement, Tooltip, Legend);
        return ( 
            <Doughnut 
                ref={this.chart}
                options={doughnutOptions}
                data={{
                    labels: [
                        AppConst.getSingleEmo(AppConst.ANGER.getId(), AppConst.WEAK),
                        AppConst.getSingleEmo(AppConst.SADNESS.getId(), AppConst.WEAK),
                        AppConst.getSingleEmo(AppConst.FEAR.getId(), AppConst.WEAK),
                        AppConst.getSingleEmo(AppConst.JOY.getId(), AppConst.WEAK),
                    ],
                    datasets: [{
                        label: "Mood comparison",
                        data: [
                            this.getCount(AppConst.ANGER.getId()), 
                            this.getCount(AppConst.SADNESS.getId()), 
                            this.getCount(AppConst.FEAR.getId()), 
                            this.getCount(AppConst.JOY.getId())
                        ],
                        backgroundColor: [
                            AppConst.getSingleColor(AppConst.ANGER.getId(), AppConst.MILD),
                            AppConst.getSingleColor(AppConst.SADNESS.getId(), AppConst.MILD),
                            AppConst.getSingleColor(AppConst.FEAR.getId(), AppConst.MILD),
                            AppConst.getSingleColor(AppConst.JOY.getId(), AppConst.MILD)
                        ],
                        hoverOffset: 4,
                        borderWidth: 1
                    }]
                }} 
            />
        );
    }
}
const ComponentWithTheme = withTheme(MoodDoughnut);
export default withAppData(ComponentWithTheme);