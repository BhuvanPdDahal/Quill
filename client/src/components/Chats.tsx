import React from 'react';

import MainChat from './MainChat';
import MessageInput from './MessageInput';
import Topbar from './Topbar';

interface Socket {
    socket: any;
}

const Chats: React.FC<Socket> = ({ socket }: Socket) => {
    return (
        <div className='flex-1 h-full'>
            <Topbar />
            <MainChat />
            <MessageInput socket={socket} />
        </div>
    )
};

export default Chats;