import axios from "axios";
import Cookies from "js-cookie";

export default class Alice {
    static async getAllMySuggestions() {
        const allMySuggestions = await axios(
            process.env.REACT_APP_API_URL + "/alice/suggest/mine",
            {
                headers: {
                    Authorization: `Bearer ${Cookies.get("token")}`,
                },
            },
        );
        return allMySuggestions;
    }

    static async suggestThemForMe() {
        const them = await axios(
            process.env.REACT_APP_API_URL + "/alice/suggest/them-to-me",
            {
                headers: {
                    Authorization: `Bearer ${Cookies.get("token")}`,
                },
            },
        );
        return them;
    }
    static async suggestMeToThem() {
        const data = await axios(
            process.env.REACT_APP_API_URL + "/alice/suggest/them-to-me",
            {
                headers: {
                    Authorization: `Bearer ${Cookies.get("token")}`,
                },
            },
        );
        return data;
    }
}
