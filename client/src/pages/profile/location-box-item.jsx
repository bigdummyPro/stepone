import React, { useEffect, useRef, useState } from 'react';


function LocationBoxItem(
    { 
        keyNum, 
        locationItem, 
        headerContentProp,
        handleLocationBoxActive, 
        locationBoxActive,
        locationData,
        handleLocationData,
        handleSearchData,
        resetHeaderStatus
    }
) {
    const [headerContent, setHeaderContent] = useState();
    const [searchInput, setSearchInput] = useState('');
    const storageRef = useRef(null);

    const handleLocationItem = (locationTypeKey, locationCode, locationName) => {
        handleLocationBoxActive(null);
        handleLocationData(locationTypeKey, locationCode, locationName);
        setHeaderContent(locationName);
        setSearchInput('')
    }
    const handleChangeInput = (e, locationTypeKey) => {
        setSearchInput(e.target.value);

        //Debounce skill
        if(storageRef.current) clearTimeout(storageRef.current);
        storageRef.current = setTimeout(()=>{
            handleSearchData(locationTypeKey, e.target.value);
        },500)
    }

    useEffect(()=>{
        setHeaderContent(headerContentProp)
    },[headerContentProp, resetHeaderStatus])
    return (
        <div className="location-box-item">
            <div 
                className={`location-box-header ${!locationData ? '--non-active' : ''}`}
                onClick={()=>handleLocationBoxActive(locationBoxActive ? null : keyNum)}
            >
                <span>{headerContent}</span>
                <span>
                    {
                        !locationBoxActive ?
                            <i className="fas fa-chevron-down"></i> :
                            <i className="fas fa-chevron-up"></i>
                    }
                </span>
            </div>
            <div className={`location-box-content ${locationBoxActive ? '--active' : ''}`}>
                <div className="location-box-search">
                    <input 
                        type="text" 
                        placeholder="Search"
                        value={searchInput}
                        onChange={(e)=>handleChangeInput(e, locationItem.locationKey)}
                    />
                </div>
                <ul className="location-box-list">
                    {
                        locationData && locationData.map((loDa, index)=>(
                            <li 
                                className="location-item"
                                key={index}
                                onClick={()=>handleLocationItem(locationItem.locationKey, loDa.code, loDa.name)}
                            >
                                {loDa.name}
                            </li>
                        ))
                    }
                </ul>
            </div>
        </div>
    );
}

export default LocationBoxItem;