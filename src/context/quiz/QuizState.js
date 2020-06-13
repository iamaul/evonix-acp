import React, { useReducer } from 'react';

import history from '../../components/history';
import api from '../../api/api';
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

const QuizState = (props) => {
    const INITIAL_STATE = {
        quizzes: null,
        current_quiz: null,
        setLoading: true,
        error: null
    }

    const [state, dispatch] = useReducer(quizReducer, INITIAL_STATE);

    // API Requests
    const getAllQuiz = async () => {
        try {
            const res = await api.get('quiz');
            dispatch({ type: GET_ALL_QUIZ, payload: res.data });
        } catch (error) {
            const errors = error.response.data.errors;
            dispatch({ type: QUIZ_ERROR, payload: errors });
        }
    }

    const addQuiz = async quiz => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        try {
            const res = await api.post('quiz', quiz, config);
            dispatch({ type: ADD_QUIZ, payload: res.data });
            history.push('/quiz');
        } catch (error) {
            const errors = error.response.data.errors;
            dispatch({ type: QUIZ_ERROR, payload: errors });
        }
    }

    const updateQuiz = async quiz => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        try {
            const res = await api.put(`quiz/${quiz.id}`, quiz, config);
            dispatch({ type: UPDATE_QUIZ, payload: res.data });
            history.push('/quiz');
        } catch (error) {
            const errors = error.response.data.errors;
            dispatch({ type: QUIZ_ERROR, payload: errors });
        }
    }

    const deleteQuiz = async id => {
        try {
            await api.delete(`quiz/${id}`);
            dispatch({ type: DELETE_QUIZ, payload: id });
        } catch (error) {
            const errors = error.response.data.errors;
            dispatch({ type: QUIZ_ERROR, payload: errors });
        }
    }

    const clearQuiz = () => {
        dispatch({ type: CLEAR_QUIZ });
    }

    const setCurrentQuiz = quiz => {
        dispatch({ type: SET_CURRENT_QUIZ, payload: quiz });
    }

    const clearCurrentQuiz = () => {
        dispatch({ type: CLEAR_CURRENT_QUIZ });
    }

    const clearQuizErrors = () => {
        dispatch({ type: CLEAR_QUIZ_ERROR });
    }

    return (
        <QuizContext.Provider
            value={{
                quizzes: state.quizzes,
                current_quiz: state.current_quiz,
                error: state.error,
                addQuiz,
                deleteQuiz,
                setCurrentQuiz,
                clearCurrentQuiz,
                updateQuiz,
                getAllQuiz,
                clearQuiz,
                clearQuizErrors
            }}
        >
            { props.children }
        </QuizContext.Provider>
    )
}

export default QuizState;