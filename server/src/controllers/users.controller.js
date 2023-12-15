import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from '../models/User.js';
import Chat from '../models/Chat.js';

export const signup = async (req, res) => {
    try {
        const { username, emailOrPhoneNum, password } = req.body;
        const userExists = await User.findOne({ emailOrPhoneNum });
        if (userExists) return res.status(400).json({ message: "User with this email or phone number already exists" });
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = await User.create({ username, emailOrPhoneNum, password: hashedPassword });
        const token = jwt.sign({ emailOrPhoneNum, id: newUser._id }, process.env.SECRET_KEY);
        res.status(200).json({ user: newUser, token });

    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "Something went wrong" });
    }
};

export const login = async (req, res) => {
    try {
        const { emailOrPhoneNum, password } = req.body;
        const user = await User.findOne({ emailOrPhoneNum });
        if (!user) return res.status(404).json({ message: "User not found" });
        const passwordIsMatching = await bcrypt.compare(password, user.password);
        if (!passwordIsMatching) return res.status(400).json({ message: "Password is not matching" });
        const token = jwt.sign({ emailOrPhoneNum, id: user._id }, process.env.SECRET_KEY);
        res.status(200).json({ user, token });

    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
};

export const searchUsers = async (req, res) => {
    try {
        const { name } = req.query;
        const { emailOrPhoneNum } = req;
        const value = new RegExp(name, 'i');
        const users = await User.find({ username: value, emailOrPhoneNum: { $ne: emailOrPhoneNum } });
        res.status(200).json({ users });

    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
};

export const sendRequest = async (req, res) => {
    try {
        const { userId: from } = req;
        const { id: to } = req.params;
        const fromUser = await User.findById(from);
        const toUser = await User.findById(to);
        if(!toUser) return res.status(404).json({ message: "User not found" });
        const requestExists = toUser.requests.find((request) => request.toString() === from);
        if(requestExists) return res.status(400).json({ message: "Request already exists" });
        const isFriend = toUser.friends.find((friend) => friend.id.toString() === from );
        if(isFriend) return res.status(400).json({ message: "Cannot send request" });
        toUser.requests.push(fromUser._id);
        await toUser.save();
        res.status(200).json(toUser);

    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
};

export const unsendRequest = async (req, res) => {
    try {
        const { userId: from } = req;
        const { id: to } = req.params;
        const fromUser = await User.findById(from);
        const toUser = await User.findById(to);
        if(!toUser) return res.status(404).json({ message: "User not found" });
        const requestExists = toUser.requests.find((request) => request.toString() === from);
        if(!requestExists) return res.status(400).json({ message: "Request not found" });
        toUser.requests = toUser.requests.filter((request) => request.toString() !== from);
        await toUser.save();
        res.status(200).json(toUser);

    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
};

export const acceptRequest = async (req, res) => {
    try {
        const { userId: to } = req;
        const { id: from } = req.params;
        const toUser = await User.findById(to);
        const fromUser = await User.findById(from);
        if(!fromUser) return res.status(404).json({ message: "User not found" });
        const requestExists = toUser.requests.find((request) => request.toString() === from);
        if(!requestExists) return res.status(404).json({ message: "Request not found" });
        const newChat = await Chat.create({ chatters: { a: from, b: to } });
        toUser.requests = toUser.requests.filter((request) => request.toString() !== from);
        const newFriendForTo = {
            id: fromUser._id,
            chatId: newChat._id,
            name: fromUser.username
        };
        const newFriendForFrom = {
            id: toUser._id,
            chatId: newChat._id,
            name: toUser.username
        };
        toUser.friends.push(newFriendForTo);
        fromUser.friends.push(newFriendForFrom);
        await toUser.save();
        await fromUser.save();
        res.status(200).json({ toUser, fromUser });

    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
};


export const unfriend = async (req, res) => {
    try {
        const { userId: from } = req;
        const { id: to } = req.params;
        const fromUser = await User.findById(from);
        const toUser = await User.findById(to);
        if(!toUser) return res.status(404).json({ message: "User not found" });
        const isFriend = fromUser.friends.find((friend) => friend.id.toString() === to);
        if(!isFriend) return res.status(404).json({ message: "Friend not found" });
        fromUser.friends = fromUser.friends.filter((friend) => friend.id.toString() !== to);
        toUser.friends = toUser.friends.filter((friend) => friend.id.toString() !== from);
        const chatId = isFriend.chatId.toString();
        await Chat.findByIdAndDelete(chatId);
        await fromUser.save();
        await toUser.save();
        res.status(200).json({ toUser, fromUser });

    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
};