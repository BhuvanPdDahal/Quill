import Chat from '../models/Chat.js';
import User from '../models/User.js';

export const addChat = async (req, res) => {
    try {
        const { userId } = req;
        const { message } = req.body;
        const { id: chatId } = req.params;
        const chat = await Chat.findById(chatId);
        if(!chat) return res.status(404).json({ message: "Chat not found" });
        if(userId !== chat.chatters.a && userId !== chat.chatters.b) return res.status(403).json({ message: "Not allowed" });
        const receiverId = chat.chatters.a !== userId ? chat.chatters.a : chat.chatters.b;
        const sender = await User.findById(userId);
        const receiver = await User.findById(receiverId);
        const newChat = { message, sender: userId };
        chat.chats.push(newChat);
        await chat.save();
        const chatLength = chat.chats.length;
        const newLastChat = { message, sender: userId, sentAt: chat.chats[chatLength - 1].sentAt };
        sender.friends = sender.friends.map((friend) => friend.chatId.toString() === chatId ? { ...friend, lastChat: newLastChat } : friend);
        receiver.friends = receiver.friends.map((friend) => friend.chatId.toString() === chatId ? { ...friend, lastChat: newLastChat } : friend);
        await sender.save();
        await receiver.save();
        console.log(chat.chats[chatLength - 1]);
        res.status(200).json({ newChat: chat.chats[chatLength - 1], newLastChat });
        
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "Something went wrong" });
    }
};

export const getChat = async (req, res) => {
    try {
        const { userId } = req;
        const { id: chatId } = req.params;
        const chat = await Chat.findById(chatId);
        if(!chat) return res.status(404).json({ message: "Chat not found" });
        if(userId !== chat.chatters.a && userId !== chat.chatters.b) return res.status(403).json({ message: "Not allowed" });
        const friendId = chat.chatters.a !== userId ? chat.chatters.a : chat.chatters.b;
        const friend = await User.findById(friendId);
        res.status(200).json({ chats: chat.chats, chatId, name: friend.username, friendId });
        
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
};