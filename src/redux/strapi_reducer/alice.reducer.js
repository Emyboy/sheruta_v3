const initialState = {
    user_suggestions: [],
    accepted_suggestions: [],
    loading: false,
};

const AliceReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case "SET_ALICE_STATE":
            return { ...state, ...payload };
        case "GET_SUGGESTIONS_BY_STATUS":
            return {
                ...state,
                accepted_suggestions: payload,
            };

        case "GET_ALL_MY_SUGGESTIONS":
            return {
                ...state,
                user_suggestions: payload,
            };

        default:
            return state;
    }
};

export default AliceReducer;
