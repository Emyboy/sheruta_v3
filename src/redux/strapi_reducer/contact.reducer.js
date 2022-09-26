const initialState = {
	matches: [],
	loading: false,
    contacts: []
}

export default (state = initialState, { type, payload }) => {
  switch (type) {

  case 'SET_CONTACT_STATE':
    return { ...state, ...payload }

  default:
    return state
  }
}
