import React, { useReducer } from 'react';
import axios from 'axios';

import QuizTypeContext from './quizTypeContext';
import quizTypeReducer from './quizTypeReducer';

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

const QuizTypeState = (props) => {
    const INITIAL_STATE = {
        quiz_types: null,
        current_quiz_type: null,
        setLoading: true,
        error: null
    }

    const [state, dispatch] = useReducer(quizTypeReducer, INITIAL_STATE);

    // API Requests
    const getQuizTypes = async () => {
        try {
            const res = await axios.get('/api/v1/quiz/type');
            dispatch({ type: GET_QUIZ_TYPE, payload: res.data });
        } catch (error) {
            const errors = error.response.data.errors;
            dispatch({ type: QUIZ_TYPE_ERROR, payload: errors });
        }
    }

    const addQuizType = async quizType => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        try {
            const res = await axios.post('/api/v1/quiz/type', quizType, config);
            dispatch({ type: ADD_QUIZ_TYPE, payload: res.data });
        } catch (error) {
            const errors = error.response.data.errors;
            dispatch({ type: QUIZ_TYPE_ERROR, payload: errors });
        }
    }

    const deleteQuizType = async id => {
        try {
            await axios.delete(`/api/v1/quiz/type/${id}`);
            dispatch({ type: DELETE_QUIZ_TYPE, payload: id });
        } catch (error) {
            const errors = error.response.data.errors;
            dispatch({ type: QUIZ_TYPE_ERROR, payload: errors });
        }
    }

    const updateQuizType = async quizType => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        try {
            const res = await axios.put(`/api/v1/quiz/type/${quizType.id}`, quizType, config);
            dispatch({ type: UPDATE_QUIZ_TYPE, payload: res.data });
        } catch (error) {
            const errors = error.response.data.errors;
            dispatch({ type: QUIZ_TYPE_ERROR, payload: errors });
        }
    }

    const clearQuizType = () => {
        dispatch({ type: CLEAR_QUIZ_TYPE });
    }

    const setCurrentQuizType = quizType => {
        dispatch({ type: SET_CURRENT_QUIZ_TYPE, payload: quizType });
    }

    const clearCurrentQuizType = () => {
        dispatch({ type: CLEAR_CURRENT_QUIZ_TYPE });
    }

    const clearQuizTypeErrors = () => {
        dispatch({ type: CLEAR_QUIZ_TYPE_ERROR });
    }

    return (
        <QuizTypeContext.Provider
            value={{
                quiz_types: state.quiz_types,
                current_quiz_type: state.current_quiz_type,
                error: state.error,
                addQuizType,
                deleteQuizType,
                setCurrentQuizType,
                clearCurrentQuizType,
                updateQuizType,
                getQuizTypes,
                clearQuizType,
                clearQuizTypeErrors
            }}
        >
            { props.children }
        </QuizTypeContext.Provider>
    )
}

export default QuizTypeState;