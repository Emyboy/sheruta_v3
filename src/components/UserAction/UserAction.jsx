import React from "react";
import { IoMail, IoCallSharp } from "react-icons/io5";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function UserAction({ user, disable, alignment }) {
    const auth = useSelector((state) => state.auth);
    return (
        <>
            {auth.user && auth.user.user.id === user.id ? null : (
                <div className={`d-flex justify-content-${alignment || 'center'}`}>
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
                            Call Me
                        </button>
                    </a>
                </div>
            )}
        </>
    );
}
