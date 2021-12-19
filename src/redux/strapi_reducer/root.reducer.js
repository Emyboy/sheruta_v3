import {
    combineReducers
} from 'redux';
import aliceReducer from './alice.reducer';
import authReducer from './auth.reducer';
import propertiesReducer from './properties.reducer';
import viewReducer from './view.reducer';


const rootReducer = combineReducers({
    auth: authReducer,
    view: viewReducer,
    alice: aliceReducer,
    properties: propertiesReducer
});

export default rootReducer;
