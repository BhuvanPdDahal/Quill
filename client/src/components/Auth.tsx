import React, { ChangeEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { LOGOUT } from '../constants';
import { login, signup } from '../actions/auth';
import Logo from '../images/main-logo.png';
import { State } from '../interfaces/store';

const initialState = { username: '', emailOrPhoneNum: '', password: '' };

const Auth: React.FC = () => {
    const navigate: any = useNavigate();
    const dispatch: any = useDispatch();
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState(initialState);
    const [showPassword, setShowPassword] = useState(false);

    const toggleMode = () => {
        setIsLogin((prevIsLogin) => !prevIsLogin);
    };

    const toggleShowPassword = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if(isLogin) {
            dispatch(login(formData, navigate));
        } else {
            dispatch(signup(formData, navigate));
        }
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    useEffect(() => {
        document.title = 'Authentication | Quill';
        dispatch({ type: LOGOUT });
    }, []);

    const { isLoading } = useSelector((state: State) => state.auth);

    return (
        <div className='h-screen flex items-center justify-center gap-10 px-12'>
            <div className='flex flex-col items-start gap-8'>
                <img className='h-[65px]' src={Logo} alt="Quill" />
                <div className='text-7xl pb-3 font-semibold flex flex-col gap-5 text-transparent bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text'>
                    <div>Connect.</div>
                    <div>Communicate.</div>
                    <div>Seamlessly.</div>
                </div>
            </div>
            <form onSubmit={handleSubmit} className='w-400px pt-[90px]'>
                {!isLogin && (
                    <div className='mb-3'>
                        <input onChange={handleChange} name='username' className='input' type="text" placeholder='Username' required />
                    </div>
                )}
                <div className='mb-3'>
                    <input onChange={handleChange} name='emailOrPhoneNum' className='input' type="text" placeholder='Email or phone number' required />
                </div>
                <div className='relative mb-4'>
                    <input onChange={handleChange} name='password' className='input pw-input' type={showPassword ? 'text' : 'password'} placeholder='Password' required />
                    <div onClick={toggleShowPassword} className={`${!formData.password && 'hidden'} absolute top-0 right-0 h-full w-[40px] flex items-center justify-center`}>
                        <i className={`fa-solid ${showPassword ? 'fa-eye-slash' : 'fa-eye'} eye-icon text-darkgrey`}></i>
                    </div>
                </div>
                <div className='text-center mb-3'>
                    <button className='auth-btn' type='submit'>
                        {isLogin
                            ? isLoading ? 'Logging in...' : 'Login'
                            : isLoading ? 'Signing up...' : 'Signup'
                        }
                    </button>
                </div>
                <div className='text-center'>
                    <span>{isLogin ? "Don't have an account? " : "Already have an account? "}</span>
                    <span onClick={toggleMode} className='underline cursor-pointer hover:text-blue-800'>{isLogin ? 'Signup' : 'Login'}</span>
                </div>
            </form>
        </div>
    )
}

export default Auth;