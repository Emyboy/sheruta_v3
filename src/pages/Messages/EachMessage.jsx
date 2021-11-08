import moment from "moment";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Global from "../../Global";
import MessageService from "../../services/MessageService";

export default function EachMessage({ message }) {
    const { user } = useSelector((state) => state.auth);

    useEffect(() => {
        if (!message.seen && message.to.id === user.user.id) {
            MessageService.updateMessageSeen(message.id);
        }
    }, []);

    return (
        <>
            {message.from.id === user.user.id ? (
                <li className="media reply pb-1">
                    <div className="media-body text-right">
                        <div className="date_time">
                            {moment(message.created_at).fromNow()}
                        </div>
                        <div className="d-flex justify-content-end">
                            <p className="rounded border-gray shadow-sm">
                                {message.message_text}
                            </p>
                        </div>
                        {message.seen && (
                            <small>
                                <i>Seen</i>
                            </small>
                        )}
                    </div>
                </li>
            ) : (
                <li className="media sent pb-1">
                    <span
                        className={`contact-status ${
                            message.from?.online ? "bg-success" : "bg-danger"
                        }`}
                        style={{ left: Global.isMobile ? "35px" : "25px" }}
                    ></span>
                    <img
                        className="img-fluid align-self-start mr-3"
                        width="40"
                        src={message.from.avatar_url}
                        alt="s6.jpg"
                    />
                    <div className="media-body ">
                        <div className="date_time">
                            {moment(message.created_at).fromNow()}
                        </div>
                        <p className="rounded border-gray shadow-sm bg-white">
                            {message.message_text}
                        </p>
                    </div>
                </li>
            )}
        </>
    );
}
