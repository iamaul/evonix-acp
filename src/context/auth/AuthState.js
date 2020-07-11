import React, { useReducer } from 'react';

import AuthContext from './authContext';
import authReducer from './authReducer';
import {
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    CLEAR_AUTH_ERRORS
} from '../types';

import api from '../../utils/api';
import { setAuthToken } from '../../utils';

const AuthState = (props) => {
    const INITIAL_STATE = {
        token: localStorage.getItem('token'),
        user: null,
        error: null,
        isAuthenticated: null,
        setLoading: true
    }

    const [state, dispatch] = useReducer(authReducer, INITIAL_STATE);

    const userLoad = async () => {
        setAuthToken(localStorage.token);
        try {
            const res = await api.get('/api/v1/auth');
            dispatch({ type: USER_LOADED, payload: res.data });
        } catch (error) {
            dispatch({ type: AUTH_ERROR });
        }
    }

    const userLogin = async data => {
        try {
            const res = await api.post('/api/v1/auth/admin', data);
            dispatch({ type: LOGIN_SUCCESS, payload: res.data });
            userLoad();
        } catch (error) {
            const errors = error.response.data.errors;
            dispatch({ type: LOGIN_FAIL, payload: errors });
        }
    }

    const userLogout = () => dispatch({ type: LOGOUT });
    const clearAuthErrors = () => dispatch({ type: CLEAR_AUTH_ERRORS });

    const values = {
        token: state.token,
        user: state.user,
        error: state.error,
        isAuthenticated: state.isAuthenticated,
        setLoading: state.setLoading,
        userLoad,
        userLogin,
        userLogout,
        clearAuthErrors
    }
    
    return (
        <AuthContext.Provider value={values}>
            { props.children }
        </AuthContext.Provider>
    )
}

export default AuthState;