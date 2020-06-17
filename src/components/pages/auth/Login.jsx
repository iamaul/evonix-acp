import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from "react-router-dom";
import Swal from 'sweetalert2';
import { 
    Form, 
    Grid, 
    Header, 
    Image, 
    Segment,
    Icon 
} from 'semantic-ui-react';
import AuthContext from '../../../context/auth/authContext';

const Toast = Swal.mixin({
    toast: true,
    position: 'top-end'
});

const Login = () => {
    const authContext = useContext(AuthContext);
    const { userLogin, isAuthenticated, clearAuthErrors, error } = authContext;
    const history = useHistory();

    useEffect(() => {
        if (isAuthenticated) {
            history.push('/dashboard');
        }

        if (error) {
            error.map(err => {
                return Toast.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: err.msg
                });
            });
            clearAuthErrors();
        }
        // eslint-disable-next-line
    }, [isAuthenticated, history, error]);

    const [user, setUser] = useState({ usermail: '', password: '' });
    const { usermail, password } = user;

    const onChange = e => setUser({ ...user, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();

        userLogin({ usermail, password });
    }

    return (
        <>
            <Grid textAlign="center" style={{ height: '80vh' }} verticalAlign="middle">
                <Grid.Column style={{ maxWidth: 450 }}>
                    <Header as="h2" textAlign="center">
                        <Image src="/assets/images/evonix-logo.png" size="massive" />
                    </Header>
                    <Form size="large" onSubmit={onSubmit}>
                        <Segment color="red" stacked>
                            <Form.Input 
                                type="text"
                                name="usermail"
                                value={usermail} 
                                icon="user" 
                                iconPosition="left" 
                                placeholder="Username or Email Address"
                                onChange={onChange}
                                fluid 
                            />
                            <Form.Input
                                type="password"
                                name="password"
                                value={password}
                                icon="lock"
                                iconPosition="left"
                                placeholder="Password"
                                onChange={onChange}
                                fluid
                            />
                            <Form.Button color="red" fluid size="large" content="Sign In" />
                        </Segment>
                    </Form>
                </Grid.Column>
            </Grid>
            <footer>
                <p>     
                    <Icon name="copyright outline" /> 2020 EvoniX ACP.
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
