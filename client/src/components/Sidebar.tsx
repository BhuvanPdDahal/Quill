import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import moment from 'moment';

import Loader from './Loader';
import Profile from './Profile';
import Searchbar from './Searchbar';
import { getChat } from '../actions/chat';
import LoadingImg from '../images/loading2.gif';
import { PEOPLE_TAB, GROUPS_TAB } from '../constants';
import { State, Friend } from '../interfaces/store';
import { sendRequest, acceptRequest, unfriend, unsendRequest } from '../actions/people';

const Sidebar: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch: any = useDispatch();
    const [activeTab, setActiveTab] = useState('people');
    const [clickedPerson, setClickedPerson] = useState<string>('');
    const [isSearching, setIsSearching] = useState(location.pathname.includes('/search'));

    const handleClickOnPeopleTab = () => {
        setActiveTab(PEOPLE_TAB);
        navigate('/');
    };

    const handleClickOnGroupsTab = () => {
        setActiveTab(GROUPS_TAB);
        navigate('/');
    };

    const addFriend = (id: string, haveReceivedRequest: boolean) => {
        setClickedPerson(id);

        if(haveReceivedRequest) {
            dispatch(acceptRequest(id));
        } else {
            dispatch(sendRequest(id));
        }
    };

    const removeFriend = (id: string, isFriend: boolean) => {
        setClickedPerson(id);

        if(isFriend) {
            dispatch(unfriend(id));
        } else {
            dispatch(unsendRequest(id));
        }
    };

    const displayAnotherChat = (chatId: string, userId: string) => {
        if(friendId === userId) return;
        dispatch(getChat(chatId));
    };

    const user = useSelector((state: State) => state.auth)?.authData?.user;
    const { isLoading, people, isMiniLoading } = useSelector((state: State) => state.people);
    const { friendId } = useSelector((state: State) => state.chat);

    useEffect(() => {
        setIsSearching(location.pathname.includes('/search'));
    }, [location]);

    return (
        <div className='h-full w-400px rounded-md shadow-normal p-3'>
            <div className='flex gap-3 pb-2 border-b border-solid border-grey'>
                <div onClick={handleClickOnPeopleTab} className={`sidebar-top ${activeTab === PEOPLE_TAB && 'bg-gradient-to-r from-purple-500 to-pink-500 text-lightgrey'}`}>
                    <i className="fa-solid fa-user-group"></i>
                    <h3>People</h3>
                </div>
                <div onClick={handleClickOnGroupsTab} className={`sidebar-top && ${activeTab === GROUPS_TAB && 'bg-gradient-to-r from-purple-500 to-pink-500 text-lightgrey'}`}>
                    <i className="fa-solid fa-people-roof"></i>
                    <h3>Groups</h3>
                </div>
            </div>
            <Searchbar activeTab={activeTab} />
            {isSearching
                ? isLoading
                    ? <Loader />
                    : (
                        <ul className='pt-3 h-list overflow-auto'>
                            {people.length ? (
                                people.map((person) => {
                                    const isFriend = user?.friends.find((friend: Friend) => friend.id === person._id);
                                    let hasSentRequest = false;
                                    if(!isFriend) hasSentRequest = person.requests.find((request) => request === user?._id);
                                    let haveReceivedRequest = false;
                                    if(!hasSentRequest) haveReceivedRequest = user?.requests.find((request: any) => request === person._id);
                                    return (
                                        <li key={person._id} className='sidebar-item'>
                                            <Profile activeTab={activeTab} />
                                            <div className='flex-1'>
                                                <h3 className='font-medium text-[17px]'>{person?.username}</h3>
                                                {isFriend || hasSentRequest ? (
                                                    <button onClick={() => removeFriend(person._id.toString(), isFriend ? true : false)} className='bg-gradient-to-r from-purple-500 to-pink-500 py-1 px-4 w-full text-white rounded-[3px]'>
                                                        {isMiniLoading && clickedPerson === person._id.toString() ? (
                                                            <><img className='h-20px inline' src={LoadingImg} alt="..." /> {isFriend ? "Unfriending..." : "Unsending friend request..."}</>
                                                        ) : (
                                                            <><i className="fa-solid fa-user-minus"></i> {isFriend ? "Unfriend" : "Unsend friend request"}</>
                                                        )}
                                                    </button>
                                                ) : (
                                                    <button onClick={() => addFriend(person._id.toString(), haveReceivedRequest)} className='bg-gradient-to-r from-sky-500 to-indigo-500 py-1 px-4 w-full text-white rounded-[3px]'>
                                                        {isMiniLoading && clickedPerson === person._id.toString() ? (
                                                            <><img className='h-20px inline' src={LoadingImg} alt="..." /> {haveReceivedRequest ? "Accepting friend request..." : "Sending friend request..."}</>
                                                        ) : (
                                                            <><i className="fa-solid fa-user-plus"></i> {haveReceivedRequest ? "Accept friend request" : "Send friend request"}</>
                                                        )}
                                                    </button>
                                                )}
                                            </div>
                                        </li>
                                    )
                                })
                            ) : (
                                <div className='h-full flex items-center justify-center'>No such people</div>
                            )}
                    </ul>
                ) : (
                    <ul className='pt-3 h-list overflow-auto'>
                        {user?.friends.length ? (
                            user.friends.map((friend: Friend, index: number) => (
                                <li key={friend.id} onClick={() => displayAnotherChat(friend.chatId.toString(), friend.id.toString())} className={`sidebar-item ${friendId === friend.id.toString() && 'active'}`}>
                                    <Profile activeTab={activeTab} />
                                    <div>
                                        <h3 className='font-medium text-[17px]'>{friend?.name}</h3>
                                        <p className='text-darkgrey'>
                                            {friend?.lastChat?.sender
                                                ? `${friend.lastChat.sender === user._id.toString() ? "You: " : ""}${friend.lastChat.message} • ${moment(friend.lastChat.sentAt).calendar()}`
                                                : "Start a conversation"
                                            }
                                        </p>
                                    </div>
                                </li>
                            ))
                        ) : (
                            <div className='h-full flex items-center justify-center'>You have no friends</div>
                        )}
                    </ul>
                )}
        </div>
    )
};

export default Sidebar;