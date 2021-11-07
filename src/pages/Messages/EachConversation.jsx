import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import MessageService from "../../services/MessageService";

export default function EachConversation({ conv }) {
    const [otherUser, setOtherUser] = useState(null);
    const { user } = useSelector((state) => state.auth);
    const [latestMsg, setLatestMsg] = useState(null);

    useEffect(() => {
        if (conv.owner.id === user.user.id) {
            setOtherUser(conv.guest);
        } else {
            setOtherUser(conv.owner);
        }
    }, []);

    useEffect(async () => {
        try {
            const latestMessage =
                await MessageService.getLatestConversationMessage(conv.id);
            setLatestMsg(
                latestMessage.data.length > 0 &&
                    latestMessage.data[0].message_text,
            );
        } catch (error) {
            return Promise.reject(error)
        }
    }, []);

    return (
        <li className="contact border-bottom">
            {otherUser && (
                <Link to={`/messages/${conv.uuid}`}>
                    <div className="wrap">
                        <span
                            className="contact-status online"
                            style={{ left: "40px" }}
                        ></span>
                        <img
                            className="img-fluid"
                            src={otherUser.avatar_url}
                            alt="s1.jpg"
                        />
                        <div className="meta">
                            <h5 className="name">
                                {otherUser.first_name} {otherUser.last_name}
                            </h5>
                            <p className="preview">{latestMsg || "...."}</p>
                        </div>
                        <div className="m_notif">2</div>
                    </div>
                </Link>
            )}
        </li>
    );
}
