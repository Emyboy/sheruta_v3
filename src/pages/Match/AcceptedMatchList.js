import React from "react";
import { useSelector } from "react-redux";

export default function AcceptedMatchList() {
    const { user } = useSelector(state => state.auth);
    return (
        <div className="load-more">
            <div className="central-meta item" style={{ display: "inline-block" }}>
                <div className="classic-post">
                    <figure className='rounded'>
                        <img src={user && user.user.avatar_url} alt="" width="70" className='rounded' />
                        <span>Super Hot</span>
                    </figure>
                    <div className="classic-pst-meta">
                        <div className="more">
                            <div className="more-post-optns">
                                <i className="ti-more-alt"></i>
                                <ul>
                                    <li>
                                        <i className="fa fa-pencil-square-o"></i>
                                        Edit Post
                                    </li>
                                    <li>
                                        <i className="fa fa-trash-o"></i>Delete Post
                                    </li>
                                    <li className="bad-report">
                                        <i className="fa fa-flag"></i>Report This
                                        Post
                                    </li>
                                    <li>
                                        <i className="fa fa-clock-o"></i>Schedule
                                        Post
                                    </li>
                                    <li>
                                        <i className="fa fa-wpexplorer"></i>Select
                                        as featured
                                    </li>
                                    <li>
                                        <i className="fa fa-bell-slash-o"></i>Turn
                                        off Notifications
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <h4>
                            <i className="fa fa-check-circle" title="verified"></i>{" "}
                            <a href="#" title="">
                                {" "}
                                Beautiful Iphone X mobile
                            </a>
                        </h4>
                        <p>
                            Beautiful House loacated at a very simple location{" "}
                        </p>
                        <span className="prise">$30,000</span>
                        <div className="location-area">
                            <i>Last Updated: Jan,12 2020</i>
                            <span>
                                <i className="fa fa-map-marker"></i> Toronto, Canada
                            </span>
                            <a href="#" className="main-btn" title="">
                                Add to Cart
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
