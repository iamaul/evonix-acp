import React from 'react';
import { 
    Form, 
    Grid, 
    Header, 
    Image, 
    Segment,
    Icon 
} from 'semantic-ui-react';

const Login = () => {
    return (
        <>
            <Grid textAlign="center" style={{ height: '80vh' }} verticalAlign="middle">
                <Grid.Column style={{ maxWidth: 450 }}>
                    <Header as="h2" textAlign="center">
                        <Image src="/assets/images/evonix-logo.png" size="massive" />
                    </Header>
                    <Form size="large">
                        <Segment stacked>
                            <Form.Input 
                                type="text"
                                name="usermail" 
                                icon="user" 
                                iconPosition="left" 
                                placeholder="Username or Email Address"
                                fluid 
                            />
                            <Form.Input
                                type="password"
                                name="password"
                                icon="lock"
                                iconPosition="left"
                                placeholder="Password"
                                fluid
                            />
                            <Form.Button color="red" fluid size="large" content="Sign In" />
                        </Segment>
                    </Form>
                </Grid.Column>
            </Grid>
            <footer>
                <p>     
                    <Icon name="copyright outline" /> 2020 EvoniX Community.
                </p>
            </footer>
            <style>{`
                footer {
                    position: fixed;
                    left: 0;
                    bottom: 0;
                    width: 100%;
                    text-align: center;
                    padding: 10px;
                }
            `}</style>   
        </>
    )
}

export default Login;
