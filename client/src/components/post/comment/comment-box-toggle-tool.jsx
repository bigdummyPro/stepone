import React from 'react';

function CommentBoxToggleTool({repCms, next, setNext}) {
    return (
        <>
            {
                repCms.length - next > 0 ?
                <span 
                    className="toggle-comment"
                    onClick={()=>setNext(next + 5)}
                >
                    <i className="fas fa-reply"></i>
                    <span>
                        See more comments
                    </span>
                </span> : repCms.length > 2 &&
                <span 
                    className="toggle-comment"
                    onClick={()=>setNext(2)}
                >
                    <i className="fas fa-minus-circle"></i>
                    <span>
                        Hide comments
                    </span>
                </span>
            }
        </>
    );
}

export default CommentBoxToggleTool;