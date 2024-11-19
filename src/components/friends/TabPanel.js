import React from 'react';

import { Box } from '@mui/material';

import { withAppData } from '../../context/props';

class TabPanel extends React.Component {
    render(){
        return (
            <Box 
                role="tabpanel"
                id={`tabpanel-${this.props.index}`}
                aria-labelledby={`tab-${this.props.index}`}
                hidden={this.props.value !== this.props.index}>
                {this.props.children}
            </Box>
        );
    }
}

export default withAppData(TabPanel);