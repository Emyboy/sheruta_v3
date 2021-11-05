import React from "react";
import Layout from "../../components/Layout/Layout";
import Global from "../../Global";
import EachMessage from "./EachConversation";
import MessageDetails from "./MessageDetails";
import MessageList from "./MessageList";

export default function Messages() {
    return (
        <Layout page={"messages"}>
            <div style={{ overflow: "hidden" }}>
                <div className={`container ${Global.isMobile && "p-0 m-0"}`}>
                    <div className="row justify-content-center">
                        <div
                            className="col-lg-7 col-xl-8 maxw100flex-992"
                            style={{
                                height: Global.isMobile ? "83vh" : "86vh",
                            }}
                        >
                            {/* <MessageList /> */}
                            <MessageDetails />
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
