import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Global from "../../Global";
import EachMessage from "./EachMessage";
import { IoIosArrowBack } from "react-icons/io";
import { IoCallSharp } from "react-icons/io5";
import { useHistory } from "react-router";
import MessageService from "../../services/MessageService";
import { useInterval } from "react-use";

export default function MessageDetails({ conversation_id }) {
    const [message, setMessage] = useState(null);
    const [messages, setMessages] = useState([]);
    const { user } = useSelector((state) => state.auth);
    const [conversation, setConversation] = useState(null);
    const [otherUser, setOtherUser] = useState(null);
    const history = useHistory();

    // const conversation_id = props.match.params.conversation_id;

    const getMessages = async () => {
        if (conversation && conversation_id) {
            const msgs = await MessageService.getConversationMessages(
                conversation.id,
            );
            setMessages(msgs.data);
        }
    };

    useEffect(() => {
        axios(
            process.env.REACT_APP_API_URL +
                `/conversations/?uuid=${conversation_id}`,
        )
            .then((res) => {
                if (res.data[0].owner.id !== user.user.id) {
                    setOtherUser(res.data[0].owner);
                } else {
                    setOtherUser(res.data[0].guest);
                }
                setConversation(res.data[0]);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    useEffect(async () => {
        if (conversation && conversation_id) {
            const msgs = await MessageService.getConversationMessages(
                conversation.id,
            );
            setMessages(msgs.data);
        }
    }, [conversation]);

    useEffect(async () => {
        getMessages();
    }, [conversation]);

    useInterval(() => {
        if (conversation && conversation_id){
            getMessages()
        }
    },10000)

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const sent = await MessageService.sendMessage({
                to: otherUser,
                from: user.user.id,
                message_text: message,
                seen: false,
                conversation: conversation.id,
            });
        } catch (error) {
            console.log("ERROR ===", error);
        }
    };

    return (
        <div className="message_container border-gray rounded">
            {otherUser && (
                <div
                    className={`user_heading ${
                        Global.isMobile ? "p-2" : "pl-2 p-3 "
                    }`}
                >
                    <a className="shadow">
                        <div className="wrap">
                            {/* <span
                                className="contact-status online bg-danger"
                                style={{
                                    left: Global.isMobile ? "35px" : "25px",
                                }}
                            ></span> */}
                            <div
                                className="d-flex justify-content-between"
                                style={{ alignItems: "center" }}
                            >
                                <div
                                    className="d-flex"
                                    style={{ alignItems: "center" }}
                                >
                                    <button
                                        className="btn btn-sm pl-0"
                                        onClick={() =>
                                            history.push("/messages")
                                        }
                                    >
                                        <IoIosArrowBack size={20} />
                                    </button>
                                    <img
                                        className="img-fluid"
                                        src={otherUser.avatar_url}
                                        width={Global.isMobile ? "40" : "50"}
                                        alt="s5.jpg"
                                    />
                                    <div className="meta">
                                        <h5 className="name">
                                            {otherUser.first_name}{" "}
                                            {otherUser.last_name}
                                        </h5>
                                        <p className="preview">
                                            {/* was online today at 11:43 */}@
                                            {otherUser.username}
                                        </p>
                                    </div>
                                </div>
                                <button className="btn btn-sm">
                                    <IoCallSharp
                                        size={25}
                                        className="text-theme"
                                    />
                                </button>
                            </div>
                        </div>
                    </a>
                </div>
            )}
            <div
                className="inbox_chatting_box border-bottom bg-them-light"
                style={{ height: "70vh" }}
            >
                <ul
                    className={`chatting_content ${
                        Global.isMobile ? "p-1" : ""
                    }`}
                    style={{ marginBottom: Global.isMobile ? "30vh" : "10vh" }}
                >
                    {messages.map((val, i) => {
                        return <EachMessage message={val} key={`msg-${i}`} />;
                    })}
                    <h6 className="text-muted text-center mt-3">The End</h6>
                </ul>
            </div>
            <div
                className="mi_text bg-white"
                style={
                    Global.isMobile
                        ? {
                              position: "fixed",
                              width: "100vw",
                              bottom: "9%",
                          }
                        : null
                }
            >
                <div className="message_input_">
                    <form
                        className="form-inline border-top"
                        onSubmit={handleSubmit}
                    >
                        <input
                            className="bg-them-light p-2 border-gray m-2 mb-4 w-100"
                            type="text"
                            placeholder="Enter message here..."
                            aria-label="Message"
                            onChange={(e) => setMessage(e.target.value)}
                            style={{
                                zIndex: 0,
                                borderRadius: "50px",
                                // backgroundColor: "#F0F5EF",
                            }}
                        />
                        {/* <button className="btn btn-sm" type="submit">
                            Send Message
                        </button> */}
                    </form>
                </div>
            </div>
        </div>
    );
}
