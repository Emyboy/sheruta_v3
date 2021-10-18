import axios from "axios";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Layout from "../../components/Layout/Layout";
import PageLoader from "../../components/PageLoader";
import MetaTags from "react-meta-tags";
import Global from "../../Global";
import PageNotFound from "../../pages/PageNotFound";
import { Link } from "react-router-dom";
import { notifyEmy } from "../../utils/Sheruta";
import styled from "styled-components";
import ImageViewer from "react-simple-image-viewer";
import { notification, Tag } from "antd";
import { ImLocation } from "react-icons/im";
import moment from "moment";
import VerifiedBadge from "../../components/VerifiedBadge/VerifiedBadge";
const ImgContainer = styled.section`
    padding: 5em;
    margin-bottom: 1em;
    border-radius: 10px;
    background-size: cover;
    background-repeat: no-repeat;
`;
export default function RequestDetails(props) {
    localStorage.setItem("after_login", window.location.pathname);
    const { uid } = props.match.params;
    const { user } = useSelector((state) => state.auth);
    const [showImages, setShowImages] = useState(false);
    const [request, setRequest] = useState(null);
    const [state, setState] = useState({
        loading: true,
        notFound: false,
    });
    const auth = useSelector((state) => state.auth);
    useEffect(() => {
        setState({ ...state, loading: true });

        axios(process.env.REACT_APP_API_URL + "/property-requests/?uuid=" + uid)
            .then((res) => {
                if (res.data.length === 0) {
                    setState({ ...state, notFound: true, loading: false });
                } else {
                    setRequest(res.data[0]);
                    setState({ ...state, loading: false });
                }
            })
            .catch((err) => {
                // console.log('ERROR ------', err)
                setState({ ...state, loading: false });
                notification.error({ message: "Error fetching reqeust data" });
            });
    }, []);

    const handleCallRequest = () => {
        notifyEmy({
            heading: `Called ${request.users_permissions_user.first_name} ${request.users_permissions_user.last_name}`,
            url: window.location.pathname,
            status: "success",
        });
    };

    useEffect(() => {
        if (request) {
            if (
                auth.user &&
                auth.user.user.id !== request.users_permissions_user.id
            ) {
                notifyEmy({
                    heading: `${auth.user.user.first_name} ${auth.user.user.last_name} Viewed ${request.users_permissions_user.first_name} ${request.users_permissions_user.last_name}'s Request`,
                    url: window.location.pathname,
                });
            } else if (!auth.user) {
                notifyEmy({
                    heading: `Someone Viewed ${request.users_permissions_user.first_name} ${request.users_permissions_user.last_name}'s Request`,
                    url: window.location.pathname,
                });
            }
        }
    }, [request]);

    if (state.loading) {
        return <PageLoader />;
    } else if (state.notFound) {
        return <PageNotFound />;
    } else 
    return (
        <Layout>
            <MetaTags>
                <title>{request.heading} | Request</title>
                <meta name="description" content={request.body} />
                <meta
                    property="og:title"
                    content={request.heading + " | Request"}
                />
                <meta
                    property="og:description"
                    content={`${request.users_permissions_user.first_name} ${request.users_permissions_user.last_name} says: ${request.body}`}
                />
                <meta
                    name="keywords"
                    content={`${
                        request.category ? request.category.name : null
                    }, ${request.service ? request.service.name : null}`}
                />
                <script type="application/ld+json">
                    {/* {makeJobSchema(request)} */}
                </script>
            </MetaTags>
            {showImages ? (
                <ImageViewer
                    src={request.image_url}
                    currentIndex={0}
                    onClose={() => {
                        setShowImages(!showImages);
                    }}
                    disableScroll={false}
                    backgroundStyle={{
                        backgroundColor: "rgb(0 0 0 / 91%)",
                    }}
                    closeOnClickOutside={true}
                />
            ) : null}
            <section className="bgc-f7">
                <div className="gap2 bgc-f7">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="row merged20 justify-content-center">
                                    <div className="col-lg-9">
                                        <div className="central-meta item border-gray rounded">
                                            <div className="d-flex">
                                                <figure>
                                                    <img
                                                        src={
                                                            request
                                                                .users_permissions_user
                                                                .avatar_url
                                                        }
                                                        alt=""
                                                        width="40"
                                                        style={{
                                                            borderRadius:
                                                                "50px",
                                                        }}
                                                    />
                                                </figure>
                                                <div className="friend-name">
                                                    <div className="more">
                                                        <div className="more-post-optns">
                                                            <i className="ti-more-alt"></i>
                                                            <ul>
                                                                {user &&
                                                                request
                                                                    .users_permissions_user
                                                                    .id ===
                                                                    user.user
                                                                        .id ? (
                                                                    <li className="col-4 mb-3">
                                                                        <i className="fa fa-trash"></i>
                                                                        Delete
                                                                        Post
                                                                    </li>
                                                                ) : null}
                                                            </ul>
                                                        </div>
                                                    </div>
                                                    <ins className="d-flex">
                                                        <Link
                                                            className="mr-3"
                                                            to={`/user/${request.users_permissions_user.username}`}
                                                            title=""
                                                        >
                                                            {
                                                                request
                                                                    .users_permissions_user
                                                                    .first_name
                                                            }{" "}
                                                            {/* {data.users_permissions_user.last_name} */}
                                                        </Link>{" "}
                                                        <VerifiedBadge
                                                            size={15}
                                                            user={
                                                                request.users_permissions_user
                                                            }
                                                        />
                                                    </ins>

                                                    <span>
                                                        <i className="fa fa-clock-o"></i>{" "}
                                                        {moment(
                                                            request.created_at,
                                                        ).fromNow()}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="post-meta">
                                                {request.image_url &&
                                                request.image_url.length > 0 ? (
                                                    <ImgContainer
                                                        style={{
                                                            backgroundImage: `url(${request.image_url[0]})`,
                                                        }}
                                                    >
                                                        <button
                                                            className="btn btn-dark btn-sm rounded"
                                                            onClick={() =>
                                                                setShowImages(
                                                                    !showImages,
                                                                )
                                                            }
                                                        >
                                                            Show All Images
                                                        </button>
                                                    </ImgContainer>
                                                ) : null}
                                                <h1
                                                    style={{ fontSize: "24px" }}
                                                >
                                                    {request.heading}
                                                </h1>
                                                <div className="container-fluid">
                                                    <div className="row justify-content-between">
                                                        <div
                                                            className="d-flex"
                                                            style={{
                                                                alignItems:
                                                                    "center",
                                                            }}
                                                        >
                                                            <span
                                                                style={{
                                                                    alignSelf:
                                                                        "center",
                                                                }}
                                                            >
                                                                <ImLocation />
                                                            </span>{" "}
                                                            {request.location}
                                                        </div>
                                                        <div>
                                                            {user ? (
                                                                <a
                                                                    onClick={
                                                                        handleCallRequest
                                                                    }
                                                                    href={`tel:${request.users_permissions_user.phone_number}`}
                                                                    title=""
                                                                    className="main-btn bg-theme text-white"
                                                                    data-ripple=""
                                                                >
                                                                    Call Me
                                                                    <i className="fa fa-phone ml-2"></i>
                                                                </a>
                                                            ) : (
                                                                <Link
                                                                    to={`/signup`}
                                                                    title=""
                                                                    className="main-btn bg-theme text-white"
                                                                    data-ripple=""
                                                                >
                                                                    Call Me
                                                                    <i className="fa fa-phone ml-2"></i>
                                                                </Link>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div
                                                    className="d-flex"
                                                    style={{
                                                        alignItems: "center",
                                                    }}
                                                >
                                                    <h4 className="mt-3">
                                                        ₦{" "}
                                                        {window.formatedPrice.format(
                                                            request.budget,
                                                        )}{" "}
                                                        <small className="text-muted">
                                                            /
                                                            {request.payment_type &&
                                                                request
                                                                    .payment_type
                                                                    .name}
                                                        </small>
                                                    </h4>
                                                    <div className="ml-2">
                                                        {request.category && (
                                                            <Tag color="volcano">
                                                                {
                                                                    request
                                                                        .category
                                                                        .name
                                                                }
                                                            </Tag>
                                                        )}
                                                        {request.service && (
                                                            <Tag color="cyan">
                                                                {
                                                                    request
                                                                        .service
                                                                        .name
                                                                }
                                                            </Tag>
                                                        )}
                                                    </div>
                                                </div>
                                                <div class="description">
                                                    <p style={{ fontSize: '16px'}}>{request.body}</p>
                                                </div>
                                            </div>
                                        </div>
                                        {request.bedrooms &&
                                        request.bathrooms ? (
                                            <div class="block-wrap border-gray rounded additional_details">
                                                <div class="block-header">
                                                    <h4 class="block-title">
                                                        <b>Property Info</b>
                                                    </h4>
                                                </div>

                                                <div class="block-body ml-3">
                                                    <ul class="dw-proprty-info row justify-content-between">
                                                        <li className="col-4 mb-3">
                                                            <strong>
                                                                Bedrooms:
                                                            </strong>
                                                            <br />
                                                            {request.bedrooms}
                                                        </li>
                                                        <li className="col-4 mb-3">
                                                            <strong>
                                                                Bathrooms:
                                                            </strong>
                                                            <br />
                                                            {request.bathrooms}
                                                        </li>
                                                        <li className="col-4 mb-3">
                                                            <strong>
                                                                Toilets:
                                                            </strong>
                                                            <br />
                                                            {request.toilets}
                                                        </li>
                                                        <li className="col-4 mb-3">
                                                            <strong>
                                                                Is Premium?
                                                            </strong>
                                                            <br />
                                                            {request.is_premium
                                                                ? "Yes"
                                                                : "No"}
                                                        </li>
                                                        <li className="col-4 mb-3">
                                                            <strong>
                                                                Service Type:
                                                            </strong>
                                                            <br />
                                                            {request.service &&
                                                                request.service
                                                                    .name}
                                                        </li>
                                                        <li className="col-4 mb-3">
                                                            <strong>
                                                                Type:
                                                            </strong>
                                                            <br />
                                                            {request.category &&
                                                                request.category
                                                                    .name}
                                                        </li>
                                                        <li className="col-4 mb-3">
                                                            <strong>
                                                                Price / Budget
                                                            </strong>
                                                            <br />₦{" "}
                                                            {window.formatedPrice.format(
                                                                request.budget,
                                                            )}
                                                        </li>

                                                        <li className="col-4 mb-3">
                                                            <strong>
                                                                State
                                                            </strong>
                                                            <br />
                                                            {request.state &&
                                                                request.state
                                                                    .name}
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        ) : null}
                                    </div>
                                    {/* <div className="col-lg-3"></div> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    );
}
