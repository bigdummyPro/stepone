import React, { useState } from 'react';
import LocationBoxItem from './location-box-item';

const locationItemArr = [
    {
        headerContent: 'Select Provinces',
        locationCode: 'province'
    },
    {
        headerContent: 'Select Districts',
        locationCode: 'district'
    },
    {
        headerContent: 'Select Wards',
        locationCode: 'ward'
    }
]
function LocationSelectBox(props) {
    const [locationBoxActive, setLocationBoxActive] = useState(null);

    const handleLocationBoxActive = (key) => {
        setLocationBoxActive(key)
    }
    return (
        <div className="location-select-box">
            {
                locationItemArr.map((loItArr, index)=>(
                    <LocationBoxItem 
                        key={index}
                        keyNum={index}
                        locationItem={loItArr}
                        locationBoxActive={locationBoxActive === index ? true : false}
                        handleLocationBoxActive={(key)=>handleLocationBoxActive(key)}
                    />
                ))
            }
        </div>
    );
}

export default LocationSelectBox;