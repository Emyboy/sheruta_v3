import {
    combineReducers
} from 'redux';
import adsReducer from './ads.reducer';
import aliceReducer from './alice.reducer';
import authReducer from './auth.reducer';
import contactReducer from './contact.reducer';
import groupReducer from './group.reducer';
import propertiesReducer from './properties.reducer';
import viewReducer from './view.reducer';


const rootReducer = combineReducers({
    auth: authReducer,
    view: viewReducer,
    alice: aliceReducer,
    properties: propertiesReducer,
    group: groupReducer,
    ads: adsReducer,
    contact: contactReducer
});

export default rootReducer;
