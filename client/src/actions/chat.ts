import { useSelector } from 'react-redux';

import * as api from '../api';
import { State } from 'store';
import handleError from '../functions/error';
import handleSuccess from '../functions/success';
import { emitMessage } from '../functions/io';
import { START_LOADING, END_LOADING, START_MINI_LOADING, END_MINI_LOADING, CHAT, GET_CHAT, SEND_CHAT, UPDATE_LAST_CHAT } from "../constants";

export const getChat = (chatId: string) => async (dispatch: any) => {
    try {
        dispatch({ type: START_LOADING, for: CHAT });
        const { data } = await api.getChat(chatId);
        dispatch({ type: GET_CHAT, data });
        dispatch({ type: END_LOADING, for: CHAT });
        
    } catch (error) {
        dispatch({ type: END_LOADING, for: CHAT });
        handleError(error, dispatch);
    }
};

export const sendChat = (chatId: string, message: string, socket: any) => async (dispatch: any) => {
    try {
        dispatch({ type: START_MINI_LOADING, for: CHAT });
        const { data } = await api.sendChat(chatId, message);
        dispatch({ type: SEND_CHAT, data: data?.newChat });
        dispatch({ type: UPDATE_LAST_CHAT, chatId, newLastChat: data?.newLastChat });
        emitMessage(socket, chatId, data?.newChat);
        dispatch({ type: END_MINI_LOADING, for: CHAT });
        
    } catch (error) {
        dispatch({ type: END_MINI_LOADING, for: CHAT });
        handleError(error, dispatch);
    }
};