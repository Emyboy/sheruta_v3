import React from "react";
import { BiRocket, BiCommentDetail } from "react-icons/bi";
import { BsShieldCheck } from "react-icons/bs";
import { IoPricetagsOutline } from "react-icons/io5";
import { RiUserSearchLine } from "react-icons/ri";
import {
  MdElectricalServices,
  MdOutlineLocationOn,
  MdWorkOutline,
} from "react-icons/md";
import { Link } from 'react-router-dom';

export default function SideNav({ show }) {
  const size = 25;
  return (
    <nav className={`pb-5 navigation scroll-bar ${show && "nav-active"}`}>
      <div className="container ps-0 pe-0">
        <div className="nav-content mb-5">
          <div className="nav-wrap bg-white bg-transparent-card rounded-xxl shadow-xss pt-3 pb-1 mb-2 mt-2">
            <div className="nav-caption fw-600 font-xssss text-grey-500">
              <span>Get </span>Started
            </div>
            <ul className="mb-1 top-content">
              <li className="logo d-none d-xl-block d-lg-block"></li>
              <li>
                <a className="nav-content-bttn open-font">
                  <i className=" btn-round-md bg-blue-gradiant me-3">
                    <BiRocket size={size} />
                  </i>
                  <span>Get Started</span>
                </a>
              </li>
              <li>
                <a className="nav-content-bttn open-font">
                  <i className=" btn-round-md bg-red-gradiant me-3">
                    <BiCommentDetail size={size} />
                  </i>
                  <span>Requests</span>
                </a>
              </li>
              <li>
                <a className="nav-content-bttn open-font">
                  <i className=" btn-round-md bg-gold-gradiant me-3">
                    <IoPricetagsOutline size={size} />
                  </i>
                  <span>Pricing</span>
                </a>
              </li>
              <li>
                <a className="nav-content-bttn open-font">
                  <i className="btn-round-md bg-mini-gradiant me-3">
                    <MdElectricalServices size={size} />
                  </i>
                  <span>Services</span>
                </a>
              </li>
              <li>
                <a className="nav-content-bttn open-font">
                  <i className="btn-round-md bg-primary-gradiant me-3">
                    <MdOutlineLocationOn size={size} />
                  </i>
                  <span>Locations</span>
                </a>
              </li>
            </ul>
          </div>

          <div className="nav-wrap bg-white bg-transparent-card rounded-xxl shadow-xss pt-3 pb-1 mb-2">
            <div className="nav-caption fw-600 font-xssss text-grey-500">
              <span>More </span>Pages
            </div>
            <ul className="mb-3">
              <li>
                <a className="nav-content-bttn open-font">
                  <i className="font-xl text-current me-3">
                    <MdWorkOutline />
                  </i>
                  <span>About Us</span>
                  {/* <span className="circle-count bg-warning mt-1">584</span> */}
                </a>
              </li>
              <li>
                <a className="nav-content-bttn open-font">
                  <i className="font-xl text-current me-3">
                    <BsShieldCheck />
                  </i>
                  <span>Term and Conditions </span>
                </a>
              </li>
              <li>
                <a className="nav-content-bttn open-font">
                  <i className="font-xl text-current me-3">
                    <RiUserSearchLine />
                  </i>
                  <span>How It Works</span>
                </a>
              </li>
              {/* <li>
								<a className="nav-content-bttn open-font">
									<i className="font-xl text-current feather-youtube me-3"></i>
									<span>Live Stream</span>
								</a>
							</li> */}
            </ul>
          </div>
          <div className="nav-wrap bg-white bg-transparent-card rounded-xxl shadow-xss pt-3 pb-1">
            <div className="nav-caption fw-600 font-xssss text-grey-500">
              <span></span> Account
            </div>
            <ul className="mb-1">
              <li className="logo d-none d-xl-block d-lg-block"></li>
              <li>
                <Link to="/settings">
                  <a className="nav-content-bttn open-font h-auto pt-2 pb-2">
                    <i className="font-sm feather-settings me-3 text-grey-500"></i>
                    <span>Settings</span>
                  </a>
                </Link>
              </li>
              <li>
                <a className="nav-content-bttn open-font h-auto pt-2 pb-2">
                  <i className="font-sm feather-pie-chart me-3 text-grey-500"></i>
                  <span>Analytics</span>
                  <span className="circle-count bg-info mt-0">Coming Soon</span>
                </a>
              </li>
              <li>
                <a className="nav-content-bttn open-font h-auto pt-2 pb-2">
                  <i className="font-sm feather-power me-3 text-grey-500"></i>
                  <span>Logout</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}
