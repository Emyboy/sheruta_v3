import React from "react";
import { useSelector } from "react-redux";
import VerifiedBadge from "../../components/VerifiedBadge/VerifiedBadge";

export default function AcceptedMatchList({ list }) {
    const { user } = useSelector((state) => state.auth);
    return (
        <div className="load-more mb-5">
            {list.map((val, i) => {
                const person = val.users_permissions_user;
                return (
                    <div
                        className="central-meta item pr-0"
                        style={{ display: "inline-block" }}
                    >
                        <div className="classic-post">
                            <figure className="rounded">
                                <img
                                    src={person && person.avatar_url}
                                    alt=""
                                    width="70"
                                    className="rounded"
                                />
                                {/* <span>Super Hot</span> */}
                            </figure>
                            <div className="classic-pst-meta">
                                {/* <div className="more">
                                    <div className="more-post-optns">
                                        <i className="ti-more-alt"></i>
                                        <ul>
                                            <li>
                                                <i className="fa fa-pencil-square-o"></i>
                                                Edit Post
                                            </li>
                                            <li>
                                                <i className="fa fa-trash-o"></i>
                                                Delete Post
                                            </li>
                                            <li className="bad-report">
                                                <i className="fa fa-flag"></i>
                                                Report This Post
                                            </li>
                                            <li>
                                                <i className="fa fa-clock-o"></i>
                                                Schedule Post
                                            </li>
                                            <li>
                                                <i className="fa fa-wpexplorer"></i>
                                                Select as featured
                                            </li>
                                            <li>
                                                <i className="fa fa-bell-slash-o"></i>
                                                Turn off Notifications
                                            </li>
                                        </ul>
                                    </div>
                                </div> */}
                                <h4 className="d-flex">
                                    <a href="#" title="">
                                        {" "}
                                        {person && person.first_name}{" "}
                                        {/* {person && person.last_name} */}
                                    </a>
                                    <VerifiedBadge
                                        user={person}
                                        without_text
                                        className="ml-2"
                                    />
                                </h4>
                                <p>@{person && person.username}</p>
                                {/* <span className="prise">$30,000</span> */}
                                <div className="location-area">
                                    {/* <i>Last Updated: Jan,12 2020</i> */}
                                    {/* <span>
                                        <i className="fa fa-map-marker"></i>{" "}
                                        Toronto, Canada
                                    </span> */}
                                    <a href="#" className="main-btn bg-theme" title="">
                                        Call Me
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
