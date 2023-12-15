import { ObjectId } from 'mongodb';

import { User } from './store';
import { Message } from './chat';

export interface FormDataProp {
    username: string;
    emailOrPhoneNum: string;
    password: string;
}

export interface AuthAction {
    type: string;
    for?: string;
    chatId?: string;
    newLastChat?: Message;
    data?: {
        token: string;
        user: User;
    }
}

export interface AuthState {
    authData: {
        token: string;
        user: User;
    } | null;
    isLoading: boolean;
}