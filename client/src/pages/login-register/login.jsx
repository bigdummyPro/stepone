import React, { useEffect, useState } from 'react';
import FbImage from './images/facebook.png';
import GgImage from './images/google.png';
import LiImage from './images/linkedin.png';
import {Validator} from './../../utils/validation';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {loginUser} from '../../redux/actions/authAction';

function Login() {
    const [loginInfo, setLoginInfo] = useState({email: '', password: ''});
    const handleChangeInput = (e) => {
        const {name, value} = e.target;
        setLoginInfo({...loginInfo, [name]: value});
    }
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const authState = useSelector(state => state.authReducer);

    //handle navigate url when loginpage load but nonAuthenticated
    useEffect(() => {
        if(authState.isAuthenticated) navigate("/")
    }, [authState.isAuthenticated, navigate])

    useEffect(()=>{
        Validator({
            form: '#login-form',
            formGroupSelector: '.form-center__group',
            errorSelector: '.form-group-message',
            rules: [
                Validator.isRequired('#email-login', 'Enter your email'),
                Validator.isRequired('#password-login', 'Enter your password'),
                Validator.isUserName('#email-login', 'Invalid email'),
                Validator.minLength('#password-login', 6, 'Password is required 6 characters at least')
            ],
            onSubmit: async function (data) {
                // Call API
                const response = await dispatch(loginUser(data));
                if(response.data.success){
                    setLoginInfo({email: '', password: ''})
                }
            }
        });
    },[])
    return (
        <div className="form-container login-container">
            <form id="login-form">
                <div className="form-top">
                    <h1>Sign In</h1>
                    <ul>
                        <li>
                            <img src={GgImage} alt="" />
                        </li>
                        <li>
                            <img src={FbImage} alt="" />
                        </li>
                        <li>
                            <img src={LiImage} alt="" />
                        </li>
                    </ul>
                    <span>or use your accounts</span>
                </div>
                <div className="form-center">
                    <div className="form-center__group">
                        <input type="text" id="email-login" name="email" placeholder=" " value={loginInfo.email} onChange={handleChangeInput}/>
                        <label className="form-group-label">Email</label>
                        <span className="form-group-message"></span>
                    </div>
                    <div className="form-center__group">
                        <input type="password" id="password-login" name="password" placeholder=" " value={loginInfo.password} onChange={handleChangeInput}/>
                        <label className="form-group-label">Password</label>
                        <span className="form-group-message"></span>
                    </div>
                </div>
                <div className="form-bottom">
                    <span>Forgot your password?</span>
                    <button 
                        className="btn btn--primary btn--rounded"
                        type="submit"
                    >Sign In</button>
                </div>
            </form>
        </div>
    );
}

export default Login;