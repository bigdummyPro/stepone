import React, { useEffect } from 'react';
import { Validator } from '../../utils/validation';
import FbImage from './images/facebook.png';
import GgImage from './images/google.png';
import LiImage from './images/linkedin.png';

function Register() {

    useEffect(()=>{
        Validator({
            form: '#register-form',
            formGroupSelector: '.form-center__group',
            errorSelector: '.form-group-message',
            rules: [
                Validator.isRequired('#name', 'Enter your name'),
                Validator.isRequired('#email', 'Enter your email'),
                Validator.isRequired('#password', 'Enter your password'),
                Validator.isUserName('#email', 'Invalid email'),
                Validator.minLength('#password', 6, 'Password is required 6 characters at least')
            ],
            onSubmit: async function (data) {
                // Call API
            }
        });
    },[])
    return (
        <div className="form-container register-container">
            <form id="register-form">
                <div className="form-top">
                    <h1>Sign Up</h1>
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
                        <input type="text" id="name" name="name" placeholder=" "/>
                        <label className="form-group-label">Name</label>
                        <span className="form-group-message"></span>
                    </div>
                    <div className="form-center__group">
                        <input type="text" id="email" name="email" placeholder=" "/>
                        <label className="form-group-label">Email</label>
                        <span className="form-group-message"></span>
                    </div>
                    <div className="form-center__group">
                        <input type="password" id="password" name="password" placeholder=" "/>
                        <label className="form-group-label">Password</label>
                        <span className="form-group-message"></span>
                    </div>
                </div>
                <div className="form-bottom">
                    <button 
                        className="btn btn--primary btn--rounded"
                        type="submit"
                    >Sign Up</button>
                </div>
            </form>
        </div>
    );
}

export default Register;