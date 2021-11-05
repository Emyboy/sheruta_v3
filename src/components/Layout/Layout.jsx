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
    getAllMySuggestion,
    getAllSuggestionsByStatus,
} from "../../redux/strapi_actions/alice.actions";
import { getUser, logout } from "../../redux/strapi_actions/auth.actions";
import { useHistory } from "react-router-dom";
import { BsPeople } from "react-icons/bs";
import { BiBell, BiHome, BiUser } from "react-icons/bi";
import FooterNav from "./FooterNav";
import Alice from "../../utils/Alice";
import { CgMenuLeft } from "react-icons/cg";
import { AiOutlineUser } from "react-icons/ai";
import { GrSearch, GrFormClose } from "react-icons/gr";
import { FiMail } from 'react-icons/fi'

const mapStateToProps = (state) => ({
    auth: state.auth,
    view: state.view,
    alice: state.alice,
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
    getAllSuggestionsByStatus,
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
    const { children, back, page, auth, view, alice } = props;

    const [showNav, setShowNav] = useState(false);
    const [showSearch, setShowSearch] = useState(false);
    const [user, setUser] = useState(null);

    const router = useHistory();
    // useEffect(() => {
    //     if (view.states.length === 0) {
    //         props.getAllStates();
    //     }
    //     if (view.categories.length === 0) {
    //         props.getAllCategories();
    //     }
    //     if(view.services.length === 0){
    //         props.getAllServices();
    //     }
    //     props.getAllPaymentTypes();
    //     props.getAllWorkIndustries();
    //     if (auth.user) {
    //         Alice.suggestThemForMe();
    //         props.getAllMySuggestion();
    //     }
    //     if (alice.accepted_suggestions.length === 0) {
    //         props.getAllSuggestionsByStatus("accepted");
    //     }
    // }, []);

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
                        iconComponent={<CgMenuLeft size={20} />}
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
                                    iconComponent={<AiOutlineUser size={20} />}
                                    onClick={() => {}}
                                />
                            </Link>
                        ) : null}
                        <IconBtn
                            icon={`${showSearch ? "ti-close" : "ti-search"}`}
                            iconComponent={
                                showSearch ? (
                                    <GrFormClose size={25} />
                                ) : (
                                    <GrSearch size={20} />
                                )
                            }
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
                    <EachNav icon="ti-shield" text="Terms" path="/terms" />
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

            <div className="pt-5 mt-2 pb-5 bg-gray" style={{ height: "100%" }}>
                {children}
            </div>

            <nav
                className="fixed-bottom bg-white border-gray  p-1 pl-1 pr-1"
                style={{ zIndex: 2 }}
            >
                <div className="row justify-content-center mt-1">
                    <FooterNav
                        icon="ti-home"
                        IconComponent={<BiHome size={30} />}
                        text="Home"
                        path="/"
                        active={page === "home"}
                    />

                    {view.personal_info ? (
                        <FooterNav
                            count={user_suggestions.length}
                            IconComponent={<BsPeople size={30} />}
                            text="Match"
                            path="/match"
                            active={page === "match"}
                        />
                    ) : null}
                    {user ? (
                        <>
                            <FooterNav
                                count={
                                    view.notifications &&
                                    view.notifications.filter(
                                        (x) => x.seen === false,
                                    ).length
                                }
                                IconComponent={<BiBell size={30} />}
                                text="Activity"
                                path="/notifications"
                                active={page === "notifications"}
                            />
                            <FooterNav
                                
                                IconComponent={
                                    <FiMail size={30} />
                                }
                                text="Message"
                                path="/messages"
                                active={page === "messages"}
                            />
                            <FooterNav
                                text="Profile"
                                IconComponent={<BiUser size={30} />}
                                path={`/user/${user.username}`}
                                active={page === "profile"}
                            />
                        </>
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

export default React.memo(Layout);
