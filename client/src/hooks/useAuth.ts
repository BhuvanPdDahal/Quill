import { useDispatch } from "react-redux";

import { loginWithToken } from "../actions/auth";

const useAuth = () => {
    const dispatch: any = useDispatch();

        const token = localStorage.getItem('QuillToken');
        if (token) {
            dispatch(loginWithToken());
        }

    return {};
};

export default useAuth;