import axios from "axios";
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
        return [...conv1.data, ...conv2.data];
    }
}
