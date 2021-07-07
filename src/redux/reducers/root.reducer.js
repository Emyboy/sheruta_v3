import {
    combineReducers
} from 'redux';
import authReducer from '../strapi_reducer/auth.reducer';
import viewReducer from '../strapi_reducer/view.reducer';
// import userReducer from './user.reducer';
// import apartmentReducer from './apartment.reducers';
// import sharedReducer from './shared.reducer';
// import blogReducer from './blog.reducer';
// import pageReducer from './page.reducer';
// import featuredReducer from './feature.reducer';
// import agentReducer from './agent.reducer';

const rootReducer = combineReducers({
    auth: authReducer,
    view: viewReducer,
});

export default rootReducer;
