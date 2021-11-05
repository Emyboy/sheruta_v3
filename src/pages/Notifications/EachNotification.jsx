import moment from "moment";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import Notifications from "../../utils/Notifications";

export default function EachNotification({ data }) {
    localStorage.setItem('after_login', '/notifications');
    const { user } = useSelector(state => state.auth);
    useEffect(async () => {
        try {
            if (!data.seen) {
                setTimeout(() => {
                    Notifications.markNotificationAsSeen(data.id);
                }, 2000);
            }
        } catch (error) {
            return Promise.reject(error);
        }
    }, []);

    if(!user){
        return <Redirect to='/login' />
    }

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
                                    to={data.users_permissions_user ?`/user/${data.users_permissions_user?.username}`: '#'}
                                >
                                    {data.users_permissions_user?.first_name ||
                                        "Someone"}
                                </Link>{" "}
                                <span style={{ fontWeight: 100 }}>
                                    {data.title}
                                    {!data.seen && (
                                        <span className="badge badge-info ml-2">
                                            NEW
                                        </span>
                                    )}
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
