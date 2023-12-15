import React from "react";
import { useSelector } from 'react-redux';

import { State } from '../interfaces/store';

const AlertBox: React.FC = () => {
    const alert = useSelector((state: State) => state.alert);

    return (
        <div className={`alert-box ${alert.show && "show"}`}>
            <i className={`text-xl fa-solid ${alert.type === "error" ? "fa-triangle-exclamation text-red-500" : "fa-circle-check text-green-500"}`}></i>
            <span className='text-md'>{alert.message}</span>
        </div>
    )
};

export default AlertBox;