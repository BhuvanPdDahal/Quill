import { useEffect } from "react";

import useAuth from "../hooks/useAuth";
import { Friend } from "../interfaces/store";
import { AuthAction, AuthState } from "../interfaces/auth";
import { START_LOADING, END_LOADING, AUTH, SIGNUP, LOGIN, LOGOUT, UPDATE_USER, UPDATE_LAST_CHAT } from "../constants";

const initialState = {
    authData: null,
    isLoading: false
};

const authReducer = (state: AuthState = initialState, action: AuthAction) => {
    let newAuthData;

    switch (action.type) {
        case START_LOADING:
            if (action?.for !== AUTH) return state;
            return { ...state, isLoading: true };
        case END_LOADING:
            if (action?.for !== AUTH) return state;
            return { ...state, isLoading: false };
        case SIGNUP:
        case LOGIN:
            localStorage.setItem('QuillToken', action?.data?.token || '');
            return { ...state, authData: action?.data };
        case LOGOUT:
            localStorage.removeItem('QuillToken');
            return { ...state, authData: null };
        case UPDATE_USER:
            newAuthData = { token: state?.authData?.token, user: action?.data };
            localStorage.setItem('userProfileQuill', JSON.stringify(newAuthData));
            return { ...state, authData: newAuthData };
        case UPDATE_LAST_CHAT:
            const newLastChat = action?.newLastChat;
            const newFriends = state?.authData?.user.friends.map((friend: Friend) => friend.chatId.toString() === action?.chatId ? { ...friend, lastChat: newLastChat } : friend);
            newAuthData = { ...state.authData, user: { ...state?.authData?.user, friends: newFriends } };
            localStorage.setItem('userProfileQuill', JSON.stringify(newAuthData));
            return { ...state, authData: newAuthData };
        default:
            return state;
    }
};

export default authReducer;