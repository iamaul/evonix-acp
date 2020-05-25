import {
    GET_ALL_NEWS,
    ADD_NEWS,
    DELETE_NEWS,
    SET_CURRENT_NEWS,
    CLEAR_CURRENT_NEWS,
    UPDATE_NEWS,
    CLEAR_NEWS,
    NEWS_ERROR,
    CLEAR_NEWS_ERROR
} from '../types';

export default (state, action) => {
    const { type, payload } = action;

    switch (type) {
        case GET_ALL_NEWS:
            return {
                ...state,
                news: payload,
                setLoading: false
            }
        case ADD_NEWS:
            return {
                ...state,
                news: [payload, ...state.news],
                setLoading: false
            }
        case UPDATE_NEWS:
            return {
                ...state,
                news: state.news.map(news => news.id === payload.id ? payload : news),
                setLoading: false
            }
        case DELETE_NEWS:
            return {
                ...state,
                news: state.news.filter(news => news.id !== payload),
                setLoading: false
            }
        case CLEAR_NEWS:
            return {
                ...state,
                news: null,
                current_news: null,
                error: null
            }
        case SET_CURRENT_NEWS:
            return {
                ...state,
                current_news: payload
            }
        case CLEAR_CURRENT_NEWS:
            return {
                ...state,
                current_news: null
            }
        case NEWS_ERROR:
            return {
                ...state,
                error: payload
            }
        case CLEAR_NEWS_ERROR:
            return {
                ...state,
                error: null
            }
        default: return state;
    }
}