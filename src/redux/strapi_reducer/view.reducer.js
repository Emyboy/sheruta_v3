const initialState = {
    services: [],
    categories: [],
    askForUserFeedback: false,
    showPaymentPopup: false,
    personal_info: null,
    payment_types: [],
    payment_plan: null,
    payment_plan_loading: false,
    states: [],
    work_industries: [],
    configureView: false,
    feed: [],
    app_details: null,
    robot_message: null,
    robot_action_text: 'null',
    robot_action_link: 'null',
    notifications: [],
    messages: [],
    amenities: [],
    recent_users: [],
    location_keywords: [],
    collect_location_keyword: false,
    unique_habits: [],
    inspections: [],
    conversations: []
};

function ViewReducer(state = initialState, { type, payload }) {
    switch (type) {
        case "GET_ALL_STATES":
            return {
                ...state,
                states: payload,
            };
        case "SET_VIEW_STATE":
            return {
                ...state,
                ...payload,
            };
        case "GET_ALL_WORK_INDUSTRIES":
            return {
                ...state,
                work_industries: payload,
            };
        case "GET_APP_DETAILS":
            return {
                ...state,
                app_details: payload,
            };
        case "SHOW_ROBOT_MESSAGE":
            return {
                ...state,
                ...payload,
            };

        case "GET_ALL_SERVICES":
            return { ...state, services: payload };

        case "GET_ALL_CATEGORIES":
            return { ...state, categories: payload };
        case "GET_ALL_PAYMENT_TYPES":
            return { ...state, payment_types: payload };

        case "GET_ALL_NOTIFICATIONS":
            return {
                ...state,
                notifications: payload,
            };
        case "LOGOUT":
            return initialState

        default:
            return state;
    }
}

export default ViewReducer;
