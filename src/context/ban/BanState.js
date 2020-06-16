import React, { useReducer } from 'react';

import api from '../../utils/api';
import BanContext from './banContext';
import banReducer from './banReducer';

import {
    GET_ALL_BAN_LIST,
    DELETE_BAN,
    BAN_ERROR,
    CLEAR_BAN_ERROR
} from '../types';

export const useBan = () => {
    const { state, dispatch } = useContext(BanContext);
    return [state, dispatch];
};

// API Requests
export const getBanlist = async dispatch => {
    try {
        const res = await api.get('/api/v1/ban');
        dispatch({ type: GET_ALL_BAN_LIST, payload: res.data });
    } catch (error) {
        const errors = error.response.data.errors;
        dispatch({ type: BAN_ERROR, payload: errors });
    }
}

export const deleteBan = async (dispatch, id) => {
    try {
        await api.delete(`/api/v1/ban/${id}`);
        dispatch({ type: DELETE_BAN, payload: id });
    } catch (error) {
        const errors = error.response.data.errors;
        dispatch({ type: BAN_ERROR, payload: errors });
    }
}

export const clearBanErrors = dispatch => {
    dispatch({ type: CLEAR_BAN_ERROR });
}

const BanState = (props) => {
    const INITIAL_STATE = {
        banlist: null,
        setLoading: true,
        error: null
    }

    const [state, dispatch] = useReducer(banReducer, INITIAL_STATE);

    return (
        <BanContext.Provider value={{ state: state, dispatch }}>
            { props.children }
        </BanContext.Provider>
    )
}

export default BanState;