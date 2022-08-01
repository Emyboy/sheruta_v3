import axios from 'axios'
import store from '../redux/store/store';

const API_URL = process.env.REACT_APP_API_URL;

export const AnalyticsTypes = {
	calls: 'call',
	declinedCalls: 'declined-call',
	requestView: 'request-view',
	profileView: 'profile-view',
	message: 'message',
	personalInfoView: 'personal-info-view',
	search: 'search',
	matchAccept: 'match-accept',
	matchRejected: 'match-rejected',
	groupMessages: 'group-messages'
}

export default class Analytics {
	static async create({ user_id, request_id, type, property }) {
        const { user } = store.getState().auth;
        if(user && user_id === user.user.id){
            return;
        }
		const created = await axios(API_URL + '/analytics', {
			method: 'POST',
			data: {
				users_permissions_user: user_id || null,
				property_request: request_id || null,
				type: type || null,
				propertie: property,
			},
		})
		return created
	}
}
