import React from 'react';
import { useSelector } from 'react-redux';
import ProfileImg from '../images/profile.png';
import { State } from 'store';

const Topbar: React.FC = () => {
    const { friendName } = useSelector((state: State) => state.chat);

    return (
        <div className='h-50px flex items-center justify-between px-5 shadow-btn rounded-md relative z-10'>
            <div className='flex items-center gap-3'>
                {friendName && (
                    <>
                        <img className='h-40px w-40px object-cover rounded-full' src={ProfileImg} alt="img" />
                        <h3 className='font-medium text-[17px]'>{friendName}</h3>
                    </>
                )}
            </div>
            <div className='flex items-center gap-2'>
                <i className="fa-solid fa-comments text-xl text-darkgrey"></i>
                <h1 className='text-[19px] font-medium'>Chats</h1>
            </div>
        </div>
    )
};

export default Topbar;