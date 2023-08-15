import axios from 'axios'
import Cookies from 'js-cookie'

export default class WalletService {
	static async saveWalletTransaction({
		amount,
		reference,
		password,
		wallet_id,
		from,
		to,
	}) {
		const res = await axios(
			process.env.REACT_APP_API_URL + `/wallet-transactions`,
			{
				method: 'POST',
				data: { password, reference, wallet_id, amount, from, to },
				headers: {
					authorization: `Bearer ${Cookies.get('token')}`,
				},
			}
		)
		return res
	}

	static async getAuthWallet() {
		const res = await axios(process.env.REACT_APP_API_URL + `/wallets/me`, {
			headers: {
				authorization: `Bearer ${Cookies.get('token')}`,
			},
		})
		return res
	}

	static async createNewWallet() {
		const res = await axios(process.env.REACT_APP_API_URL + `/wallets`, {
			headers: {
				authorization: `Bearer ${Cookies.get('token')}`,
			},
			method: 'POST',
		})
		return res
	}

	static async getAuthWalletHistory() {
		const res = await axios(
			process.env.REACT_APP_API_URL + `/wallet-transactions/me`,
			{
				headers: {
					authorization: `Bearer ${Cookies.get('token')}`,
				},
			}
		)
		return res
	}
}
