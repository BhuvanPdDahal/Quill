import React from 'react';
import { useSelector } from 'react-redux';
import { useLocation, Link } from 'react-router-dom';

import { State } from 'store';
import Logo from '../images/main-logo.png';
import ProfileImg from '../images/profile.png';

const Navbar: React.FC = () => {
    const location = useLocation();
    const isLogging = location.pathname.includes('/auth');

    const user = useSelector((state: State) => state.auth)?.authData?.user;

    if(isLogging) return <></>

    return (
        <nav className='flex items-center justify-between shadow-nav px-3 h-65px'>
            <div>
                <img className='h-50px' src={Logo} alt="Quill" />
            </div>
            <div className='flex items-center gap-10'>
                <div className='flex items-center gap-2'>
                <img className='h-40px w-40px object-cover rounded-full' src={ProfileImg} alt="img" />
                <h3 className='font-medium text-[17px]'>{user?.username}</h3>
                </div>
                <Link to='/auth' className='bg-gradient-to-r from-sky-500 to-indigo-500 py-3 px-4 text-white rounded-[3px]'>Login</Link>
            </div>
        </nav>
    );
};

export default Navbar;