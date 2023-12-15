import mongoose from "mongoose";

const ChatSchema = new mongoose.Schema({
    chats: {
        type: [{
            message: { type: String, required: true },
            sender: { type: String, required: true },
            sentAt: { type: Date, default: new Date() }
        }],
        default: []
    },
    chatters: {
        a: { type: String, required: true },
        b: { type: String, required: true }
    }
});

const Chat = mongoose.model('Chat', ChatSchema);
export default Chat;