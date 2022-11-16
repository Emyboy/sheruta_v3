import WalletService from '../../services/WalletService'
import store from '../../redux/store/store'
import { notification } from 'antd'

const setWalletState = (newState) => {
	store.dispatch({
		type: 'SET_WALLET_STATE',
		payload: newState,
	})
}

export const getWallet = () => async (dispatch) => {
	try {
		const res = await WalletService.getAuthWallet()
		setWalletState({
			wallet: res.data.wallet,
			wallet_loading: false,
		})
	} catch (error) {
		return Promise.reject(error)
	}
}

export const getWalletHistory = () => async (dispatch) => {
	try {
		const history = await WalletService.getAuthWalletHistory()
		console.log('MY HISTORY --', history)
		setWalletState({
			wallet_history: history.data,
		})
	} catch (error) {
		return Promise.reject(error)
	}
}
