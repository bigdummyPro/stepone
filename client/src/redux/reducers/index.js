import {combineReducers} from 'redux';
import modalReducer from "./modalReducer";
import emotionModalReducer from './emotionModalReducer';
import authReducer from './authReducer';
import suggestionReducer from './suggestionReducer';
import socketReducer from './socketReducer';
import profileReducer from './profileReducer';
import notificationReducer from './notificationReducer';
import postReducer from './postReducer';

export default combineReducers({
    modalReducer,
    emotionModalReducer,
    authReducer,
    suggestionReducer,
    socketReducer,
    profileReducer,
    notificationReducer,
    postReducer
})