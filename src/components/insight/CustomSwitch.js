import React from 'react';

import { Switch, Tooltip } from '@mui/material';
import AppConst from '../shared/AppConst';

export default class CustomSwitch extends React.Component {
    render(){
        return (
            <Tooltip title={this.props.mode === AppConst.TOTAL_RECORDS? "switch to total time": "switch to total records"}>
                <Switch 
                    checked={this.props.mode === AppConst.TOTAL_RECORDS}
                    onChange={this.props.handleSwitchOnChange}
                    sx={{
                        width: 69, // track width
                        height: 42, // track height
                        padding: "11px", // centerize thumb in the track
                        '& .MuiSwitch-switchBase': {
                        padding: 0, // base's padding(base is behind the thumb)
                        transform: 'translateX(4px)', // move base to 4px right (with the thumb)
                        '&.Mui-checked': {
                            color: '#fff', // riple color
                            transform: 'translateX(27px)', // move base to 27px right (with the thumb)
                            // define pseudo element before thumb
                            '& .MuiSwitch-thumb:before': {
                            backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="25" width="25" viewBox="0 0 23 23"><path fill="${encodeURIComponent(
                                '#fff',
                            )}" d="m20.5 10 .5-2h-4l1-4h-2l-1 4h-4l1-4h-2L9 8H5l-.5 2h4l-1 4h-4L3 16h4l-1 4h2l1-4h4l-1 4h2l1-4h4l.5-2h-4l1-4h4zm-7 4h-4l1-4h4l-1 4z"/></svg>')`,
                            },
                            '& + .MuiSwitch-track': {
                            opacity: 1,
                            backgroundColor: '#aab4be',
                            },
                        },
                        },
                        '& .MuiSwitch-thumb': {
                        backgroundColor: '#FAA828',
                        width: 38, // thumb width
                        height: 38, // thumb height
                        // define pseudo element before thumb
                        '&:before': {
                            content: "''",
                            position: 'absolute',
                            width: '100%',
                            height: '100%',
                            left: 0,
                            top: 0,
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'center',
                            backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="25" width="25" viewBox="0 0 23 23"><path fill="${encodeURIComponent(
                            '#fff',
                            )}" d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zm3.3 14.71L11 12.41V7h2v4.59l3.71 3.71-1.42 1.41z"/></svg>')`,
                        },
                        },
                        '& .MuiSwitch-track': {
                        //   opacity: 1,
                        backgroundColor: '#aab4be',
                        borderRadius: 20 / 2,
                        },
                    }}
                />
            </Tooltip>
        );
    }
}