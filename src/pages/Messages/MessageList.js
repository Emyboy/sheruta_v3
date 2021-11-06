import React from "react";
import EachMessage from "./EachConversation";

export default function MessageList() {
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
                <EachMessage />
                <EachMessage />
                <EachMessage />
                <EachMessage />
                <EachMessage />
                <EachMessage />
                <EachMessage />
                <EachMessage />
                <EachMessage />
                <EachMessage />
                <EachMessage />
                <EachMessage />
                <EachMessage />
                <EachMessage />
                <EachMessage />
                <EachMessage />
                <EachMessage />
                <EachMessage />
                <EachMessage />
            </ul>
        </div>
    );
}
