import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import MessageService from "../../services/MessageService";
import Global from '../../Global'

export default function EachConversation({ conv }) {
    const [otherUser, setOtherUser] = useState(null);
    const { user } = useSelector((state) => state.auth);
    const { messages } = useSelector((state) => state.view);
    const [latestMsg, setLatestMsg] = useState("");
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (conv.owner.id === user.user.id) {
            setOtherUser(conv.guest);
        } else {
            setOtherUser(conv.owner);
        }
    }, []);

    useEffect(async() => {
        // try {
        //   const _count = await  MessageService.getConversationNewMessages(conv.id)
        //   setCount(_count.data)
        //   console.log('COUNT ---', count);
        // } catch (error) {
            
        // }
        setCount(messages.filter((x) => x.conversation.id === conv.id).length);
    },[messages]);

    useEffect(async () => {
        try {
            const latestMessage =
                await MessageService.getLatestConversationMessage(conv.id);
            setLatestMsg(
                latestMessage.data.length > 0 &&
                    latestMessage.data[0].message_text,
            );
        } catch (error) {
            return Promise.reject(error);
        }
    }, []);

    return (
        <li className="contact border-bottom">
            {otherUser && (
                <Link to={`/messages/${conv.uuid}`}>
                    <div className="wrap">
                        <span
                            className={`contact-status ${
                                otherUser?.online ? "bg-success" : "bg-danger"
                            }`}
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
                            <p className="preview">
                                {latestMsg.length > 27
                                    ? Global.isMobile
                                        ? latestMsg.slice(0, 27) + "...."
                                        : latestMsg.slice(0, 60) + "...."
                                    : latestMsg || "...."}
                            </p>
                        </div>
                        {count !== 0 && <div className="m_notif">{count}</div>}
                    </div>
                </Link>
            )}
        </li>
    );
}
