import React from 'react';

import { Stack, IconButton } from '@mui/material';

export default class CharPicker extends React.Component {
    render(){
        const aToZ = "QWERTYUIOPASDFGHJKLZXCVBNM".split("");
        const IconButtons = [];
        aToZ.map( (char, index) => {
            let item = (
                <IconButton 
                    key={index}
                    onClick={()=>{this.props.setChar(char)}}
                    children={char}
                    sx={{ 
                        fontSize: { xs: "1.5rem", sm: "1.5rem", md: "1.75rem" }, 
                        width: { xs: 32, sm: 32, md: 40 }, 
                        height: { xs: 32, sm: 32, md: 40 }, 
                        border: this.props.char === char ? `2px solid black` : "none",
                        boxShadow: this.props.char === char ? `0 0 0 4px black / 45%)` :"none",
                        boxSizing: "border-box",
                        "&:hover": {
                            width: { xs: 36, sm: 36, md: 45 }, 
                            height: { xs: 36, sm: 36, md: 45 }, 
                        }
                    }} />
            )
            IconButtons.push(item);
            return char;
        });
        return (
            <Stack direction="column" spacing={{ xs: 0, sm: 0, md: 1 }} aria-label="char picker">
                <Stack direction="row" spacing={1} justifyContent="center">
                    {IconButtons.slice(0,10)}
                </Stack>
                <Stack direction="row" spacing={1} justifyContent="center">
                    {IconButtons.slice(10,19)}
                </Stack>
                <Stack direction="row" spacing={1} justifyContent="center">
                    {IconButtons.slice(19,26)}
                </Stack>
            </Stack>
        );
    }
}