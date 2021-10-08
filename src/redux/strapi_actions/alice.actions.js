import Alice from "../../utils/Alice";

export const getAllMySuggestion = () => async (dispatch) => {
    const all = await Alice.getAllMySuggestions();
    dispatch({
        type: "GET_ALL_MY_SUGGESTIONS",
        payload: all.data
    })
};
