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

    static async rejectThisSuggestion(suggestion_id, status) {
        const update = await axios(
            process.env.REACT_APP_API_URL +
                `/alice/suggest/update-status/${suggestion_id}/${status}`,
            {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${Cookies.get("token")}`,
                },
            },
        );
        return update;
    }
}
