import {
    GET_QUIZ_TYPE,
    ADD_QUIZ_TYPE,
    DELETE_QUIZ_TYPE,
    SET_CURRENT_QUIZ_TYPE,
    CLEAR_CURRENT_QUIZ_TYPE,
    UPDATE_QUIZ_TYPE,
    CLEAR_QUIZ_TYPE,
    QUIZ_TYPE_ERROR
} from '../types';

export default (state, action) => {
    const { type, payload } = action;

    switch (type) {
        case GET_QUIZ_TYPE:
            return {
                ...state,
                quiz_types: payload,
                setLoading: false
            }
        case ADD_QUIZ_TYPE:
            return {
                ...state,
                quiz_types: [payload, ...state.quiz_types],
                setLoading: false
            }
        case UPDATE_QUIZ_TYPE:
            return {
                ...state,
                quiz_types: state.quiz_types.map(qt => qt.id === payload.id ? payload : qt),
                setLoading: false
            }
        case DELETE_QUIZ_TYPE:
            return {
                ...state,
                quiz_types: state.quiz_types.filter(qt => qt.id !== payload),
                setLoading: false
            }
        case CLEAR_QUIZ_TYPE:
            return {
                ...state,
                quiz_types: null,
                current_quiz_type: null,
                error: null
            }
        case SET_CURRENT_QUIZ_TYPE:
            return {
                ...state,
                current_quiz_type: payload
            }
        case CLEAR_CURRENT_QUIZ_TYPE:
            return {
                ...state,
                current_quiz_type: null
            }
        case QUIZ_TYPE_ERROR:
            return {
                ...state,
                error: payload
            }
        default: return state;
    }
}