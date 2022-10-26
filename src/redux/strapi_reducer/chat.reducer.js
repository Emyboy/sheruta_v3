const initialState = {
    messages: [],
    active_conversation: null,
    chat_loading: false,
    sending: false
}

export default (state = initialState, { type, payload }) => {
  switch (type) {

  case 'SET_CHAT_STATE':
    return { ...state, ...payload }

  default:
    return state
  }
}
