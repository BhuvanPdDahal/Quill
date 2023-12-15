import { Dispatch } from 'redux';

import * as api from '../api';
import handleError from '../functions/error';
import handleSuccess from '../functions/success';
import { AlertAction } from '../interfaces/alert';
import { FormDataProp, AuthAction } from "../interfaces/auth";
import { START_LOADING, END_LOADING, AUTH, SIGNUP, LOGIN, LOGIN_SUCCESS, SIGNUP_SUCCESS } from '../constants';

export const signup = (formData: FormDataProp, navigate: any) => async (dispatch: Dispatch<AuthAction | AlertAction>) => {
    try {
        dispatch({ type: START_LOADING, for: AUTH });
        const { data } = await api.signup(formData);
        dispatch({ type: SIGNUP, data });
        dispatch({ type: END_LOADING, for: AUTH });
        handleSuccess(SIGNUP_SUCCESS, dispatch);
        navigate('/');
        
    } catch (error) {
        dispatch({ type: END_LOADING, for: AUTH });
        handleError(error, dispatch);
    }
};

export const login = (formData: FormDataProp, navigate: any) => async (dispatch: Dispatch<AuthAction | AlertAction>) => {
    try {
        dispatch({ type: START_LOADING, for: AUTH });
        const { data } = await api.login(formData);
        dispatch({ type: LOGIN, data });
        dispatch({ type: END_LOADING, for: AUTH });
        handleSuccess(LOGIN_SUCCESS, dispatch);
        navigate('/');
        
    } catch (error) {
        dispatch({ type: END_LOADING, for: AUTH });
        handleError(error, dispatch);
    }
};

export const loginWithToken = () => async (dispatch: Dispatch<AuthAction | AlertAction>) => {
    try {
        const { data } = await api.loginWithToken();
        dispatch({ type: LOGIN, data });
        
    } catch (error) {
        handleError(error, dispatch);
    }
};