import React, { useState } from 'react';
import messToolIcon from '../../assets/json-data/mess-tool-icon.json';
import ToolTip from '../tooltip/tooltip';
import moment from 'moment';
import { deleteMessage } from '../../redux/actions/messageAction';
import { useParams } from 'react-router';

function MessageContentTool({message, dispatch, user}) {
    const [messIconTooltip, setMessIconTooltip] = useState(null);
    const {id} = useParams();
    const handleMessTool = (toolType) => {
        if(toolType === 'delete'){
            dispatch(deleteMessage({
                convID: id, 
                messID: message._id
            }))
        }
    }
    return (
        <div className="message-content-tool">
            <span className="message-content-tool__time">
                {moment(message.updatedAt).fromNow()}
            </span>
            <div className="message-content-tool__icon">
                {
                    messToolIcon.map((meToIc, index) => (
                        message.sender._id !== user._id &&
                        meToIc.toolType === 'delete' ? null :
                        <div
                            key={index}
                            className="tool-icon-wrapper"
                            onMouseOver={()=>setMessIconTooltip(index)}
                            onMouseOut={()=>setMessIconTooltip(null)}
                            onClick={()=>handleMessTool(meToIc.toolType)}
                        >
                            <span>
                                <i className={meToIc.icon}></i>
                            </span>
                            <ToolTip 
                                content={meToIc.tooltipContent}
                                status={messIconTooltip === index ? true : false } 
                                colorClass='--third-color'
                            />
                        </div>
                    ))
                }
            </div>
        </div>
    );
}

export default MessageContentTool;