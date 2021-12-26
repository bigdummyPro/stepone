import React, { useEffect, useState } from 'react';
import {useDispatch} from 'react-redux';
import { Validator } from '../../utils/validation';
import FbImage from './images/facebook.png';
import GgImage from './images/google.png';
import LiImage from './images/linkedin.png';
import {registerUser} from '../../redux/actions/authAction';

function Register() {
    const [registerInfo, setRegisterInfo] = useState({username: '', email: '', password: ''});
    const [formAlert, setFormAlert] = useState(null);

    const handleChangeInput = (e) => {
        const {name, value} = e.target;
        setRegisterInfo({...registerInfo, [name]: value})
    }
    useEffect(()=>{
        Validator({
            form: '#register-form',
            formGroupSelector: '.form-center__group',
            errorSelector: '.form-group-message',
            rules: [
                Validator.isRequired('#name', 'Enter your name'),
                Validator.isRequired('#email-register', 'Enter your email'),
                Validator.isRequired('#password-register', 'Enter your password'),
                Validator.isUserName('#email-register', 'Invalid email'),
                Validator.minLength('#password-register', 6, 'Password is required 6 characters at least')
            ],
            onSubmit: async function (data) {
                // Call API
                const response = await registerUser(data);
                if(response.data.success){
                    setRegisterInfo({username: '', email: '', password: ''});
                    setFormAlert({message: 'Register successfully', type: 1})
                }else{
                    setFormAlert({message: response.data.message, type: 0});
                }
                setTimeout(()=>{
                    setFormAlert(null)
                },2000)
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
                        <input type="text" id="name" name="username" placeholder=" " value={registerInfo.username} onChange={handleChangeInput}/>
                        <label className="form-group-label">Name</label>
                        <span className="form-group-message"></span>
                    </div>
                    <div className="form-center__group">
                        <input type="text" id="email-register" name="email" placeholder=" " value={registerInfo.email} onChange={handleChangeInput}/>
                        <label className="form-group-label">Email</label>
                        <span className="form-group-message"></span>
                    </div>
                    <div className="form-center__group">
                        <input type="password" id="password-register" name="password" placeholder=" " value={registerInfo.password} onChange={handleChangeInput}/>
                        <label className="form-group-label">Password</label>
                        <span className="form-group-message"></span>
                    </div>
                </div>
                <div className="form-bottom">
                    {
                        formAlert ?
                        <div className={`form-bottom-alert ${formAlert.type === 0 ?'--fail' : '--success'}`}>
                            {formAlert.message}
                        </div> : null
                    }
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