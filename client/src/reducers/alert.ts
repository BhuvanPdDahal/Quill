import { AlertAction } from '../interfaces/alert';
import { SHOW_ALERT, HIDE_ALERT } from '../constants';

const initialState = { message: '', type: '', show: false };

const alertReducer = (alert = initialState, action: AlertAction) => {
    switch (action.type) {
        case SHOW_ALERT:
            return { message: action?.message, type: action?.alertType, show: true };
        case HIDE_ALERT:
            return { message: '', type: '', show: false };
        default:
            return alert;
    }
};

export default alertReducer;