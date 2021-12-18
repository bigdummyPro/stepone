import React, { useState } from 'react';
import './message.scss';
import MessageLeft from './message-left';
import MessageRight from './message-right';
import SettingGroupModal from './setting-group-modal';

function Message() {
    const [modalStatus, setModalStatus] = useState(false);
    const handleModal = (status) => {
        setModalStatus(status)
    }
    return (
        <div className="main-content">
            <div className="main-container">
                <div className="main-body">
                    <div className="message">
                        <MessageLeft 
                            handleModal={(status)=>handleModal(status)}
                        />
                        <MessageRight />
                        {
                            modalStatus ?
                            <SettingGroupModal 
                                handleModal={(status)=>handleModal(status)}
                            /> : null
                        }
                    </div> 
                </div>
            </div>
        </div>
    );
}

export default Message;