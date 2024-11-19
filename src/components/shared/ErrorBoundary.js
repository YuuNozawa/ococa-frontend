import React from 'react';

import { Grid, Stack, Typography, Button } from '@mui/material';

import AppConst from '../shared/AppConst';

export default class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
        this.handleUnhandledRejection = this.handleUnhandledRejection.bind(this);
        this.handleRetryOnClick = this.handleRetryOnClick.bind(this);
    }
    handleUnhandledRejection() {
        this.setState({hasError: true});
    }
    handleRetryOnClick() {
        alert("not ready");
    }
    static getDerivedStateFromError(error) {
        // Update state so the next render will show the fallback UI.
        return { hasError: true };
    }
    componentDidCatch(error, errorInfo) {
        // You can also log the error to an error reporting service
        console.error(errorInfo);
    }
    componentDidMount() {
        window.addEventListener('unhandledrejection', this.handleUnhandledRejection, true);
    }
    componentWillUnmount() {
        window.removeEventListener('unhandledrejection', this.handleUnhandledRejection, true);
    }
    render(){
        if (this.state.hasError) {
            return (
                <Grid container direction="column" alignItems="center" sx={{width: "100%", height: "100%"}} spacing={10}>
                    <Grid item sx={{marginTop:"10%"}}>
                        <Typography variant="h3" color="error" align="center">{AppConst.MSG405.getMessage()}</Typography>
                    </Grid>
                    <Grid item>
                        <Stack direction="column" justifyContent="center" alignItems="center" spacing={1}>
                            <Button variant="contained" onClick={this.handleRetryOnClick} size="medium" >Retry</Button>
                            <Typography variant="h6" align="center">{AppConst.MSG410.getMessage()}</Typography>
                        </Stack>
                    </Grid>
                </Grid>
            );
        }
        return this.props.children;
    }
}