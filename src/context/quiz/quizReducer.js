import {
    GET_ALL_QUIZ,
    ADD_QUIZ,
    DELETE_QUIZ,
    SET_CURRENT_QUIZ,
    CLEAR_CURRENT_QUIZ,
    UPDATE_QUIZ,
    CLEAR_QUIZ,
    QUIZ_ERROR,
    CLEAR_QUIZ_ERROR
} from '../types';

export default (state, action) => {
    const { type, payload } = action;

    switch (type) {
        case GET_ALL_QUIZ:
            return {
                ...state,
                quizzes: payload,
                setLoading: false
            }
        case ADD_QUIZ:
            return {
                ...state,
                quizzes: [payload, ...state.quizzes],
                setLoading: false
            }
        case UPDATE_QUIZ:
            return {
                ...state,
                quizzes: state.quizzes.map(quiz => quiz.id === payload.id ? payload : quiz),
                setLoading: false
            }
        case DELETE_QUIZ:
            return {
                ...state,
                quizzes: state.quizzes.filter(quiz => quiz.id !== payload),
                setLoading: false
            }
        case CLEAR_QUIZ:
            return {
                ...state,
                quizzes: null,
                current_quiz: null,
                error: null
            }
        case SET_CURRENT_QUIZ:
            return {
                ...state,
                current_quiz: payload
            }
        case CLEAR_CURRENT_QUIZ:
            return {
                ...state,
                current_quiz: null
            }
        case QUIZ_ERROR:
            return {
                ...state,
                error: payload
            }
        case CLEAR_QUIZ_ERROR:
            return {
                ...state,
                error: null
            }
        default: return state;
    }
}