import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from '../context/auth/AuthState';

import Loader from '../components/layouts/loader/Loader';

const PrivateRoute = ({ component: Component, ...rest }) => {
    const [authState] = useAuth();
    const { isAuthenticated, setLoading } = authState;

    return (
        <Route 
            {...rest} 
            render={props => setLoading ? (<Loader isLoading={setLoading} />) : isAuthenticated ? (<Component {...props} />) : (<Redirect to="/" />)} 
        />
    )
}

export default PrivateRoute;
