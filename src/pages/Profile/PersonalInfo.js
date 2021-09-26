import { notification } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Global from "../../Global";

const PersonalInfo = ({ userData }) => {
  const [info, setInfo] = useState(null);
  const [locations, setLocations] = useState([]);
  const [paiedInfo, setPaidInfo] = useState(null);
  useEffect(() => {
    if (userData) {
      axios(
        process.env.REACT_APP_API_URL +
        "/personal-infos/?users_permissions_user=" +
        userData.id,
        {}
      )
        .then((res) => {
          // console.log("INFO --", res);
          setInfo(res.data[0]);
        })
        .catch((err) => {
          // console.log(err);
          notification.error({ message: "Error Fetching Personal Info" });
        });
    }
  }, [userData]);
  useEffect(() => {
    if (userData) {
      axios(
        process.env.REACT_APP_API_URL +
        "/user-preferred-locations/?users_permissions_user=" +
        userData.id,
        {}
      )
        .then((res) => {
          setLocations(res.data);
        })
        .catch((err) => {
          notification.error({ message: "Error Fetching User Locations" });
        });
    }
  }, [userData]);

  if (!info) {
    return null;
  } else
    return (
      <div className="central-meta w-100">
        <button
          className=" btn btn-sm bg-theme text-white shadow"
          style={{
            position: "fixed",
            bottom: "80px",
            right: !Global.isMobile ? "60px" : "30px",
            borderRadius: "50px",
            height: "50px",
            width: "150px",
            zIndex: 2,
            fontSize: "21px",
          }}
        >
          {"Call Me"} <i className="fa fa-phone"></i>
        </button>
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
                <i className="fa fa-briefcase"></i> Company Name
              </span>
              <p>{info.company_name}</p>
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
                <i className="fa fa-map-marker-alt"></i> Preferred Locations
              </span>
              <p>
                {locations.map((val, i) => {
                  return <span key={val.id}>{val.location}{i === locations.length - 1 ? null : ". OR "}</span>;
                })}
              </p>
            </div>
          </div>
          {paiedInfo ? (
            <div>
              <div className="col-lg-6">
                <div className="gen-metabox">
                  <span>
                    <i className="fa fa-user-md"></i> Occupation
                  </span>
                  <p>{info.occupation} </p>
                </div>
                <div className="gen-metabox">
                  <span>
                    <i className="fa fa-map-marker-alt"></i> Preferred Locations
                  </span>
                  <p>
                    {locations.map((val) => {
                      return <span key={val.id}>{val.location} OR </span>;
                    })}
                  </p>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="gen-metabox no-margin">
                  <span>
                    <i className="fa fa-trophy"></i> Badges
                  </span>
                  <ul className="badged"></ul>
                </div>
              </div>
              <div className="col-lg-6">
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
