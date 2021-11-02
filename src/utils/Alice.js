import axios from "axios";
import Cookies from "js-cookie";

export default class Alice {
    static async getAllMySuggestions() {
        if(Cookies.get("token")){
            const allMySuggestions = await axios(
                process.env.REACT_APP_API_URL + "/alice/suggest/mine",
                {
                    headers: {
                        Authorization: `Bearer ${Cookies.get("token")}`,
                    },
                },
            );
            return allMySuggestions;
        }else {
            return Promise.reject()
        }
    }

    static async suggestThemForMe() {
        // console.log("%c Alice is suggesting", "color: green; font-size: 25px;")
        if(Cookies.get("token")){
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
    }

    static async suggestMeToThem() {
        const data = await axios(
            process.env.REACT_APP_API_URL + "/alice/suggest/me-to-them",
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
    };

    static async getAllMySuggestionsByStatus(status){
        const accepted = await axios(
            process.env.REACT_APP_API_URL + `/alice/suggest/accepted/${status}`,
            {
                headers: {
                    Authorization: `Bearer ${Cookies.get("token")}`,
                },
            },
        );
        return accepted;
    }
}
