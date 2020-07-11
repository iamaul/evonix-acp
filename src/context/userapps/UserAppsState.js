import React, { useReducer } from 'react';
import Swal from 'sweetalert2';

import UserAppsContext from './userAppsContext';
import userAppsReducer from './userAppsReducer';
import {
    GET_ALL_USER_APPS,
    REQUEST_USER_APPS_APPROVAL,
    UPDATE_USER_APPS,
    USER_APPS_ERROR,
    CLEAR_USER_APPS_ERROR
} from '../types';

import api from '../../utils/api';

const Toast = Swal.mixin({
    toast: true,
    position: 'top-end'
});

const UserAppsState = (props) => {
    const INITIAL_STATE = {
        user_apps: null,
        error: null,
        requestUserApps: false,
        setLoading: true
    }

    const [state, dispatch] = useReducer(userAppsReducer, INITIAL_STATE);

    const getAllUserApps = async () => {
        try {
            const res = await api.get('/api/v1/users/application');
            dispatch({ type: GET_ALL_USER_APPS, payload: res.data });
        } catch (error) {
            const errors = error.response.data.errors;
            dispatch({ type: USER_APPS_ERROR, payload: errors });
        }
    }
    
    const updateUserApps = async (status, id, user_id, reason = null) => {
        try {
            // REQUEST START
            dispatch({ type: REQUEST_USER_APPS_APPROVAL });

            const res = await api.put(`/api/v1/users/application/${status}/${id}/${user_id}/${reason}`);
            dispatch({ type: UPDATE_USER_APPS, payload: res.data });

            Toast.fire({
                icon: 'success',
                text: `You have ${status === 2 ? 'denied' : 'approved'} the user's application`
            });
        } catch (error) {
            const errors = error.response.data.errors;
            dispatch({ type: USER_APPS_ERROR, payload: errors });
        }
    }
    
    const clearUserAppsErrors = () => dispatch({ type: CLEAR_USER_APPS_ERROR });
    
    const values = {
        user_apps: state.user_apps,
        error: state.error,
        requestUserApps: state.requestUserApps,
        setLoading: state.setLoading,
        getAllUserApps,
        updateUserApps,
        clearUserAppsErrors
    }

    return (
        <UserAppsContext.Provider value={values}>
            { props.children }
        </UserAppsContext.Provider>
    )
}

export default UserAppsState;