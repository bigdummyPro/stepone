import axios from 'axios'
import { GLOBALTYPES } from '../redux/constants/globalTypes';

export const getDataAPI = async (url) => {
    const res = await axios.get(`${GLOBALTYPES.API_URL}/api/${url}`)
    return res;
}

export const postDataAPI = async (url, postData) => {
    const res = await axios.post(`${GLOBALTYPES.API_URL}/api/${url}`, postData)
    return res;
}

export const putDataAPI = async (url, postData) => {
    const res = await axios.put(`${GLOBALTYPES.API_URL}/api/${url}`, postData)
    return res;
}

export const patchDataAPI = async (url, postData) => {
    const res = await axios.patch(`${GLOBALTYPES.API_URL}/api/${url}`, postData)
    return res;
}

export const deleteDataAPI = async (url) => {
    const res = await axios.delete(`${GLOBALTYPES.API_URL}/api/${url}`)
    return res;
}