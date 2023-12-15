import { ObjectId } from 'mongodb';

interface Message {
    message: string;
    sender: string;
    sentAt: string;
}

interface Chat {
    chats: Message[];
    chatters: {
        a: ObjectId;
        b: ObjectId;
    }
}

export interface ChatState {
    isLoading: boolean;
    isMiniLoading: boolean;
    chats: Message[];
    chatId: string;
    friendId: string;
    friendName: string;
}

export interface ChatAction {
    type: string;
    for?: string;
    action?: Chat;
}