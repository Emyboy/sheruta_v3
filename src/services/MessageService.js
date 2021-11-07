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
        const allConv = await axios(
            process.env.REACT_APP_API_URL +
                `/conversations/?owner=${user.id}&guest=${user.id}&_sort=updated_at:DESC`,
        );
        const sorted = [...conv1.data, ...conv2.data].sort((a, b) => {
            return new Date(b.last_visited) - new Date(a.last_visited);
        });
        return sorted;
    }

    static async sendMessage(message) {
        console.log("=== SENDING ====", message);
        const sent = await axios(process.env.REACT_APP_API_URL + `/messages`, {
            method: "POST",
            data: message,
            headers: {
                authorization: `Bearer ${Cookies.get("token")}`,
            },
        });
        console.log("MESSAGE ======", sent.data);
        this.updateConversationTime(sent.data.conversation.id);
        return sent;
    }

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
    }

    static async updateConversationTime(conv_id) {
        const done = await axios(
            process.env.REACT_APP_API_URL + `/conversations/${conv_id}`,
            {
                method: "PUT",
                data: {
                    updated_at: new Date().toJSON(),
                    last_visited: new Date().toJSON(),
                },
                headers: {
                    authorization: `Bearer ${Cookies.get("token")}`,
                },
            },
        );
        console.log("=== UPDATING TIME ===", done);
        return done;
    }

    static async getLatestConversationMessage(conv_id){
        const message = await axios(
            process.env.REACT_APP_API_URL +
                `/messages/?conversation=${conv_id}&_sort=updated_at:DESC&_limit=1`,
            {
                headers: {
                    authorization: `Bearer ${Cookies.get("token")}`,
                },
            },
        );
        return message;
    }

}
