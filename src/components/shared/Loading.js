import React from 'react';
import { Box, CircularProgress } from '@mui/material';
class Loading extends React.Component {
    render(){
        return (
            <Box sx={{
                width: "100%",
                height: "100%",
                position: "absolute",
                display: "flex", 
                alignItems: "center", 
                justifyContent: "center"
            }} >
                <CircularProgress color="primary" size="40px"/>
            </Box>
        );
    }
}
export default Loading;