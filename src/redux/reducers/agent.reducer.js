import {
    AGENT_LOADING, SET_AGENT_LIST,
    SET_AGENT_PROPERTIES,
    UPDATE_AGENT_PROGRESS,
    LISTING_LOADING,
    LISTING_STATUS
} from "../actions"

const initialState = {
    agentList: [],
    loading: true,
    agentProperties: [],
    uploadLoading: false,
    uploadProgress: 0,
    uploadMessage: null,
    uploadStatus: 'loading'
}

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case SET_AGENT_LIST:
            return {
                ...state,
                agentList: payload
            }
        case AGENT_LOADING:
            return {
                ...state,
                loading: payload
            }
        case SET_AGENT_PROPERTIES:
            return {
                ...state,
                agentProperties: payload
            }
        case UPDATE_AGENT_PROGRESS:
            return {
                ...state,
                uploadProgress: payload
            }
        case LISTING_LOADING:
            return {
                ...state,
                uploadLoading: payload
            }
        case LISTING_STATUS:
            return {
                ...state,
                uploadStatus: payload
            }
        default:
            return state
    }
}


