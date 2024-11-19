import React from 'react';

import { Stack, IconButton } from '@mui/material';

export default class ColorPicker extends React.Component {
    render(){
        const colorPattern = [
            {rgb: "143 255 239", hex: "#8FFFEF"}, 
            {rgb: "141 206 255", hex: "#8DCEFF"}, 
            {rgb: "237 212 187", hex: "#EDD4BB"}, 
            {rgb: "227 139 139", hex: "#E38B8B"}, 
            {rgb: "253 109 121", hex: "#FD6D79"}, 
            {rgb: "247 132 86", hex: "#F78456"}, 
            {rgb: "249 186 85", hex: "#F9BA55"}, 
            {rgb: "235 236 149", hex: "#EBEC95"},
            {rgb: "246 179 172", hex: "#F6B3AC"},
            {rgb: "246 155 127", hex: "#F69B7F"},
            {rgb: "230 105 71", hex: "#E66947"},
            {rgb: "209 143 108", hex: "#D1906C"},
            {rgb: "68 101 192", hex: "#4465C0"},
            {rgb: "138 162 198", hex: "#8AA2C6"},
            {rgb: "245 166 19", hex: "#F5A613"},
            {rgb: "110 102 118", hex: "#6E6676"},
            {rgb: "98 171 234", hex: "#62ABEA"},
            {rgb: "241 107 178", hex: "#F16BB2"},
            {rgb: "255 196 35", hex: "#FFC423"},
            {rgb: "161 213 67", hex: "#A1D543"},
        ]
        const IconButtons = [];
        colorPattern.map( (color, index) => {
            let colorItem = (
                <IconButton 
                    key={index}
                    size="large" 
                    onClick={()=>{this.props.setColor(color.hex)}}
                    sx={{ 
                        backgroundColor: this.props.color === color.hex ? "#FFF": `rgb(${color.rgb})`, 
                        width: 40, 
                        height: 40, 
                        border: this.props.color === color.hex ? `5px solid rgb(${color.rgb})` : "none",
                        boxShadow: this.props.color === color.hex ? `0 0 0 4px rgb(${color.rgb} / 45%)` :"none",
                        boxSizing: "border-box",
                        "&:hover": {
                            width: 45, 
                            height: 45, 
                            backgroundColor: this.props.color === color.hex ? "#FFF": `rgb(${color.rgb})`, 
                        }
                    }} />
            )
            IconButtons.push(colorItem);
            return color;
        });
        return (
            <Stack direction="column"spacing={1} aria-label="color picker">
                <Stack direction="row" spacing={1} >
                    {IconButtons.slice(0,5)}
                </Stack>
                <Stack direction="row"spacing={1} >
                    {IconButtons.slice(5,10)}
                </Stack>
                <Stack direction="row"spacing={1} >
                    {IconButtons.slice(10,15)}
                </Stack>
                <Stack direction="row"spacing={1} >
                    {IconButtons.slice(15,20)}
                </Stack>
            </Stack>
        );
    }
}