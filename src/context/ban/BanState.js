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

const BanState = (props) => {
    const INITIAL_STATE = {
        banlist: null,
        error: null,
        setLoading: true
    }

    const [state, dispatch] = useReducer(banReducer, INITIAL_STATE);

    const getBanlist = async () => {
        try {
            const res = await api.get('/api/v1/ban');
            dispatch({ type: GET_ALL_BAN_LIST, payload: res.data });
        } catch (error) {
            const errors = error.response.data.errors;
            dispatch({ type: BAN_ERROR, payload: errors });
        }
    }
    
    const deleteBan = async id => {
        try {
            await api.delete(`/api/v1/ban/${id}`);
            dispatch({ type: DELETE_BAN, payload: id });
        } catch (error) {
            const errors = error.response.data.errors;
            dispatch({ type: BAN_ERROR, payload: errors });
        }
    }
    
    const clearBanErrors = () => dispatch({ type: CLEAR_BAN_ERROR });

    const values = {
        banlist: state.banlist,
        error: state.error,
        setLoading: state.setLoading,
        getBanlist,
        deleteBan,
        clearBanErrors
    }

    return (
        <BanContext.Provider value={values}>
            { props.children }
        </BanContext.Provider>
    )
}

export default BanState;