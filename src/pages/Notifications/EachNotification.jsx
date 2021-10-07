import React from "react";
import { useSelector } from "react-redux";

export default function EachNotification() {
    const { user } = useSelector((state) => state.auth);

    return (
        <li>
            <div className="notifi-meta row">
                <figure style={{ alignSelf: 'center'}}>
                    <img src={user.user.avatar_url} alt="" />
                </figure>
                <div>
                    <h5>bob frank like your post</h5>
                    <small>
                        30 mints ago
                    </small>
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
