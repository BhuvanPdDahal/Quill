import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    emailOrPhoneNum: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    friends: {
        type: [{
            id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
            chatId: { type: mongoose.Schema.Types.ObjectId, ref: 'Chat', required: true },
            name: { type: String, required: true },
            lastChat: {
                message: { type: String, default: 'Start a conversation' },
                sender: { type: String, default: '' },
                sentAt: { type: Date, default: new Date() }
            }
        }],
        default: []
    },
    requests: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }],
        default: []
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
});

const User = mongoose.model('User', UserSchema);
export default User;