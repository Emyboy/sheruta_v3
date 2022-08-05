

const initialState = {
    recent_properties: [],
    properties: []
}

const PropertyReducer = (state = initialState, { type, payload }) => {
    switch (type) {

    case 'SET_PROPERTIES_STATE':
        return { ...state, ...payload }

    default:
        return state
    }
}

export default PropertyReducer;
