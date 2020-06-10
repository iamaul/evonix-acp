import {
    COUNT_SERVER_CHARACTERS,
    COUNT_SERVER_ASSISTANCES,
    COUNT_SERVER_REPORTS,
    GROUP_BY_ASSISTANCES,
    GROUP_BY_REPORTS,
    CLEAR_STATS_ERROR
} from '../types';

export default (state, action) => {
    const { type, payload } = action;

    switch (type) {
        case COUNT_SERVER_CHARACTERS:
            return {
                ...state,
                total_characters: payload,
                setLoading: false
            }
        case GROUP_BY_ASSISTANCES:
            return {
                ...state,
                group_by_assistances: payload,
                setLoading: false
            }
        case COUNT_SERVER_ASSISTANCES:
            return {
                ...state,
                total_assistances: payload,
                setLoading: false
            }
        case GROUP_BY_REPORTS:
            return {
                ...state,
                group_by_reports: payload,
                setLoading: false
            }
        case COUNT_SERVER_REPORTS:
            return {
                ...state,
                total_reports: payload,
                setLoading: false
            }
        case CLEAR_STATS_ERROR:
            return {
                ...state,
                error: null,
                setLoading: false
            }
        default: return state;
    }
}