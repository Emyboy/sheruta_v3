import configureStore from './configure.store';
import loadState from '../utils/loadState';
import saveState from '../utils/saveState';


const loadedState = loadState();

const store = configureStore(loadedState);

store.subscribe(() => {
    saveState({
        auth: store.getState().auth,
        view: { ...store.getState().view, personal_info: null},
    });
})

export default store;
