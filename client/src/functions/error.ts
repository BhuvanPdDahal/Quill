import { Dispatch } from 'redux';
import { AxiosError } from 'axios';

import { AlertAction } from '../interfaces/alert';
import { HIDE_ALERT, SHOW_ALERT } from '../constants';

function isAxiosError(error: any): error is AxiosError {
    return error.isAxiosError === true;
}

const handleError = (error: any, dispatch: Dispatch<AlertAction>) => {
    let errorMessage = "An error occurred";
    
    if (isAxiosError(error)) {
        if (error?.response?.data && typeof error.response.data === 'object' && 'message' in error.response.data) {
            if (typeof error.response.data.message === "string") errorMessage = error.response.data.message;
        }
    }

    dispatch({ type: SHOW_ALERT, message: errorMessage, alertType: 'error' });
    setTimeout(() => {
        dispatch({ type: HIDE_ALERT });
    }, 3000);
};

export default handleError;