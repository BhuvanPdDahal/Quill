import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ChatLoader from './ChatLoader';
import { State } from '../interfaces/store';
import { Message } from '../interfaces/chat';
import { getChat } from '../actions/chat';
import { END_LOADING, CHAT, REMOVE_CHAT } from '../constants';
import MakeFriendsImg from '../images/make-friends.jpg';
import StartConversationImg from '../images/start-conversation.jpg';

{/* <div className='chat incoming-chat'>
Hello  hello wwwwww
</div> */}

const MainChat: React.FC = () => {
    const bottomRef = useRef<HTMLDivElement>(null);
    const dispatch: any = useDispatch();

    useEffect(() => {
        if(user.friends.length) {
            console.log('dispatching get chat');
            
            dispatch(getChat(user.friends[0].chatId.toString()));
        } else {
            dispatch({ type: END_LOADING, for: CHAT });
        }

        return () => {
            dispatch({ type: REMOVE_CHAT });
        };
    }, []);

    const user = useSelector((state: State) => state.auth)?.authData?.user;
    const { isLoading, chats } = useSelector((state: State) => state.chat);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [chats]);

    if (isLoading) return <ChatLoader />

    return (
        <div className='h-chats overflow-auto py-4 flex flex-col items-start gap-3'>
            {chats?.length ? (
                <>
                    {chats.map((chat: Message, index: number) => (
                        <div key={index} className={`chat ${chat.sender === user._id.toString() ? "outgoing-chat" : "incoming-chat"}`}>
                            {chat.message}
                        </div>
                    ))}
                    <div ref={bottomRef}></div>
                </>
            ) : (
                <div className='h-full w-full flex flex-col items-center justify-center gap-1'>
                    <img className='h-400px' src={user.friends.length ? StartConversationImg : MakeFriendsImg} alt="" />
                    <p>{user.friends.length ? "Start a conversation" : "Make friends to chat"}</p>
                </div>
            )}
        </div>
    )
};

export default MainChat;