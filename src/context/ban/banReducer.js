import {
    GET_ALL_BAN_LIST,
    DELETE_BAN,
    BAN_ERROR,
    CLEAR_BAN_ERROR
} from '../types';

export default (state, action) => {
    const { type, payload } = action;

    switch (type) {
        case GET_ALL_BAN_LIST:
            return {
                ...state,
                banlist: payload,
                setLoading: false
            }
        case DELETE_BAN:
            return {
                ...state,
                banlist: state.banlist.filter(ban => ban.id !== payload),
                setLoading: false
            }
        case BAN_ERROR:
            return {
                ...state,
                error: payload
            }
        case CLEAR_BAN_ERROR:
            return {
                ...state,
                error: null
            }
        default: return state;
    }
}