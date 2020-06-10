import React, { useReducer } from 'react';
import axios from 'axios';

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

    // API Requests
    const getCountServerCharacters = async () => {
        try {
            const res = await axios.get('/api/v1/server/stats/characters');
            dispatch({ type: COUNT_SERVER_CHARACTERS, payload: res.data });
        } catch (error) {
            const errors = error.response.data.errors;
            dispatch({ type: COUNT_SERVER_ERROR, payload: errors });
        }
    }

    const getCountServerGroupByAssistances = async () => {
        try {
            const res = await axios.get('/api/v1/server/stats/assistances/admin');
            dispatch({ type: GROUP_BY_ASSISTANCES, payload: res.data });
        } catch (error) {
            const errors = error.response.data.errors;
            dispatch({ type: COUNT_SERVER_ERROR, payload: errors });
        }
    }

    const getCountServerAssistances = async () => {
        try {
            const res = await axios.get('/api/v1/server/stats/assistances');
            dispatch({ type: COUNT_SERVER_ASSISTANCES, payload: res.data });
        } catch (error) {
            const errors = error.response.data.errors;
            dispatch({ type: COUNT_SERVER_ERROR, payload: errors });
        }
    }

    const getCountServerGroupByReports = async () => {
        try {
            const res = await axios.get('/api/v1/server/stats/reports/admin');
            dispatch({ type: GROUP_BY_REPORTS, payload: res.data });
        } catch (error) {
            const errors = error.response.data.errors;
            dispatch({ type: COUNT_SERVER_ERROR, payload: errors });
        }
    }

    const getCountServerReports = async () => {
        try {
            const res = await axios.get('/api/v1/server/stats/reports');
            dispatch({ type: COUNT_SERVER_REPORTS, payload: res.data });
        } catch (error) {
            const errors = error.response.data.errors;
            dispatch({ type: COUNT_SERVER_ERROR, payload: errors });
        }
    }

    const clearStatsErrors = () => {
        dispatch({ type: CLEAR_STATS_ERROR });
    }

    return (
        <StatsContext.Provider
            value={{
                total_characters: state.total_characters,
                total_assistances: state.total_assistances,
                total_reports: state.total_reports,
                error: state.error,
                getCountServerCharacters,
                getCountServerGroupByAssistances,
                getCountServerAssistances,
                getCountServerGroupByReports,
                getCountServerReports,
                clearStatsErrors
            }}
        >
            { props.children }
        </StatsContext.Provider>
    )
}

export default StatsState;