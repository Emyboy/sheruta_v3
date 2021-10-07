import React from "react";
import { useSelector } from "react-redux";
import Btn from "../../components/Btn/Btn";
import VerifiedBadge from "../../components/VerifiedBadge/VerifiedBadge";

export default function EachMatchCard() {
    const { user } = useSelector(state => state.auth);
    return (
        <div className="friend-box rounded border-gray w-100 mt-5">
            <div className="frnd-meta">
                <img
                    alt=""
                    src={user.user.avatar_url}
                    width="90"
                    style={{ zIndex: 100 }}
                />
                <div className="frnd-name">
                    <div className="d-flex">
                        <a title="" href="#" className="text-theme">
                            Jack Carter
                        </a>
                        <VerifiedBadge user={{ is_verified: true }} without_text className="ml-2" />
                    </div>
                    <span>@jack5000</span> <br />
                    <Btn
                        className="main-btn2 mt-2 btn-sm"
                        text="View Profile"
                    />
                </div>
            </div>
            <ul className="menu-list pt-5">
                <li>
                    <a href="#" title="" data-ripple="">
                        <i className="fa fa-home"></i>Home
                    </a>
                </li>
                <li>
                    <a href="#" title="" data-ripple="">
                        <i className="fa fa fa-check-circle-o"></i>Match Mark
                    </a>
                </li>
                <li>
                    <a href="#" title="" data-ripple="">
                        <i className="fa fa-history"></i>History
                    </a>
                </li>
                <li>
                    <a href="#" title="" data-ripple="">
                        <i className="fa fa-certificate"></i>My Dates
                    </a>
                </li>
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
