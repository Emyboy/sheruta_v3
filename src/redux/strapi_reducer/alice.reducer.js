
const initialState = {
    user_suggestions: [],
    loading: false
}

export default (state = initialState, { type, payload }) => {
    switch (type) {

    case "SET_ALICE_STATE":
        return { ...state, ...payload }

    case "GET_ALL_MY_SUGGESTIONS": 
        return {
            ...state,
            user_suggestions: payload
        }

    default:
        return state
    }
}

