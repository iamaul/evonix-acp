import React, { useReducer, useContext } from 'react';

import history from '../../components/history';
import api from '../../utils/api';
import NewsContext from './newsContext';
import newsReducer from './newsReducer';

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

export const useNews = () => {
    const { state, dispatch } = useContext(NewsContext);
    return [state, dispatch];
};

// API Requests
export const getAllNews = async dispatch => {
    try {
        const res = await api.get('/api/v1/news');
        dispatch({ type: GET_ALL_NEWS, payload: res.data });
    } catch (error) {
        const errors = error.response.data.errors;
        dispatch({ type: NEWS_ERROR, payload: errors });
    }
}

export const addNews = async (dispatch, news) => {
    try {
        const res = await api.post('/api/v1/news', news);
        dispatch({ type: ADD_NEWS, payload: res.data });
        history.push('/news');
    } catch (error) {
        const errors = error.response.data.errors;
        dispatch({ type: NEWS_ERROR, payload: errors });
    }
}

export const updateNews = async (dispatch, news) => {
    try {
        const res = await api.put(`/api/v1/news/${news.id}`, news);
        dispatch({ type: UPDATE_NEWS, payload: res.data });
        history.push('/news');
    } catch (error) {
        const errors = error.response.data.errors;
        dispatch({ type: NEWS_ERROR, payload: errors });
    }
}

export const deleteNews = async (dispatch, id) => {
    try {
        await api.delete(`/api/v1/news/${id}`);
        dispatch({ type: DELETE_NEWS, payload: id });
    } catch (error) {
        const errors = error.response.data.errors;
        dispatch({ type: NEWS_ERROR, payload: errors });
    }
}

export const clearNews = dispatch => {
    dispatch({ type: CLEAR_NEWS });
}

export const setCurrentNews = (dispatch, news) => {
    dispatch({ type: SET_CURRENT_NEWS, payload: news });
}

export const clearCurrentNews = dispatch => {
    dispatch({ type: CLEAR_CURRENT_NEWS });
}

export const clearNewsErrors = dispatch => {
    dispatch({ type: CLEAR_NEWS_ERROR });
}

const NewsState = (props) => {
    const INITIAL_STATE = {
        news: null,
        current_news: null,
        setLoading: true,
        error: null
    }

    const [state, dispatch] = useReducer(newsReducer, INITIAL_STATE);

    return (
        <NewsContext.Provider value={{ state: state, dispatch }}>
            { props.children }
        </NewsContext.Provider>
    )
}

export default NewsState;