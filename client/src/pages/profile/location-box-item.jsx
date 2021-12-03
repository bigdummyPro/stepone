import React from 'react';


function LocationBoxItem(
    { 
        keyNum, 
        locationItem, 
        handleLocationBoxActive, 
        locationBoxActive 
    }
) {
    return (
        <div className="location-box-item">
            <div 
                className="location-box-header"
                onClick={()=>handleLocationBoxActive(locationBoxActive ? null : keyNum)}
            >
                <span>{locationItem.headerContent}</span>
                <span>
                    {
                        !locationBoxActive ?
                            <i class="fas fa-chevron-down"></i> :
                            <i class="fas fa-chevron-up"></i>
                    }
                </span>
            </div>
            <div className={`location-box-content ${locationBoxActive ? '--active' : ''}`}>
                <div className="location-box-search">
                    <input type="text" placeholder="Search"/>
                </div>
                <ul className="location-box-list">
                    <li className="location-item">Long An</li>
                    <li className="location-item">Long An</li>
                    <li className="location-item">Long An</li>
                    <li className="location-item">Long An</li>
                    <li className="location-item">Long An</li>
                </ul>
            </div>
        </div>
    );
}

export default LocationBoxItem;