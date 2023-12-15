import { Message } from "../interfaces/chat";

export const emitMessage = (socket: any, chatId: string, newChat: Message) => {
    socket.emit('send-message', chatId, newChat);
};