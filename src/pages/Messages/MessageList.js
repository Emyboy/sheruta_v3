import React, { useEffect, useState } from "react";
import MessageService from "../../services/MessageService";
import EachConversation from "./EachConversation";

export default function MessageList() {
    const [conversations, setConversation] = useState([]);
    useEffect(async () => {
        try {
            const convs = await MessageService.getUserConversations();
            setConversation(convs);
            console.log(convs);
        } catch (error) {
            console.log(error);
        }
    }, []);
    return (
        <div className="inbox_user_list bg-white">
            <div className="iu_heading">
                <div className="candidate_revew_search_box">
                    <form className="form-inline">
                        <input
                            className="form-control w-100 border-gray rounded"
                            type="search"
                            placeholder="Search Chat"
                            aria-label="Search"
                        />
                        {/* <button
                                                className="btn"
                                                type="submit"
                                            >
                                                <span className="flaticon-magnifying-glass"></span>
                                            </button> */}
                    </form>
                </div>
            </div>
            <ul style={{ height: "71vh", paddingBottom: "15vh" }}>
                {
                    conversations.map((val, i) => {
                        return <EachConversation key={"conv-"+1} conv={val} />
                    })
                }
            </ul>
        </div>
    );
}
