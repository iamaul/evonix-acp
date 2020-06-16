import React, { useReducer } from 'react';

import history from '../../components/history';
import api from '../../utils/api';
import QuizContext from './quizContext';
import quizReducer from './quizReducer';

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

export const useQuiz = () => {
    const { state, dispatch } = useContext(QuizContext);
    return [state, dispatch];
};

// API Requests
const getAllQuiz = async dispatch => {
    try {
        const res = await api.get('/api/v1/quiz');
        dispatch({ type: GET_ALL_QUIZ, payload: res.data });
    } catch (error) {
        const errors = error.response.data.errors;
        dispatch({ type: QUIZ_ERROR, payload: errors });
    }
}

const addQuiz = async (dispatch, quiz) => {
    try {
        const res = await api.post('/api/v1/quiz', quiz);
        dispatch({ type: ADD_QUIZ, payload: res.data });
        history.push('/quiz');
    } catch (error) {
        const errors = error.response.data.errors;
        dispatch({ type: QUIZ_ERROR, payload: errors });
    }
}

const updateQuiz = async (dispatch, quiz) => {
    try {
        const res = await api.put(`/api/v1/quiz/${quiz.id}`, quiz);
        dispatch({ type: UPDATE_QUIZ, payload: res.data });
        history.push('/quiz');
    } catch (error) {
        const errors = error.response.data.errors;
        dispatch({ type: QUIZ_ERROR, payload: errors });
    }
}

const deleteQuiz = async (dispatch, id) => {
    try {
        await api.delete(`/api/v1/quiz/${id}`);
        dispatch({ type: DELETE_QUIZ, payload: id });
    } catch (error) {
        const errors = error.response.data.errors;
        dispatch({ type: QUIZ_ERROR, payload: errors });
    }
}

const clearQuiz = dispatch => {
    dispatch({ type: CLEAR_QUIZ });
}

const setCurrentQuiz = (dispatch, quiz) => {
    dispatch({ type: SET_CURRENT_QUIZ, payload: quiz });
}

const clearCurrentQuiz = dispatch => {
    dispatch({ type: CLEAR_CURRENT_QUIZ });
}

const clearQuizErrors = dispatch => {
    dispatch({ type: CLEAR_QUIZ_ERROR });
}

const QuizState = (props) => {
    const INITIAL_STATE = {
        quizzes: null,
        current_quiz: null,
        setLoading: true,
        error: null
    }

    const [state, dispatch] = useReducer(quizReducer, INITIAL_STATE);

    return (
        <QuizContext.Provider value={{ state: state, dispatch }}>
            { props.children }
        </QuizContext.Provider>
    )
}

export default QuizState;