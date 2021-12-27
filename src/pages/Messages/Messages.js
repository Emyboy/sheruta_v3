import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import Global from "../../Global";
import EachMessage from "./EachConversation";
import MessageDetails from "./MessageDetails";
import ConversationList from "./ConversationList";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { notifyEmy } from "../../services/Sheruta";

export default function Messages(props) {
    localStorage.setItem('after_login', window.location.pathname)
    localStorage.setItem('after_payment', window.location.pathname)
    const [showConversation, setShowConversation] = useState(false);
    const { user } = useSelector((state) => state.auth);

    useEffect(() => {
        if (props.match.params?.conversation_id) {
            setShowConversation(true);
        } else {
            setShowConversation(false);
        }
    }, [props.match.params?.conversation_id]);

    useEffect(() => {
        notifyEmy({ heading: "visited the message page" });
    }, []);

    if (!user) {
        return <Redirect to="/login" />;
    }

    return (
        <Layout page={"messages"} noBottomSpacing noScroll>
            <div style={{ overflow: "hidden" }}>
                <div className={`container ${Global.isMobile && " m-0"}`}>
                    <div className="row justify-content-center">
                        <div
                            className="p-0 col-lg-7 col-xl-8 maxw100flex-992"
                            style={{
                                height: Global.isMobile ? "83vh" : "86vh",
                            }}
                        >
                            {showConversation ? (
                                <MessageDetails
                                    conversation_id={
                                        props.match.params?.conversation_id
                                    }
                                />
                            ) : (
                                <ConversationList />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
