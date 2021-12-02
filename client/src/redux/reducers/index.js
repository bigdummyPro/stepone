import {combineReducers} from 'redux';
import modalReducer from "./modalReducer";
import emotionModalReducer from './emotionModalReducer';
import authReducer from './authReducer';
import suggestionReducer from './suggestionReducer';
import socketReducer from './socketReducer';
import profileReducer from './profileReducer';

export default combineReducers({
    modalReducer,
    emotionModalReducer,
    authReducer,
    suggestionReducer,
    socketReducer,
    profileReducer
})