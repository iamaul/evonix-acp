import React, { useReducer } from 'react';

import history from '../../components/history';

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

import api from '../../utils/api';

const NewsState = (props) => {
    const INITIAL_STATE = {
        news: null,
        current_news: null,
        error: null,
        setLoading: true
    }

    const [state, dispatch] = useReducer(newsReducer, INITIAL_STATE);

    const getAllNews = async () => {
        try {
            const res = await api.get('/api/v1/news');
            dispatch({ type: GET_ALL_NEWS, payload: res.data });
        } catch (error) {
            const errors = error.response.data.errors;
            dispatch({ type: NEWS_ERROR, payload: errors });
        }
    }
    
    const addNews = async news => {
        try {
            const res = await api.post('/api/v1/news', news);
            dispatch({ type: ADD_NEWS, payload: res.data });
            history.push('/news');
        } catch (error) {
            const errors = error.response.data.errors;
            dispatch({ type: NEWS_ERROR, payload: errors });
        }
    }
    
    const updateNews = async news => {
        try {
            const res = await api.put(`/api/v1/news/${news.id}`, news);
            dispatch({ type: UPDATE_NEWS, payload: res.data });
            history.push('/news');
        } catch (error) {
            const errors = error.response.data.errors;
            dispatch({ type: NEWS_ERROR, payload: errors });
        }
    }
    
    const deleteNews = async id => {
        try {
            await api.delete(`/api/v1/news/${id}`);
            dispatch({ type: DELETE_NEWS, payload: id });
        } catch (error) {
            const errors = error.response.data.errors;
            dispatch({ type: NEWS_ERROR, payload: errors });
        }
    }
    
    const clearNews = () => dispatch({ type: CLEAR_NEWS });
    const setCurrentNews = news => dispatch({ type: SET_CURRENT_NEWS, payload: news });
    const clearCurrentNews = () => dispatch({ type: CLEAR_CURRENT_NEWS });
    const clearNewsErrors = () => dispatch({ type: CLEAR_NEWS_ERROR });

    const values = {
        news: state.news,
        current_news: state.current_news,
        error: state.error,
        setLoading: state.setLoading,
        getAllNews,
        addNews,
        updateNews,
        deleteNews,
        clearNews,
        setCurrentNews,
        clearCurrentNews,
        clearNewsErrors
    }

    return (
        <NewsContext.Provider value={values}>
            { props.children }
        </NewsContext.Provider>
    )
}

export default NewsState;