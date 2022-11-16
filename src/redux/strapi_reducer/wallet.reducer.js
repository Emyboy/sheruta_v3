const initialState = {
    wallet_history: [],
    wallet: null,
    show_fund_wallet: false,
    wallet_loading: false,
    wallet_pending_balance: 0
}

export default (state = initialState, { type, payload }) => {
  switch (type) {

  case 'SET_WALLET_STATE':
    return { ...state, ...payload }

  default:
    return state
  }
}
