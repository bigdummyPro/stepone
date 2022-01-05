export const GLOBALTYPES = {
    //Api config
    ApiUrl: process.env.NODE_ENV !== 'production' ? 'http://localhost:5000/api' : '',
    API_URL:  process.env.NODE_ENV !== 'production' ? 'http://localhost:5000' : '',
    LOCATION_API_URL: 'https://vapi.vnappmob.com/api',
    //Localstorage config
    LOCAL_STORAGE_ACCESS_TOKEN_NAME: 'social-website-access-token',
    LOCAL_STORAGE_REFRESH_TOKEN_NAME: 'social-website-refresh-token',

    //Socket
    SET_SOCKET: 'SET_SOCKET',

    //Modal
    CREATE_POST_MODAL_STATUS: 'CREATE_POST_MODAL_STATUS',
    CREATE_POST_MODAL_EDIT: 'CREATE_POST_MODAL_EDIT',
    CREATE_STORIES_MODAL_STATUS: 'CREATE_STORIES_MODAL_STATUS',
    EMOTION_MODAL_IN_CREATE_POST: 'EMOTION_MODAL_IN_CREATE_POST',
    EMOTION_MODAL_POSITION: 'EMOTION_MODAL_POSITION',
    FILE_MODAL_IN_CREATE_POST: 'FILE_MODAL_IN_CREATE_POST',
    INIT_FILE_MODAL_TYPE: 'INIT_FILE_MODAL_TYPE',
    MEDIA_SHOW_MODAL: 'MEDIA_SHOW_MODAL',
    MEDIA_DETAIL_MODAL: 'MEDIA_DETAIL_MODAL',

    //EmotionModal
    OPEN_EMOTION_MODAL: 'OPEN_EMOTION_MODAL',
    CLOSE_EMOTION_MODAL: 'CLOSE_EMOTION_MODAL',
    SET_TOGGLE_ICON_EL: 'SET_TOGGLE_ICON_EL',
    SET_EMOTION_VALUE: 'SET_EMOTION_VALUE',
    SET_TEXTAREA_EL: 'SET_TEXTAREA_EL',
    SET_EMOTION_CHANGE: 'SET_EMOTION_CHANGE',

    //Auth
    SET_AUTH: 'SET_AUTH',

    //Suggestion
    GET_USERS_SUGGESTION: 'GET_USERS_SUGGESTION',
    LOADING_SUGGESTION: 'LOADING_SUGGESTION',

    //Profile
    SET_IDS: 'SET_IDS',
    SET_USERS_INFO: 'SET_USERS_INFO',
    FOLLOW: 'FOLLOW',
    UNFOLLOW: 'UNFOLLOW',
    SET_POSTS: 'SET_POSTS',
    GET_PROFILE_POSTS: 'GET_PROFILE_POSTS',
    UPDATE_PROFILE_POST: 'UPDATE_PROFILE_POST',
    LOADING_PROFILE: 'LOADING_PROFILE',

    //Notification
    GET_NOTIFICATIONS: 'GET_NOTIFICATIONS',
    CREATE_NOTIFICATION: 'CREATE_NOTIFICATION',
    REMOVE_NOTIFICATION: 'REMOVE_NOTIFICATION',
    REMOVE_ALL_NOTIFICATION: 'REMOVE_ALL_NOTIFICATION',
    UPDATE_NOTIFICATION: 'UPDATE_NOTIFICATION',
    UPDATE_NOTIFICATION_SOUND: 'UPDATE_NOTIFICATION_SOUND',

    //Post
    CREATE_POST: 'CREATE_POST',
    LOADING_POST: 'LOADING_POST',
    GET_POSTS: 'GET_POSTS',
    UPDATE_POST: 'UPDATE_POST',
    GET_POST: 'GET_POST',
    DELETE_POST: 'DELETE_POST',

    //Message
    CREATE_MESSAGE: 'CREATE_MESSAGE',
    GET_MESSAGES: 'GET_MESSAGES',
    SET_USER_STORAGE: 'SET_USER_STORAGE',
    GET_CONVERSATIONS: 'GET_CONVERSATIONS',
    CREATE_CONVERSATION: 'CREATE_CONVERSATION',
    UPDATE_CONVERSATION: 'UPDATE_CONVERSATION',
    UPDATE_ISREAD_CONVERSATION: 'UPDATE_ISREAD_CONVERSATION',
    CHECK_ONLINE_OFFLINE: 'CHECK_ONLINE_OFFLINE',
    SET_NO_ACTIVE_USER: 'SET_NO_ACTIVE_USER',

    //Online / Offline
    SET_ONLINE: 'SET_ONLINE',
    SET_OFFLINE: 'SET_OFFLINE',

    //Stories
    CREATE_STORIES: 'CREATE_STORIES',
    GET_STORIES: 'GET_STORIES',
    GET_STORIES_BY_ID: 'GET_STORIES_BY_ID',
    UPDATE_STORIES_LIKE: 'UPDATE_STORIES_LIKE',
    UPDATE_STORIES_VIEWER: 'UPDATE_STORIES_VIEWER'
} 

export const EditData = (data, id, post) => {
    const newData = data.map(item => 
        (item._id === id ? post : item)
    )
    return newData;
}

export const DeleteData = (data, id) => {
    const newData = data.filter(item => item._id !== id)
    return newData;
}