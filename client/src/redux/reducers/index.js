import {combineReducers} from 'redux';
import modalReducer from "./modalReducer";
import emotionModalReducer from './emotionModalReducer';
import authReducer from './authReducer';

export default combineReducers({
    modalReducer,
    emotionModalReducer,
    authReducer
})