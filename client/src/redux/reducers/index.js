import {combineReducers} from 'redux';
import modalReducer from "./modalReducer";
import emotionModalReducer from './emotionModalReducer';

export default combineReducers({
    modalReducer,
    emotionModalReducer
})