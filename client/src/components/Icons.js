import React from 'react'

const Icons = ({setContent, content, theme}) => {
    var myArray = [
      "How are you doing",
      "What are we thinking today",
      "What are we writing today",
      "Whats on your mind",
      "How are you feeling",
      "How are you"
    ];

    var randomItem = myArray[Math.floor(Math.random()*myArray.length)];

    return (
        <div className="nav-item dropdown" 
        style={{ opacity: 1, filter: theme ? 'invert(1)' : 'invert(0)' }}>
            
            <span className="nav-link position-relative px-1" id="navbarDropdown" 
            role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <span style={{opacity: 0.4}}>Random Bible Verse</span>
            </span>

            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <div className="myArray">
                    {
                        randomItem.map(icon => (
                            <span key={randomItem} onClick={() => setContent(content + {randomItem})}>
                                {icon}
                            </span>
                        ))
                    }
                </div>
            </div>
                
        </div>
    )
}

export default Icons
