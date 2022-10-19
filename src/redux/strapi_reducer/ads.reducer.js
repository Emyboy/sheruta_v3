const initialState = {
    all_ads: [],
    request_ads: []
}

export default (state = initialState, { type, payload }) => {
  switch (type) {

  case 'SET_ADS_STATE':
    return { ...state, ...payload }

  default:
    return state
  }
}
