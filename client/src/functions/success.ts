import { Dispatch } from 'redux';

import { AlertAction } from '../interfaces/alert';
import { SHOW_ALERT, HIDE_ALERT } from "../constants";

const handleSuccess = (message: string, dispatch: Dispatch<AlertAction>) => {
    dispatch({ type: SHOW_ALERT, alertType: "success", message });

    setTimeout(() => {
        dispatch({ type: HIDE_ALERT });
    }, 3000);
};

export default handleSuccess;