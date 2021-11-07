import axios from "axios";
import Cookies from "js-cookie";
import store from "../redux/store/store";

export default class MessageService {
    static async getUserConversations() {
        const user = store.getState().auth.user?.user;
        const conv1 = await axios(
            process.env.REACT_APP_API_URL + `/conversations/?owner=${user.id}`,
        );
        const conv2 = await axios(
            process.env.REACT_APP_API_URL + `/conversations/?guest=${user.id}`,
        );
        const sorted = [...conv1.data, ...conv2.data].sort((a,b) => {
            return new Date(b.created_at) - new Date(a.created_at);
        });
        return sorted;
    };

    static async sendMessage(message) {
        console.log('=== SENDING ====', message)
        const sent = await axios(process.env.REACT_APP_API_URL+`/messages`, {
            method: 'POST',
            data: message,
            headers: {
                authorization: `Bearer ${Cookies.get('token')}`
            }
        });
        return sent
    };

    static async getConversationMessages(conv_id) {
        const messages = await axios(
            process.env.REACT_APP_API_URL +
                `/messages/?conversation=${conv_id}`,
            {
                headers: {
                    authorization: `Bearer ${Cookies.get("token")}`,
                },
            },
        );
        return messages;
    };

    static async updateConversation(update) {
        const done = await axios(process.env.REACT_APP_API_URL+`/conversation`)
    }

}
