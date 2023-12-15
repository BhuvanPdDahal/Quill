import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { State } from 'store';
import LoadingImg from '../images/loading2.gif';
import { sendChat } from '../actions/chat';
import BlackLogo from '../images/black-logo.png';

interface Socket {
    socket: any;
}

const MessageInput: React.FC<Socket> = ({ socket }: Socket) => {
    const dispatch: any = useDispatch();
    const [message, setMessage] = useState('');

    const sendMessage = () => {
        dispatch(sendChat(chatId, message, socket));
        setMessage('');
    };

    const handleKeyDown = (e: any) => {
        if(e.key === "Enter") sendMessage();
    };

    const { chatId, isMiniLoading } = useSelector((state: State) => state.chat);
    const { friends } = useSelector((state: State) => state.auth)?.authData?.user;

    return (
        <div className={`h-50px shadow-btn relative z-10 rounded-md overflow-hidden transition-shadow duration-200 ${friends.length ? 'hover:shadow-normal' : 'flex items-center justify-center'}`}>
            {friends.length ? (
                <>
                    <input onChange={(e) => setMessage(e.target.value)} onKeyDown={handleKeyDown} value={message} className='h-full w-full outline-none pl-4 pr-[60px]' type="text" placeholder='Type message' />
                    <div onClick={sendMessage} className='absolute top-0 right-0 h-50px w-50px flex items-center justify-center bg-gradient-to-r from-sky-500 to-indigo-500 cursor-pointer'>
                        {isMiniLoading ? (
                            <img className='h-30px' src={LoadingImg} alt="..." />
                        ) : (
                            <i className="fa-solid fa-paper-plane text-lightgrey text-xl"></i>
                        )}
                    </div>
                </>
            ) : (
                <div className='text-center'>
                    <span>Make the most out of </span>
                    <img className='h-30px inline' src={BlackLogo} alt="Qull" />
                    <span> by making new friends or reconnecting with old friends.</span>
                </div>
            )}
        </div>
    )
};

export default MessageInput;