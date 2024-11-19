import React from 'react';
import { Box } from '@mui/material';

export default class Eyebrow extends React.Component {
    render(){
        const style = {
            eyebrow: {
                position: "absolute",
                top: "-24px",
                left: "3px",
                zIndex: 1
            },
            eyeball: {
                position: "relative",
                zIndex: 0
            }
        };
        return (
            <>
                {this.props.show &&
                <svg xmlns="http://www.w3.org/2000/svg" width={50} height={30} xmlSpace="preserve" style={style.eyebrow}>
                    <path
                        d="M -17.96527 -2.85787 L -17.01829 -3.39765 C -5.46707 -9.98189 9.21047 -6.4887999999999995 16.55737 4.59299 L 17.96526 6.716600000000001"
                        fill="none"
                        vectorEffect="non-scaling-stroke"
                        transform="translate(27.62 24.28)"
                        strokeLinecap="round"
                        style={{
                            stroke: "#000",
                            strokeWidth: 3,
                            strokeDasharray: "none",
                            strokeLinecap: "round",
                            strokeDashoffset: 0,
                            strokeLinejoin: "miter",
                            strokeMiterlimit: 4,
                            fill: "#fff",
                            fillOpacity: 0,
                            fillRule: "nonzero",
                            opacity: 1,
                        }}
                    />
                </svg>
                }
                <Box style={style.eyeball}>
                    {this.props.children}
                </Box>
            </>
        );
    }
}