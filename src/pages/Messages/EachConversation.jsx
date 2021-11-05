import React from "react";
import { useSelector } from "react-redux";

export default function EachConversation() {
    const { user } = useSelector((state) => state.auth);
    return (
        <li className="contact border-bottom">
            <a href="#">
                <div className="wrap">
                    <span
                        className="contact-status online"
                        style={{ left: "40px" }}
                    ></span>
                    <img
                        className="img-fluid"
                        src={user.user.avatar_url}
                        alt="s1.jpg"
                    />
                    <div className="meta">
                        <h5 className="name">Vincent Porter</h5>
                        <p className="preview">I'm going to office.</p>
                    </div>
                    <div className="m_notif">2</div>
                </div>
            </a>
        </li>
    );
}
