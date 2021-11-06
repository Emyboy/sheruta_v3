import React from "react";
import { useSelector } from "react-redux";
import Global from "../../Global";
import EachMessage from "./EachMessage";

export default function MessageDetails() {
    const { user } = useSelector((state) => state.auth);
    return (
        <div className="message_container border-gray rounded">
            <div className={`user_heading ${Global.isMobile ? "p-2" : "p-3"}`}>
                <a className="shadow">
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
                    <form className="form-inline border-top">
                        <input
                            className="bg-them-light p-2 border-gray m-2 mb-2 w-100"
                            type="text"
                            placeholder="Enter message here..."
                            aria-label="Message"
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
