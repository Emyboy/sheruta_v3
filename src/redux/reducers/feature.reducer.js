import {
    FEATURE_LOADING,
    FEATURE_SUCCESS,
    FEATURE_ERROR,
    FEATURE_MESSAGE,
    FEATURE_IMAGE_DONE,
    FEATURE_PROGRESS
} from '../actions';

const initialState = {
    isLoading: false,
    featureData: null,
    displayMessage: null,
    imageDone: false,
    imageUrls: [],
    error: null,
    progress: '0%'
}

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case FEATURE_PROGRESS:
            return {
                ...state,
                progress: payload
            }
        case FEATURE_LOADING:
            return {
                ...state,
                isLoading: true,
                imageDone: false,
                displayMessage: 'Uploading..'
            }
        case FEATURE_IMAGE_DONE:
            return {
                ...state,
                imageDone: true,
                error: null,
                imageUrls: payload
            }
        case FEATURE_MESSAGE:
            return {
                ...state,
                isLoading: true,
                displayMessage: payload
            }
        case FEATURE_SUCCESS:
            return {
                ...state,
                featureData: payload,
                isLoading: false,
                error: null,
                displayMessage: "Upload Done",
                imageDone: false
            }
        case FEATURE_ERROR:
            return {
                ...state,
                featureData: payload,
                isLoading: false,
                error: null,
                displayMessage: "Upload Done",
                imageDone: false
            }
        default:
            return state
    }
}
