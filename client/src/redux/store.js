import {createStore} from 'redux';
import {Provider} from 'react-redux';
import rootReducer from './reducers/index';

const store = createStore(
    rootReducer
);

const DataProvider = ({children}) => {
    return(
        <Provider store={store}>
            {children}
        </Provider>
    )
}

export default DataProvider;