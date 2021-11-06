import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function EachConversation({ conv }) {
    const [otherUser, setOtherUser] = useState(null);
    const { user } = useSelector((state) => state.auth);

    useEffect(() => {
        if(conv.owner.id === user.user.id){
            setOtherUser(conv.guest)
        }else {
            setOtherUser(conv.owner)
        }
    },[]);

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
                            <h5 className="name">{otherUser.first_name} {otherUser.last_name}</h5>
                            <p className="preview">I'm going to office.</p>
                        </div>
                        <div className="m_notif">2</div>
                    </div>
                </Link>
            )}
        </li>
    );
}
