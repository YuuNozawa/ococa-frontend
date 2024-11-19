import React from 'react';

// Components
import { Container, Card, CardMedia, Button, Grid } from '@mui/material';
import { signinRedirect } from '../../service/AuthService';

import ococa from '../../static/images/ococa.png';

// External 
import { withRouter, withAppData } from '../../context/props';
import AppConst from '../shared/AppConst';


class Login extends React.Component {
    constructor(props) {
        super(props);
        this.handleLogoClick = this.handleLogoClick.bind(this);
        this.handleClickLogIn = this.handleClickLogIn.bind(this);
    } 
    handleLogoClick() {
        this.props.router.navigate("/" + AppConst.WELCOME.getLabel());
    }
    handleClickLogIn() {
        signinRedirect();
    }
    render(){
        return (
            <Container sx={{ display:"flex", flexDirection:"column", height:"90%" }} >
                <Card elevation={0} sx={{ display:"flex", justifyContent:"center", minHeight:150 }} >
                    <CardMedia 
                        sx={{ 
                            width: { xs: 190, sm: 260, md: 320 }, 
                            height: { xs: 90, sm: 120, md: 140 }, 
                        }}
                        image={ococa} 
                        onClick={this.handleLogoClick}/>
                </Card>
                <Grid 
                    container 
                    direction="column" 
                    justifyContent="center" 
                    spacing={4}
                    sx={{ height:"calc(90% - 150px)", minHeight:{ xs: 100, sm: 150, md: 200 } }}
                    >
                    <Grid item textAlign="center">
                        <Button 
                            sx={{ width: { xs: "16em", sm: "16em", md: "21em" } }}
                            onClick={this.handleClickLogIn} 
                            variant="contained" 
                            color="primary" 
                            disableElevation>
                            login
                        </Button>
                    </Grid>
                </Grid>
            </Container>
        );
    }
}
const ComponentWithAppData = withAppData(Login);
export default withRouter(ComponentWithAppData);