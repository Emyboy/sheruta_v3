

const initialState = {
    recent_properties: []
}

export default (state = initialState, { type, payload }) => {
    switch (type) {

    case 'SET_PROPERTIES_STATE':
        return { ...state, ...payload }

    default:
        return state
    }
}


