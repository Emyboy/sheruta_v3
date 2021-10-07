import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Btn from "../../components/Btn/Btn";
import VerifiedBadge from "../../components/VerifiedBadge/VerifiedBadge";

export default function EachMatchCard({ data }) {
    const { users_permissions_user } = data;
    const { user } = useSelector((state) => state.auth);
    return (
        <div className="friend-box rounded border-gray w-100 mt-5">
            <div className="frnd-meta">
                <img
                    alt=""
                    src={users_permissions_user.avatar_url}
                    width="90"
                    style={{ zIndex: 100 }}
                    className="shadow"
                />
                <div className="frnd-name">
                    <div className="d-flex">
                        <Link
                            title=""
                            to={`/user/${users_permissions_user.username}`}
                            className="text-theme"
                        >
                            {users_permissions_user.first_name}{" "}
                            {users_permissions_user.last_name}
                        </Link>
                        <VerifiedBadge
                            user={users_permissions_user}
                            without_text
                            className="ml-2"
                        />
                    </div>
                    <span>@{users_permissions_user.username}</span> <br />
                    <Link to={`/user/${users_permissions_user.username}`}>
                        <Btn
                            className="main-btn2 mt-2 btn-sm"
                            text="View Profile"
                            onClick={() => {}}
                        />
                    </Link>
                </div>
            </div>
            <ul className="menu-list pt-5">
                <li>
                    <a href="#" title="" data-ripple="">
                        <i className="fa fa-fire"></i>Case Studies
                    </a>
                </li>
                <li>
                    <a href="#" title="" data-ripple="">
                        <i className="fa fa-sun-o"></i>Privacy &amp; Policy
                    </a>
                </li>
                <li>
                    <a href="#" title="" data-ripple="">
                        <i className="fa fa-question-circle"></i>Help
                    </a>
                </li>
            </ul>
        </div>
    );
}
