import React, { useState, useEffect } from "react";
import "./Layout.css";
import logo from "../../assets/img/logo.png";
import IconBtn from "../IconBtn/IconBtn";
import Search from "../Search/Search";
import { Link } from "react-router-dom";
import { connect, useSelector } from "react-redux";
import {
    getAllCategories,
    getAllServices,
    getAllPaymentTypes,
    getAllWorkIndustries,
    getAllStates,
} from "../../redux/strapi_actions/view.action";
import {
    getAllMySuggestion
} from "../../redux/strapi_actions/alice.actions";
import { getUser, logout } from "../../redux/strapi_actions/auth.actions";
import { useHistory } from "react-router-dom";
import { BsPeople } from "react-icons/bs";
import { BiBell, BiHome, BiUser } from "react-icons/bi";
import { Badge } from "antd";
import FooterNav from "./FooterNav";

const mapStateToProps = (state) => ({
    auth: state.auth,
    view: state.view,
});

const mapActionToProps = {
    logout,
    // toggleNavbar,
    getAllCategories,
    getAllServices,
    getAllPaymentTypes,
    getAllWorkIndustries,
    getAllStates,
    getAllMySuggestion,
};

const EachNav = ({ text, path, icon, onClick }) => {
    return (
        <Link className="border-bottom1" to={path} onClick={onClick}>
            <span>
                <i className={`${icon} mr-2`}></i>
            </span>
            {text}
            <hr className="mb-1" />
        </Link>
    );
};

const Layout = connect(
    mapStateToProps,
    mapActionToProps,
)((props) => {
    const { user_suggestions } = useSelector((state) => state.alice);
    const { children, back, page, auth, view } = props;

    const [showNav, setShowNav] = useState(false);
    const [showSearch, setShowSearch] = useState(false);
    const [user, setUser] = useState(null);

    const router = useHistory();

    useEffect(() => {
        props.getAllStates();
        props.getAllCategories();
        props.getAllServices();
        props.getAllPaymentTypes();
        props.getAllWorkIndustries();
        props.getAllMySuggestion();
    }, []);

    useEffect(() => {
        if (props.auth.user) {
            setUser(props.auth.user.user);
        } else {
            setUser(null);
        }
    }, [props.auth]);

    return (
        <>
            <nav
                className="fixed-top w-100 bd-navbar border-1 bg-white pl-4 pr-4 pt-2 pb-2 border-gray"
                style={{ zIndex: 3 }}
            >
                <div className="row justify-content-between">
                    {/* {back ? (
                        <IconBtn
                            icon="ti-arrow-left"
                            onClick={() => router.goBack()}
                        />
                    ) : (
                        )} */}
                    <IconBtn
                        icon="ti-menu"
                        test_id="sidebar-toggle"
                        onClick={() => {
                            setShowNav(!showNav);
                        }}
                    />
                    <Link to="/">
                        <img
                            width="140"
                            height="30"
                            className="mt-1"
                            src={logo}
                            alt="sheruta.ng"
                        />
                    </Link>
                    <div className="row mr-2">
                        {window.innerWidth > 500 ? (
                            <Link
                                to={
                                    auth.user
                                        ? `/user/${auth.user.user.username}`
                                        : "/login"
                                }
                            >
                                <IconBtn
                                    className="mr-3 desktop-only"
                                    icon={"ti-user"}
                                    onClick={() => {}}
                                />
                            </Link>
                        ) : null}
                        <IconBtn
                            icon={`${showSearch ? "ti-close" : "ti-search"}`}
                            onClick={() => {
                                setShowSearch(!showSearch);
                            }}
                        />
                    </div>
                </div>
                <Search show={showSearch} />
            </nav>

            <aside>
                <div
                    id="mySidenav"
                    className="sidenav"
                    style={{ width: showNav ? "220px" : "0px", zIndex: 2 }}
                >
                    <a
                        href="#navigator"
                        className="closebtn"
                        onClick={() => {
                            setShowNav(false);
                        }}
                    >
                        &times;
                    </a>
                    <hr />
                    <EachNav icon="ti-home" text="Home" path="/" />
                    <EachNav
                        icon="ti-view-grid"
                        text="Get Started"
                        path="/start"
                    />
                    <EachNav
                        icon="ti-comment"
                        text="Requests"
                        path="/requests"
                    />
                    <EachNav icon="ti-money" text="Pricing" path="/pricing" />
                    <EachNav
                        icon="ti-briefcase"
                        text="About Us"
                        path="/about"
                    />
                    <EachNav
                        icon="ti-mobile"
                        text="Contact Us"
                        path="/contact"
                    />
                    {!user ? (
                        <EachNav
                            icon="ti-user"
                            text="Login / Signup"
                            path="/login"
                            onClick={props.logout}
                        />
                    ) : (
                        <EachNav
                            icon="ti-power-off"
                            text="Logout"
                            path="#logout"
                            onClick={props.logout}
                        />
                    )}
                </div>
            </aside>

            <div className="pt-5 mt-2 pb-5">{children}</div>

            <nav
                className="fixed-bottom bg-white border-gray mobile-only p-1 pl-4 pr-4"
                style={{ zIndex: 2 }}
            >
                <div className="row justify-content-between mt-1">
                    <FooterNav
                        icon="ti-home"
                        IconComponent={<BiHome size={30} />}
                        text="Home"
                        path="/"
                        active={page === "home"}
                    />

                    <FooterNav
                        count={user_suggestions.length}
                        IconComponent={<BsPeople size={30} />}
                        text="Match"
                        path="/match"
                        active={page === "match"}
                    />
                    <FooterNav
                        count={3}
                        IconComponent={<BiBell size={30} />}
                        text="Notifications"
                        path="/notifications"
                        active={page === "notifications"}
                    />
                    {user ? (
                        <FooterNav
                            text="Profile"
                            IconComponent={<BiUser size={30} />}
                            path={`/user/${user.username}`}
                            active={page === "profile"}
                        />
                    ) : (
                        <FooterNav
                            IconComponent={<BiUser size={30} />}
                            text="Login"
                            path="/login"
                            active={page === "login"}
                        />
                    )}
                </div>
            </nav>
        </>
    );
});

export default Layout;
