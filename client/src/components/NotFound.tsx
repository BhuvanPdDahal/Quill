import React from 'react';

import NotFoundImg from '../images/not-found.jpg';

const NotFound: React.FC = () => {
    return (
        <div className='h-mpage flex flex-col items-center justify-center gap-1'>
            <img className='h-400px' src={NotFoundImg} alt="Page not found" />
            <h2 className='text-lg text-darkgrey'>Page not found!</h2>
        </div>
    )
};

export default NotFound;