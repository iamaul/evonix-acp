import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import AuthContext from '../context/auth/authContext';

import Loader from '../components/layouts/loader/Loader';

const PrivateRoute = ({ component: Component, ...rest }) => {
    const authContext = useContext(AuthContext);
    const { isAuthenticated, setLoading } = authContext;

    return (
        <Route {...rest} 
            render={props => setLoading ? (<Loader isLoading={setLoading} />) : isAuthenticated ? (<Component {...props} />) : (<Redirect to="/login" />)} 
        />
    )
}

export default PrivateRoute;
