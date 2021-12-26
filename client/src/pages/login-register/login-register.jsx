import './stylesheets/login-register.scss';
import React, { useState } from 'react';
import Login from './login';
import Register from './register';
import Overlay from './overlay';


function LoginRegiter() {
    const [formActiveStatus, setFormActiveStatus] = useState(false);

    const handleFormActiveStatus = (status) => {
        setFormActiveStatus(status)
    }
    return (
        <div className="wrapper login-register-wrapper">
            <title>Login | Connecto</title>
            <div className={`login-register-container ${formActiveStatus ? '--active' : ''}`}>
                <Login />
                <Register />
                <Overlay 
                    handleFormActiveStatus={(status)=>handleFormActiveStatus(status)}
                />
            </div>
        </div>
    );
}

export default LoginRegiter;