import moment from "moment";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function EachNotification({ data }) {
    const { user } = useSelector((state) => state.auth);
    console.log(data);
    return (
        <li>
            <div className="notifi-meta">
                <div className="d-flex">
                    <figure style={{ alignSelf: "center" }}>
                        <img
                            src={data.users_permissions_user?.avatar_url}
                            alt=""
                        />
                    </figure>
                    <div>
                        <div className="d-flex">
                            <h5 className="mr-2">
                                <Link
                                    to={`/user/${data.users_permissions_user?.username}`}
                                >
                                    {data.users_permissions_user?.first_name}
                                </Link>{" "}
                                <span style={{ fontWeight: 100 }}>
                                    {data.title}
                                </span>
                            </h5>
                        </div>
                        <small>{moment(data.created_at).fromNow()}</small>
                    </div>
                </div>
            </div>
            {/* <div className="more">
                <div className="more-post-optns">
                    <i className="ti-more-alt"></i>
                    <ul>
                        <li>
                            <i className="fa fa-bell-slash-o"></i>
                            Mute
                        </li>
                        <li>
                            <i className="fa fa-wpexplorer"></i>
                            Report
                        </li>
                        <li>
                            <i className="fa fa-bell-slash-o"></i>
                            Block
                        </li>
                    </ul>
                </div>
            </div> */}
        </li>
    );
}
