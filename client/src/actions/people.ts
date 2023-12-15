import * as api from '../api';
import handleError from '../functions/error';
import handleSuccess from '../functions/success';
import { START_LOADING, END_LOADING, START_MINI_LOADING, END_MINI_LOADING, PEOPLE, SEARCH_PEOPLE, UPDATE_USER, FRIEND_REQUEST } from "../constants";

export const searchPeople = (searchFor: string, searchValue: string) => async (dispatch: any) => {
    try {
        dispatch({ type: START_LOADING, for: PEOPLE });
        const { data } = await api.searchPeople(searchFor, searchValue);
        dispatch({ type: SEARCH_PEOPLE, data: data.users });
        dispatch({ type: END_LOADING, for: PEOPLE });

    } catch (error) {
        dispatch({ type: END_LOADING, for: PEOPLE });
        handleError(error, dispatch);
    }
};

export const sendRequest = (requestTo: string) => async (dispatch: any) => {
    try {
        dispatch({ type: START_MINI_LOADING, for: PEOPLE });
        const { data } = await api.sendRequest(requestTo);
        dispatch({ type: FRIEND_REQUEST, data });
        dispatch({ type: END_MINI_LOADING, for: PEOPLE });
        handleSuccess("Request sent successfully", dispatch);
        
    } catch (error) {
        dispatch({ type: END_MINI_LOADING });
        handleError(error, dispatch);
    }
};

export const unsendRequest = (requestTo: string) => async (dispatch: any) => {
    try {
        dispatch({ type: START_MINI_LOADING, for: PEOPLE });
        const { data } = await api.unsendRequest(requestTo);
        dispatch({ type: FRIEND_REQUEST, data });
        dispatch({ type: END_MINI_LOADING, for: PEOPLE });
        handleSuccess("Request unsent successfully", dispatch);
        
    } catch (error) {
        dispatch({ type: END_MINI_LOADING, for: PEOPLE });
        handleError(error, dispatch);
    }
};

export const acceptRequest = (requestFrom: string) => async (dispatch: any) => {
    try {
        dispatch({ type: START_MINI_LOADING, for: PEOPLE });
        const { data } = await api.acceptRequest(requestFrom);
        dispatch({ type: UPDATE_USER, data: data?.  toUser });
        dispatch({ type: FRIEND_REQUEST, data: data?.fromUser });
        dispatch({ type: END_MINI_LOADING, for: PEOPLE });
        handleSuccess("Request accepted successfully", dispatch);
        
    } catch (error) {
        dispatch({ type: END_MINI_LOADING, for: PEOPLE });
        handleError(error, dispatch);
    }
};

export const unfriend = (friendId: string) => async (dispatch: any) => {
    try {
        dispatch({ type: START_MINI_LOADING, for: PEOPLE });
        const { data } = await api.unfriend(friendId);
        dispatch({ type: UPDATE_USER, data: data?.fromUser });
        dispatch({ type: FRIEND_REQUEST, data: data?.toUser });
        dispatch({ type: END_MINI_LOADING, for: PEOPLE });
        handleSuccess("Unfriended successfully", dispatch);
        
    } catch (error) {
        dispatch({ type: END_MINI_LOADING, for: PEOPLE });
        handleError(error, dispatch);
    }
};