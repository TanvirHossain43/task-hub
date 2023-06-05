import React from 'react';
import error2 from '../../assets/error2.webp'
import { Link } from 'react-router-dom';

const Error = () => {
    return (
        <div className='h-screen'>
        <div className='absolute w-full'>
            <img src={error2} className='h-screen w-full' alt="" />
        </div>
        <div className='relative top-3/4 left-1/3 w-fit'>
            <button className='btn btn-outline'><Link to='/'>Back to Home</Link></button>
        </div>
        
    </div>
    );
};

export default Error;