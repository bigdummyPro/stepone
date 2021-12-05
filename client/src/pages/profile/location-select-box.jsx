import React, { useEffect, useState } from 'react';
import LocationBoxItem from './location-box-item';
import provinceDataJson from '../../assets/json-data/vietnam-location-data/province.json';
import districtDataJson from '../../assets/json-data/vietnam-location-data/district.json';
import wardDataJson from '../../assets/json-data/vietnam-location-data/ward.json';

const locationItemArr = [
    {
        headerContent: 'Select Provinces',
        locationKey: 'province'
    },
    {
        headerContent: 'Select Districts',
        locationKey: 'district'
    },
    {
        headerContent: 'Select Wards',
        locationKey: 'ward'
    }
]
function LocationSelectBox({receiveLocationValue}) {
    const [locationBoxActive, setLocationBoxActive] = useState(null);
    const [provinceData, setProvinceData] = useState([]);
    const [districtData, setDistrictData] = useState(null);
    const [wardData, setWardData] = useState(null);
    const [locationSelectData, setLocationSelectData] = useState({province: null, district: null, ward: null});
    const [locationCodeStore, setLocationCodeStore] = useState({province: null, district: null, ward: null});
    const [resetHeaderStatus, setResetHeaderStatus] = useState({province: false, district: false, ward: false})
    const [resetSelectData, setResetSelectData] = useState({province: false, district: false, ward: false})

    const handleLocationBoxActive = (key) => {
        setLocationBoxActive(key);
    }

    const handleLocationData = (locationTypeKey, locationCode, locationName) => {
        if(locationTypeKey === 'province'){
            setDistrictData(null)
            setWardData(null)

            setResetHeaderStatus({...resetHeaderStatus, district: !resetHeaderStatus.district, ward: !resetHeaderStatus.ward});

            setResetSelectData({...resetSelectData, province: !resetSelectData.province})

            const district = districtDataJson.filter(dis => dis.province_code === locationCode);
            setDistrictData(district);
            setLocationCodeStore({...locationCodeStore, district: locationCode});
            setLocationSelectData({...locationSelectData, province: locationName});
        }
        else if(locationTypeKey === 'district'){
            setResetHeaderStatus({...resetHeaderStatus, ward: !resetHeaderStatus.ward});

            setResetSelectData({...resetSelectData, district: !resetSelectData.district})

            const ward = wardDataJson.filter(ward => ward.district_code === locationCode);
            setWardData(ward);
            setLocationCodeStore({...locationCodeStore, ward: locationCode});
            setLocationSelectData({...locationSelectData, district: locationName});
        }else{
            setLocationSelectData({...locationSelectData, ward: locationName});
        }
    }

    const handleSearchData = (locationTypeKey, searchKey) => {
        if(locationTypeKey === 'province'){
            const newProvinceData = [...provinceDataJson];
            const result = newProvinceData.filter(item =>item.name.toLowerCase().includes(searchKey.toLowerCase()));
            setProvinceData(result);
        }
        else if(locationTypeKey === 'district'){
            const newDistrictData = districtDataJson.filter(dis => dis.province_code === locationCodeStore.district);

            const result = newDistrictData.filter(item =>item.name.toLowerCase().includes(searchKey.toLowerCase()));
            setDistrictData(result);
        }
        else if(locationTypeKey === 'ward'){
            const newWardData = wardDataJson.filter(ward => ward.district_code === locationCodeStore.ward);

            const result = newWardData.filter(item =>item.name.toLowerCase().includes(searchKey.toLowerCase()));
            setWardData(result);
        }
    }
    useEffect(()=>{
        receiveLocationValue(locationSelectData)
    },[locationSelectData, receiveLocationValue])

    useEffect(()=>{
        setLocationSelectData({...locationSelectData, district: null, ward: null})
    },[resetSelectData.province])
    useEffect(()=>{

        setLocationSelectData({...locationSelectData, ward: null})
    },[resetSelectData.district])
    useEffect(()=>{
        setProvinceData(provinceDataJson)
    },[])

    return (
        <div className="location-select-box">
            {
                locationItemArr.map((loItArr, index)=>(
                    <LocationBoxItem 
                        key={index}
                        keyNum={index}
                        locationItem={loItArr}
                        headerContentProp={loItArr.headerContent}
                        locationBoxActive={locationBoxActive === index ? true : false}
                        handleLocationBoxActive={(key)=>handleLocationBoxActive(key)}
                        locationData={
                            (index === 0 && provinceData) || (index === 1 && districtData) || (index === 2 && wardData)
                        }
                        handleLocationData={
                            (locationTypeKey, locationCode, locationName)=>handleLocationData(locationTypeKey, locationCode, locationName)
                        }
                        handleSearchData={
                            (locationTypeKey, searchKey) =>handleSearchData(locationTypeKey, searchKey)
                        }
                        resetHeaderStatus={resetHeaderStatus[loItArr.locationKey]}
                    />
                ))
            }
        </div>
    );
}

export default LocationSelectBox;