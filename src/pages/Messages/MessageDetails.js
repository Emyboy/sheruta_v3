import React from "react";
import { useSelector } from "react-redux";
import Global from "../../Global";
import EachMessage from "./EachMessage";

export default function MessageDetails() {
    const { user } = useSelector((state) => state.auth);
    return (
        <div className="message_container border-gray rounded">
            <div
                className={`user_heading ${Global.isMobile && "p-2 shadow-sm"}`}
            >
                <a href="#">
                    <div className="wrap">
                        <span
                            className="contact-status online bg-danger"
                            style={{ left: Global.isMobile ? "35px" : "25px" }}
                        ></span>
                        <img
                            className="img-fluid"
                            src={user.user.avatar_url}
                            width={Global.isMobile ? "40" : "50"}
                            alt="s5.jpg"
                        />
                        <div className="meta">
                            <h5 className="name">Joanne Davies</h5>
                            <p className="preview">was online today at 11:43</p>
                        </div>
                    </div>
                </a>
            </div>
            <div className="inbox_chatting_box border-bottom">
                <ul
                    className={`chatting_content ${
                        Global.isMobile ? "p-1" : ""
                    }`}
                    style={{ marginBottom: Global.isMobile ? "30vh" : "10vh" }}
                >
                    <EachMessage />
                    <EachMessage />
                    <EachMessage sent />
                    <EachMessage />
                    <EachMessage />
                    <EachMessage sent />
                    <EachMessage sent />
                    <EachMessage />
                    <EachMessage />
                    <EachMessage sent />
                    <EachMessage />
                    <EachMessage />
                    <EachMessage sent />
                    <h6 className="text-muted text-center mt-3">The End</h6>
                </ul>
            </div>
            <div className="mi_text ">
                <div className="message_input">
                    <form className="form-inline">
                        <input
                            className="form-control rounded border-gray mt-2 p-1"
                            type="search"
                            placeholder="Enter message here..."
                            aria-label="Search"
                            style={{ zIndex: 0 }}
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
