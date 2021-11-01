import React from 'react';

function Overlay({handleFormActiveStatus}) {
    return (
        <div className="overlay-container">
            <div className="overlay">
                <div className="overlay-wrapper overlay-left">
                    <h1>Welcome Back!</h1>
                    <p>To keep connected with us please login with your personal info</p>
                    <button 
                        className="btn btn--primary btn--rounded"
                        onClick={()=>handleFormActiveStatus(false)}
                    >Sign In</button>
                </div>
                <div className="overlay-wrapper overlay-right">
                    <h1>Hello, Friend!</h1>
                    <p>Enter your personal details and start journey with us</p>
                    <button 
                        className="btn btn--primary btn--rounded"
                        onClick={()=>handleFormActiveStatus(true)}
                    >Sign Up</button>
                </div>
            </div>
        </div>
    );
}

export default Overlay;