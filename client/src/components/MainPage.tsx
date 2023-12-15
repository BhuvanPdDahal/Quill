import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { useDispatch, useSelector } from 'react-redux';

import Sidebar from './Sidebar';
import Chats from './Chats';
import handleSuccess from '../functions/success';
import useAuth from '../hooks/useAuth';
import { SEND_CHAT } from '../constants';
import { Message } from '../interfaces/chat';
import { State } from '../interfaces/store';

interface Data {
    message: Message;
    chatId: string;
}

const MainPage: React.FC = () => {
    useAuth();
    const dispatch: any = useDispatch();
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        const socket: any = io('http://localhost:5000');
        setSocket(socket);

        socket.on('connect', () => {
            socket.emit('join-rooms', friends);
        });

        // Listen for events emitted by the server
        socket.on('receive-message', (data: Data) => {
            // if(chatId === data?.chatId) {
                dispatch({ type: SEND_CHAT, data: data?.message });
            // } else {
            //     handleSuccess('You have a new message', dispatch);
            // }
        });

        return () => {
            if(socket) socket.disconnect();
        };
    }, []);

    const { chatId } = useSelector((state: State) => state.chat);
    const user = useSelector((state: State) => state.auth)?.authData?.user;
    const friends = user?.friends;

    return (
        <div className='h-mpage flex gap-4 flex-grow-1 p-4'>
            <Sidebar />
            <Chats socket={socket} />
        </div>
    )
}

export default MainPage;