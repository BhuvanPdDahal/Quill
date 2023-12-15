import axios from 'axios';

import { FormDataProp } from '../interfaces/auth';

const API = axios.create({ baseURL: 'http://localhost:5000/api' });

API.interceptors.request.use((req) => {
    const token = localStorage.getItem('QuillToken');

    if (token) {
        req.headers.authorization = `Bearer ${token}`;
    }
    return req;
});

export const signup = (formData: FormDataProp) => API.post('/users/signup', formData);
export const login = (formData: FormDataProp) => API.post('/users/login', formData);
export const loginWithToken = () => API.post('/users/login-with-token');

export const searchPeople = (searchFor: string, value: string) => API.get(`/users/search?${searchFor}=${value}`);
export const sendRequest = (requestTo: string) => API.post(`/users/send-request/${requestTo}`);
export const acceptRequest = (requestFrom: string) => API.post(`/users/accept-request/${requestFrom}`);
export const unfriend = (friendId: string) => API.post(`/users/unfriend/${friendId}`);
export const unsendRequest = (requestTo: string) => API.post(`/users/unsend-request/${requestTo}`);

export const getChat = (chatId: string) => API.get(`/chats/${chatId}`);
export const sendChat = (chatId: string, message: string) => API.post(`/chats/${chatId}`, { message });