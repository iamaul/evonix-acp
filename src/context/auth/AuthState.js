import React, { useReducer, useContext } from 'react';

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

export const useAuth = () => {
    const { state, dispatch } = useContext(AuthContext);
    return [state, dispatch];
};

// API Requests
export const userLoad = async dispatch => {
    try {
        const res = await api.get('/api/v1/auth');
        dispatch({ type: USER_LOADED, payload: res.data });
    } catch (error) {
        dispatch({ type: AUTH_ERROR });
    }
}

export const userLogin = async (dispatch, formBody) => {
    try {
        const res = await api.post('/api/v1/auth', formBody);
        dispatch({ type: LOGIN_SUCCESS, payload: res.data });
        userLoad(dispatch);
    } catch (error) {
        const errors = error.response.data.errors;
        dispatch({ type: LOGIN_FAIL, payload: errors });
    }
}

export const userLogout = dispatch => dispatch({ type: LOGOUT });

export const clearAuthErrors = dispatch => dispatch({ type: CLEAR_AUTH_ERRORS });

const AuthState = (props) => {
    const INITIAL_STATE = {
        token: localStorage.getItem('token'),
        isAuthenticated: null,
        setLoading: true,
        user: null,
        error: null
    }

    const [state, dispatch] = useReducer(authReducer, INITIAL_STATE);

    setAuthToken(state.token);

    if (state.setLoading) {
        userLoad(dispatch);
    }

    useEffect(() => {
        setAuthToken(state.token);
    }, [state.token]);

    return (
        <AuthContext.Provider value={{ state: state, dispatch }}>
            { props.children }
        </AuthContext.Provider>
    )
}

export default AuthState;