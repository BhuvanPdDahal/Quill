import React from 'react';

import LoadingImg from '../images/loading.gif';

const Loader: React.FC = () => {
    return (
        <div className='h-list flex items-center justify-center'>
            <img className='w-40px' src={LoadingImg} alt="Loading..." />
        </div>
    )
};

export default Loader;