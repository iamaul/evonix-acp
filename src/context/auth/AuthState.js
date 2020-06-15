import React, { useReducer } from 'react';

import api from '../../utils/api';
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

import setAuthToken from '../../utils/setAuthToken';

const AuthState = (props) => {
    const INITIAL_STATE = {
        token: localStorage.getItem('token'),
        isAuthenticated: false,
        setLoading: true,
        user: null,
        error: null
    }

    const [state, dispatch] = useReducer(authReducer, INITIAL_STATE);

    // API Requests
    const userLoad = async () => {
        setAuthToken(localStorage.token);

        try {
            const res = await api.get('/api/v1/auth');
            dispatch({ type: USER_LOADED, payload: res.data });
        } catch (error) {
            dispatch({ type: AUTH_ERROR });
        }
    }

    const userLogin = async formBody => {
        try {
            const res = await api.post('/api/v1/auth', formBody);
            dispatch({ type: LOGIN_SUCCESS, payload: res.data });
            userLoad();
        } catch (error) {
            const errors = error.response.data.errors;
            dispatch({ type: LOGIN_FAIL, payload: errors });
        }
    }

    const userLogout = () => dispatch({ type: LOGOUT });

    const clearAuthErrors = () => dispatch({ type: CLEAR_AUTH_ERRORS });

    return (
        <AuthContext.Provider
            value={{
                token: state.token,
                isAuthenticated: state.isAuthenticated,
                setLoading: state.setLoading,
                user: state.user,
                error: state.error,
                userLoad,
                userLogin,
                userLogout,
                clearAuthErrors
            }}
        >
            { props.children }
        </AuthContext.Provider>
    )
}

export default AuthState;