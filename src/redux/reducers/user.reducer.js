import { UPLOAD_ERROR, UPLOAD_LOADING, UPLOAD_SUCCESS, SEND_REQUEST_ERROR, SEND_REQUEST_SUCCESS, TOGGLE_DONE_MODAL, SEARCH_ERROR, SEARCH_SUCCESS, SEARCH_LOADING } from '../actions';

const initialState = {
    uploadLoading: false,
    searchLoading: false,
    upload: null,
    error: null,
    request: null,
    showDoneModal: false,
    searchResults: []
}

export default function UserReducer(state = initialState, { type, payload }) {
    switch (type) {
        case UPLOAD_LOADING:
            return {
                ...state,
                uploadLoading: true,
                error: null
            }
        case UPLOAD_SUCCESS:
            return {
                ...state,
                uploadLoading: false,
                upload: payload,
                error: null
            }
        case UPLOAD_ERROR:
            return {
                ...state,
                uploadLoading: false,
                upload: null,
                error: payload
            }
        case SEND_REQUEST_SUCCESS:
            return {
                ...state,
                request: payload,
                error: false,
                uploadLoading: false
            }
        case SEND_REQUEST_ERROR:
            return {
                ...state,
                request: payload,
                error: true,
                uploadLoading: false
            }
        case TOGGLE_DONE_MODAL:
            return {
                ...state,
                showDoneModal: payload
            }
        case SEARCH_SUCCESS:
            return {
                ...state,
                searchResults: payload,
                searchLoading: false,
                error: false
            }
        case SEARCH_ERROR:
            return {
                ...state,
                error: payload,
                searchResults: [],
                searchLoading: false
            }
        case SEARCH_LOADING: 
            return {
                ...state,
                error: false,
                searchResults: [],
                searchLoading: true
            }
        default:
            return state
    }
}
