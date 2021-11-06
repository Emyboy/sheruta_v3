import { notification } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Global from "../../Global";
import { IoMail, IoCallSharp } from "react-icons/io5";
import UserAction from "../../components/UserAction/UserAction";

const PersonalInfo = ({ userData }) => {
    const [info, setInfo] = useState(null);
    const [locations, setLocations] = useState([]);
    const [paiedInfo, setPaidInfo] = useState(true);
    const [showFloating, setShowFloating] = useState(false);
    useEffect(() => {
        if (userData) {
            axios(
                process.env.REACT_APP_API_URL +
                    "/personal-infos/?users_permissions_user=" +
                    userData.id,
                {},
            )
                .then((res) => {
                    // console.log("INFO --", res);
                    setInfo(res.data[0]);
                })
                .catch((err) => {
                    // console.log(err);
                    notification.error({
                        message: "Error Fetching Personal Info",
                    });
                });
        }
    }, [userData]);
    useEffect(() => {
        if (userData) {
            axios(
                process.env.REACT_APP_API_URL +
                    "/user-preferred-locations/?users_permissions_user=" +
                    userData.id,
                {},
            )
                .then((res) => {
                    setLocations(res.data);
                })
                .catch((err) => {
                    notification.error({
                        message: "Error Fetching User Locations",
                    });
                });
        }
    }, [userData]);

    if (!info) {
        return null;
    } else
        return (
            <div className="central-meta w-100 border-gray rounded">
                <div
                    className="fixed-bottom text-center animated animate__bounceInUp"
                    style={{
                        marginBottom: Global.isMobile ? "15vh" : "10vh",
                    }}
                >
                    <UserAction />
                </div>

                <span className="create-post">
                    Personal Info
                    {/* <a href="#" className="p-2 bg-theme text-white rounded shadow">
            Call Me <i className="fa fa-phone"></i>
          </a> */}
                </span>
                <div className="row">
                    <div className="col-lg-6">
                        <div className="gen-metabox">
                            <span>
                                <i className="fa fa-briefcase mr-1"></i>Work
                                Industry
                            </span>
                            <p>
                                {info.work_industry && info.work_industry.name}
                            </p>
                        </div>
                        <div className="gen-metabox">
                            <span>
                                <i className="fa fa-venus-mars"></i> Gender
                            </span>
                            <p>{info.gender && info.gender.toUpperCase()}</p>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="gen-metabox">
                            <span>
                                <i className="fa fa-user-md"></i> Occupation
                            </span>
                            <p>{info.occupation} </p>
                        </div>
                        <div className="gen-metabox">
                            <span>
                                <i className="fa fa-map-marker-alt"></i>{" "}
                                Preferred Locations
                            </span>
                            <p>
                                {locations.map((val, i) => {
                                    return (
                                        <span key={val.id}>
                                            {val.location}
                                            {i === locations.length - 1
                                                ? null
                                                : ". OR "}
                                        </span>
                                    );
                                })}
                            </p>
                        </div>
                    </div>
                    {paiedInfo ? (
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-lg-6">
                                    <div className="gen-metabox">
                                        <span>
                                            <i className="fa fa-user"></i> Local
                                            Government
                                        </span>
                                        <p>{info.lgaOfOrigin} </p>
                                    </div>
                                    <div className="gen-metabox">
                                        <span>
                                            <i className="fa fa-user-alt"></i>{" "}
                                            Looking for ages
                                        </span>
                                        <p>{info.looking_for_age_range}</p>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="gen-metabox no-margin">
                                        <span>
                                            <i className="fa fa-pray"></i>{" "}
                                            Religion
                                        </span>
                                        <p className="badged">
                                            {info.religion}
                                        </p>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="gen-metabox no-margin">
                                        <span>
                                            <i className="fa fa-map"></i> State
                                            Of Origin
                                        </span>
                                        <p className="badged">
                                            {info.stateOfOrigin}
                                        </p>
                                    </div>
                                </div>
                                {/* <div className="col-lg-6">
                <div className="gen-metabox no-margin">
                  <span>
                    <i className="fa fa-sitemap"></i> Social Networks
                  </span>
                  <ul className="sociaz-media">
                    <li>
                      <a className="facebook" href="#" title="">
                        <i className="fa fa-facebook"></i>
                      </a>
                    </li>
                    <li>
                      <a className="twitter" href="#" title="">
                        <i className="fa fa-twitter"></i>
                      </a>
                    </li>
                    <li>
                      <a className="google" href="#" title="">
                        <i className="fa fa-google-plus"></i>
                      </a>
                    </li>
                    <li>
                      <a className="vk" href="#" title="">
                        <i className="fa fa-vk"></i>
                      </a>
                    </li>
                    <li>
                      <a className="instagram" href="#" title="">
                        <i className="fa fa-instagram"></i>
                      </a>
                    </li>
                  </ul>
                </div>
              </div> */}
                            </div>
                        </div>
                    ) : null}
                </div>
            </div>
        );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(PersonalInfo);
