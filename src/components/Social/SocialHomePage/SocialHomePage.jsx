import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Global from "../../../Global";
import EachSocialRequest from "../EachSocialRequest";
import Sticky from "react-sticky-el";
import { PropertyCardSM } from "../../PropertyCard/PropertyCardSM";
import { Link } from "react-router-dom";
import Btn from "../../Btn/Btn";
import { getUser } from "../../../redux/strapi_actions/auth.actions";
import Heading from "../../Heading/Heading";
import { Spinner } from "react-activity";
import VerifiedBadge from "../../VerifiedBadge/VerifiedBadge";
import match from "../../../assets/img/match.jpeg";
import PostRequestAds from "../../Ads/RequestAds/PostRequestAds";
// import FreeRequestAds from "../../Ads/RequestAds/FeeRequestAds";

export default (props) => {
    const auth = useSelector((state) => state.auth);
    const view = useSelector((state) => state.view);
    const dispatch = useDispatch();
    const { user } = auth.user;
    const [state, setState] = useState({
        properties: [],
        list: [],
    });
    const [newUsers, setNewUsers] = useState([]);

    useEffect(() => {
        if (auth.user) {
            dispatch(getUser());
        }
    }, []);

    useEffect(() => {
        if (state.properties.length === 0) {
            axios(
                process.env.REACT_APP_API_URL +
                    `/properties/recent/${Global.isMobile ? "4" : "5"}`,
            )
                .then((res) => {
                    setState({ ...state, properties: res.data });
                })
                .catch((err) => {});
        }
    }, [state]);

    useEffect(() => {
        axios(
            process.env.REACT_APP_API_URL +
                `/users/?confirmed=true&_limit=4&_sort=created_at:DESC`,
        )
            .then((res) => {
                setNewUsers(res.data);
            })
            .catch((err) => {});
    }, []);
    useEffect(() => {
        if (state.list.length === 0) {
            axios(
                process.env.REACT_APP_API_URL +
                    `/property-requests/?is_searching=${!view.personal_info
                        .looking_for}&_limit=25&_start=0&_sort=created_at:DESC`,
            )
                .then((res) => {
                    setState({ ...state, list: res.data });
                    // console.log('FEED -----', res.data)
                    dispatch({
                        type: "SET_VIEW_STATE",
                        payload: {
                            feed: res.data,
                        },
                    });
                })
                .catch((err) => {});
        }
    }, [state, view.personal_info.looking_for]);
    return (
        <section className="mt-0 pt-0 bgc-f7">
            <div className="gap2 bgc-f7">
                <div className="container">
                    <div className="row">
                        <div className="">
                            <div className="row merged20" id="page-contents">
                                {Global.isMobile ? null : (
                                    <div className="col-lg-3 desktop-only">
                                        <Sticky
                                            stickyStyle={{ marginTop: "80px" }}
                                        >
                                            <aside className="sidebar static left rounded">
                                                <div className="widget border-gray rounded">
                                                    <h4 className="widget-title">
                                                        Your page
                                                    </h4>
                                                    <div className="your-page">
                                                        <figure>
                                                            <a
                                                                href="#"
                                                                title=""
                                                            >
                                                                <img
                                                                    src={
                                                                        user.avatar_url
                                                                    }
                                                                    alt=""
                                                                />
                                                            </a>
                                                        </figure>
                                                        <div className="page-meta">
                                                            <Link
                                                                to={`/user/${user.username}`}
                                                                title=""
                                                            >
                                                                {
                                                                    user.first_name
                                                                }{" "}
                                                                {user.last_name}
                                                            </Link>
                                                            <span>
                                                                @{user.username}
                                                            </span>
                                                            {/* <span>
                              <i className="ti-comment"></i>
                              <a href="insight.html" title="">
                                Messages <em>9</em>
                              </a>
                            </span>
                            <span>
                              <i className="ti-bell"></i>
                              <a href="insight.html" title="">
                                Notifications <em>2</em>
                              </a>
                            </span> */}
                                                        </div>
                                                        {/* <ul className="page-publishes">
                            <li>
                              <span>
                                <i className="ti-pencil-alt"></i>Publish
                              </span>
                            </li>
                            <li>
                              <span>
                                <i className="ti-camera"></i>Photo
                              </span>
                            </li>
                            <li>
                              <span>
                                <i className="ti-video-camera"></i>Live
                              </span>
                            </li>
                            <li>
                              <span>
                                <i className="fa fa-user-plus"></i>Invite
                              </span>
                            </li>
                          </ul> */}
                                                        <div className="page-likes">
                                                            {/* <div className="tab-content">
                              <div
                                className="tab-pane active fade show"
                                id="link1"
                              >
                                <span>
                                  <i className="ti-heart"></i>884
                                </span>
                                <a href="#" title="weekly-likes">
                                  35 new likes this week
                                </a>
                                <div className="users-thumb-list">
                                  <a
                                    href="#"
                                    title=""
                                    data-toggle="tooltip"
                                    data-original-title="Anderw"
                                  >
                                    <img
                                      src="images/resources/userlist-1.jpg"
                                      alt=""
                                    />
                                  </a>
                                  <a
                                    href="#"
                                    title=""
                                    data-toggle="tooltip"
                                    data-original-title="frank"
                                  >
                                    <img
                                      src="images/resources/userlist-2.jpg"
                                      alt=""
                                    />
                                  </a>
                                  <a
                                    href="#"
                                    title=""
                                    data-toggle="tooltip"
                                    data-original-title="Sara"
                                  >
                                    <img
                                      src="images/resources/userlist-3.jpg"
                                      alt=""
                                    />
                                  </a>
                                  <a
                                    href="#"
                                    title=""
                                    data-toggle="tooltip"
                                    data-original-title="Amy"
                                  >
                                    <img
                                      src="images/resources/userlist-4.jpg"
                                      alt=""
                                    />
                                  </a>
                                  <a
                                    href="#"
                                    title=""
                                    data-toggle="tooltip"
                                    data-original-title="Ema"
                                  >
                                    <img
                                      src="images/resources/userlist-5.jpg"
                                      alt=""
                                    />
                                  </a>
                                  <a
                                    href="#"
                                    title=""
                                    data-toggle="tooltip"
                                    data-original-title="Sophie"
                                  >
                                    <img
                                      src="images/resources/userlist-6.jpg"
                                      alt=""
                                    />
                                  </a>
                                  <a
                                    href="#"
                                    title=""
                                    data-toggle="tooltip"
                                    data-original-title="Maria"
                                  >
                                    <img
                                      src="images/resources/userlist-7.jpg"
                                      alt=""
                                    />
                                  </a>
                                </div>
                              </div>
                              <div className="tab-pane fade" id="link2">
                                <span>
                                  <i className="fa fa-eye"></i>440
                                </span>
                                <a href="#" title="weekly-likes">
                                  440 new views this week
                                </a>
                                <div className="users-thumb-list">
                                  <a
                                    href="#"
                                    title=""
                                    data-toggle="tooltip"
                                    data-original-title="Anderw"
                                  >
                                    <img
                                      src="images/resources/userlist-1.jpg"
                                      alt=""
                                    />
                                  </a>
                                  <a
                                    href="#"
                                    title=""
                                    data-toggle="tooltip"
                                    data-original-title="frank"
                                  >
                                    <img
                                      src="images/resources/userlist-2.jpg"
                                      alt=""
                                    />
                                  </a>
                                  <a
                                    href="#"
                                    title=""
                                    data-toggle="tooltip"
                                    data-original-title="Sara"
                                  >
                                    <img
                                      src="images/resources/userlist-3.jpg"
                                      alt=""
                                    />
                                  </a>
                                  <a
                                    href="#"
                                    title=""
                                    data-toggle="tooltip"
                                    data-original-title="Amy"
                                  >
                                    <img
                                      src="images/resources/userlist-4.jpg"
                                      alt=""
                                    />
                                  </a>
                                  <a
                                    href="#"
                                    title=""
                                    data-toggle="tooltip"
                                    data-original-title="Ema"
                                  >
                                    <img
                                      src="images/resources/userlist-5.jpg"
                                      alt=""
                                    />
                                  </a>
                                  <a
                                    href="#"
                                    title=""
                                    data-toggle="tooltip"
                                    data-original-title="Sophie"
                                  >
                                    <img
                                      src="images/resources/userlist-6.jpg"
                                      alt=""
                                    />
                                  </a>
                                  <a
                                    href="#"
                                    title=""
                                    data-toggle="tooltip"
                                    data-original-title="Maria"
                                  >
                                    <img
                                      src="images/resources/userlist-7.jpg"
                                      alt=""
                                    />
                                  </a>
                                </div>
                              </div>
                            </div> */}

                                                            <Link
                                                                to={`/user/${user.username}`}
                                                            >
                                                                <div className="nav nav-tabs likes-btn d-flex justify-content-center">
                                                                    <Btn
                                                                        className="btn-sm"
                                                                        text="View Profile"
                                                                        onClick={() => {}}
                                                                    />
                                                                </div>
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="widget border-gray rounded">
                                                    <h4 className="widget-title">
                                                        New Users
                                                    </h4>
                                                    <ul
                                                        className="followers ps-container ps-theme-default ps-active-y"
                                                        data-ps-id="dcb7159e-c79e-aac7-b46b-9ac56abf3ecd"
                                                    >
                                                        {newUsers.map(
                                                            (val, i) => {
                                                                if (
                                                                    val.id !==
                                                                    auth.user
                                                                        .user.id
                                                                ) {
                                                                    return (
                                                                        <li>
                                                                            <figure>
                                                                                <img
                                                                                    src={
                                                                                        val.avatar_url
                                                                                    }
                                                                                    alt=""
                                                                                />
                                                                            </figure>
                                                                            <div className="friend-meta">
                                                                                <h4>
                                                                                    <Link
                                                                                        to={`/user/${val.username}`}
                                                                                        title=""
                                                                                        className="d-flex"
                                                                                    >
                                                                                        {
                                                                                            val.username
                                                                                        }
                                                                                        <VerifiedBadge
                                                                                            without_text
                                                                                            user={
                                                                                                val
                                                                                            }
                                                                                            size={
                                                                                                15
                                                                                            }
                                                                                            className="ml-2"
                                                                                        />
                                                                                    </Link>
                                                                                </h4>
                                                                                {/* <Link
                                                                                  to={`/user/${val.username}`}
                                                                                  title=""
                                                                                  className="underline"
                                                                              >
                                                                                  View
                                                                                  Profile
                                                                              </Link> */}
                                                                            </div>
                                                                        </li>
                                                                    );
                                                                }
                                                            },
                                                        )}

                                                        <div
                                                            className="ps-scrollbar-x-rail"
                                                            style={{
                                                                left: "0px",
                                                                bottom: "0px",
                                                            }}
                                                        >
                                                            <div
                                                                className="ps-scrollbar-x"
                                                                tabindex="0"
                                                                style={{
                                                                    left: "0px",
                                                                    width: "0px",
                                                                }}
                                                            ></div>
                                                        </div>
                                                        <div
                                                            className="ps-scrollbar-y-rail"
                                                            style={{
                                                                top: "0px",
                                                                height: "260px",
                                                                right: "0px",
                                                            }}
                                                        >
                                                            <div
                                                                className="ps-scrollbar-y"
                                                                tabindex="0"
                                                                style={{
                                                                    top: "0px",
                                                                    height: "233px",
                                                                }}
                                                            ></div>
                                                        </div>
                                                    </ul>
                                                </div>
                                            </aside>
                                        </Sticky>
                                    </div>
                                )}
                                <div className="col-lg-5">
                                    
                                    {state.list.map((val, i) => {
                                        if (i == 5) {
                                            return (
                                                <img
                                                    src={match}
                                                    className="rounded mb-3"
                                                />
                                            );
                                        } else if (i === 2) {
                                            return <PostRequestAds />
                                        }
                                        return (
                                            <EachSocialRequest
                                                key={i + " request"}
                                                data={val}
                                            />
                                        );
                                    })}
                                    {state.list.length === 0 ? (
                                        <div className="central-meta item rounded border-gray text-center d-flex justify-content-center mt-5 pt-5">
                                            <Spinner />
                                        </div>
                                    ) : null}
                                </div>
                                {Global.isMobile ? null : (
                                    <div className="col-lg-4 desktop-only">
                                        <Sticky
                                            stickyStyle={{ marginTop: "50px" }}
                                        >
                                            <Heading heading="Recent Apartments" />
                                            {state.properties.length === 0 ? (
                                                <div className="central-meta item rounded border-gray text-center d-flex justify-content-center">
                                                    <Spinner />
                                                </div>
                                            ) : null}
                                            {state.properties.map((val, i) => {
                                                return (
                                                    <PropertyCardSM
                                                        val={val}
                                                        key={i}
                                                    />
                                                );
                                            })}
                                        </Sticky>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
