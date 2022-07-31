const initialState = {
    reply: null,
    group_guests: [],
    group_id: null
}

export default (state = initialState, { type, payload }) => {
  switch (type) {

  case 'SET_GROUP_STATE':
    return { ...state, ...payload }

  default:
    return state
  }
}
