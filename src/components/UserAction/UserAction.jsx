import React from "react";
import { IoMail, IoCallSharp } from "react-icons/io5";
import { Link } from "react-router-dom";

export default function UserAction({ user, disable }) {
    return (
        <div className="d-flex justify-content-center">
            <Link to={`/messages/new/${user.id}`}>
                <button
                    disable={disable}
                    className="btn shadow bg-theme text-white rounded ml-2 mr-2"
                >
                    <IoMail className="mr-2" />
                    Message
                </button>
            </Link>
            <a href={`tel:${user?.phone_number}`}>
                <button
                    disabled={disable}
                    className="btn shadow bg-theme text-white rounded ml-2 mr-2"
                >
                    <IoCallSharp className="mr-2" />
                    Call
                </button>
            </a>
        </div>
    );
}
