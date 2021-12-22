import React, { useState } from 'react';
import messToolIcon from '../../assets/json-data/mess-tool-icon.json';
import ToolTip from '../tooltip/tooltip';
import moment from 'moment';

function MessageContentTool({updatedAt}) {
    const [messIconTooltip, setMessIconTooltip] = useState(null);
    return (
        <div className="message-content-tool">
            <span className="message-content-tool__time">
                {moment(updatedAt).fromNow()}
            </span>
            <div className="message-content-tool__icon">
                {
                    messToolIcon.map((meToIc, index) => (
                        <div
                            key={index}
                            className="tool-icon-wrapper"
                            onMouseOver={()=>setMessIconTooltip(index)}
                            onMouseOut={()=>setMessIconTooltip(null)}
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