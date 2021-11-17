import React from 'react';
import './tooltip.scss';

function ToolTip({content, status, colorClass}) {
    return (
        <div 
            className={`tooltip ${status ? '--active' : ''} ${colorClass}`}
        >
            {content}
        </div>
    );
}

export default ToolTip;