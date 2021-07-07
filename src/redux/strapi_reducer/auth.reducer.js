

const initialState = {
    isLoggedIn: false,
    authLoading: false,
    user: null,
    error: false,
    agentData: null,
    agentLoading: false,
    progress: 0
}

export default function AuthReducer(state = initialState, { type, payload }) {
    switch (type) {
        case "SET_AUTH_STATE":
            return {
                ...state,
                ...payload
            }
        case "GET_USER":
            return {
                ...state,
                user: {
                    ...state.user,
                    user: payload
                }
            }
            case 'LOGOUT':
                return initialState
        default:
            return state
    }
}
