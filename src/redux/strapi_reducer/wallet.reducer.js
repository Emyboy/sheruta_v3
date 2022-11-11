const initialState = {
    wallet_history: [],
    wallet: null,
    show_fund_wallet: false
}

export default (state = initialState, { type, payload }) => {
  switch (type) {

  case 'SET_WALLET_STATE':
    return { ...state, ...payload }

  default:
    return state
  }
}
