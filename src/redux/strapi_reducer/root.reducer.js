import {
    combineReducers
} from 'redux';
import authReducer from './auth.reducer';
import viewReducer from './view.reducer';


const rootReducer = combineReducers({
    auth: authReducer,
    view: viewReducer,
});

export default rootReducer;
