import axios from "axios";
import Cookies from "js-cookie";

export default class UserService {
    static async setUserOnline() {
        const data = await axios(
            process.env.REACT_APP_API_URL + `/users-permissions/auth/online`,
            {
                method: "POST",
                headers: {
                    authorization: `Bearer ${Cookies.get("token")}`,
                },
            },
        );
        console.log('NOW ONLINE ', data)
        return data;
    }
}
