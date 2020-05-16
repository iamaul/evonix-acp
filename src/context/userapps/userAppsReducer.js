import {
    GET_ALL_USER_APPS,
    UPDATE_USER_APPS,
    USER_APPS_ERROR,
    CLEAR_USER_APPS_ERROR
} from '../types';

export default (state, action) => {
    const { type, payload } = action;

    switch (type) {
        case GET_ALL_USER_APPS:
        case UPDATE_USER_APPS:
            return {
                ...state,
                user_apps: payload,
                setLoading: false
            }
        case USER_APPS_ERROR:
            return {
                ...state,
                error: payload
            }
        case CLEAR_USER_APPS_ERROR:
            return {
                ...state,
                error: null
            }
        default: return state;
    }
}