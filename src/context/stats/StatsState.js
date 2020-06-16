import React, { useReducer } from 'react';

import api from '../../utils/api';
import StatsContext from './statsContext';
import statsReducer from './statsReducer';

import {
    COUNT_SERVER_CHARACTERS,
    COUNT_SERVER_ASSISTANCES,
    COUNT_SERVER_REPORTS,
    GROUP_BY_ASSISTANCES,
    GROUP_BY_REPORTS,
    COUNT_SERVER_ERROR,
    CLEAR_STATS_ERROR
} from '../types';

export const useStats = () => {
    const { state, dispatch } = useContext(StatsContext);
    return [state, dispatch];
};

// API Requests
export const getCountServerCharacters = async dispatch => {
    try {
        const res = await api.get('/api/v1/server/stats/characters');
        dispatch({ type: COUNT_SERVER_CHARACTERS, payload: res.data });
    } catch (error) {
        const errors = error.response.data.errors;
        dispatch({ type: COUNT_SERVER_ERROR, payload: errors });
    }
}

export const getCountServerGroupByAssistances = async dispatch => {
    try {
        const res = await api.get('/api/v1/server/stats/assistances/admin');
        dispatch({ type: GROUP_BY_ASSISTANCES, payload: res.data });
    } catch (error) {
        const errors = error.response.data.errors;
        dispatch({ type: COUNT_SERVER_ERROR, payload: errors });
    }
}

export const getCountServerAssistances = async dispatch => {
    try {
        const res = await api.get('/api/v1/server/stats/assistances');
        dispatch({ type: COUNT_SERVER_ASSISTANCES, payload: res.data });
    } catch (error) {
        const errors = error.response.data.errors;
        dispatch({ type: COUNT_SERVER_ERROR, payload: errors });
    }
}

export const getCountServerGroupByReports = async dispatch => {
    try {
        const res = await api.get('/api/v1/server/stats/reports/admin');
        dispatch({ type: GROUP_BY_REPORTS, payload: res.data });
    } catch (error) {
        const errors = error.response.data.errors;
        dispatch({ type: COUNT_SERVER_ERROR, payload: errors });
    }
}

export const getCountServerReports = async dispatch => {
    try {
        const res = await api.get('/api/v1/server/stats/reports');
        dispatch({ type: COUNT_SERVER_REPORTS, payload: res.data });
    } catch (error) {
        const errors = error.response.data.errors;
        dispatch({ type: COUNT_SERVER_ERROR, payload: errors });
    }
}

export const clearStatsErrors = dispatch => {
    dispatch({ type: CLEAR_STATS_ERROR });
}

const StatsState = (props) => {
    const INITIAL_STATE = {
        total_characters: null,
        total_assistances: null,
        total_reports: null,
        group_by_assistances: null,
        group_by_reports: null,
        error: null,
        setLoading: true
    }

    const [state, dispatch] = useReducer(statsReducer, INITIAL_STATE);

    return (
        <StatsContext.Provider value={{ state: state, dispatch }}>
            { props.children }
        </StatsContext.Provider>
    )
}

export default StatsState;