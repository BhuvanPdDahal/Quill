import { ObjectId } from 'mongodb';

import { AuthState } from "./auth";
import { AlertState } from "./alert";
import { PeopleState } from "./people";
import { ChatState } from "./chat";

export interface State {
    auth: AuthState;
    alert: AlertState;
    people: PeopleState;
    chat: ChatState;
}

interface Friend {
    id: ObjectId;
    chatId: ObjectId;
    name: string;
    lastChat: {
        message: string;
        sender: string;
        sentAt: string;
    }
}

export interface User {
    _id: ObjectId;
    username: string;
    emailOrPhoneNum: string;
    password: string;
    friends: Friend[];
    requests: ObjectId[];
    createdAt: string;
}