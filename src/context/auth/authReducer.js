import {
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    CLEAR_AUTH_ERRORS
} from '../types';

export default (state, action) => {
    const { type, payload } = action;

    switch (type) {
        case USER_LOADED:
            return {
                ...state,
                user: payload,
                isAuthenticated: true,
                setLoading: false
            }
        case LOGIN_SUCCESS:
            return {
                ...state,
                ...payload,
                isAuthenticated: true,
                setLoading: false
            }
        case AUTH_ERROR:
        case LOGIN_FAIL:
        case LOGOUT:
            return {
                ...state,
                token: null,
                user: null,
                error: payload,
                isAuthenticated: false,
                setLoading: false
            }
        case CLEAR_AUTH_ERRORS:
            return {
                ...state,
                error: null
            }
        default: return state;
    }
}