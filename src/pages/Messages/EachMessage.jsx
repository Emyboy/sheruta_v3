import React from "react";
import { useSelector } from "react-redux";
import Global from "../../Global";

export default function EachMessage({ sent }) {
    const { user } = useSelector((state) => state.auth);
    return (
        <>
            {sent ? (
                <li className="media reply">
                    <div className="media-body text-right ">
                        <div className="date_time">Today, 10:35</div>
                        <div className="d-flex justify-content-end">
                            <p className="rounded border-gray shadow-sm">
                                The project finally complete! Let's go to!
                            </p>
                        </div>
                    </div>
                </li>
            ) : (
                <li className="media sent">
                    <span
                        className="contact-status busy"
                        style={{ left: Global.isMobile ? "35px" : "25px" }}
                    ></span>
                    <img
                        className="img-fluid align-self-start mr-3"
                        width="40"
                        src={user.user.avatar_url}
                        alt="s6.jpg"
                    />
                    <div className="media-body ">
                        <div className="date_time">Today, 10:45</div>
                        <p className="rounded border-gray shadow-sm">
                            Let's go!
                        </p>
                    </div>
                </li>
            )}
        </>
    );
}
