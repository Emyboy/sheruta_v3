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
    } else console.log(request);
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
            <section>
                <div className="gap2 gray-bg">
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
                                                                    <li>
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
                                                    style={{ fontSize: "21px" }}
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
                                                    <p>{request.body}</p>
                                                </div>
                                            </div>
                                        </div>
                                        {request.bedrooms &&
                                        request.bathrooms ? (
                                            <div class="block-wrap border-gray rounded">
                                                <div class="block-header">
                                                    <h4 class="block-title">
                                                        Property Info
                                                    </h4>
                                                </div>

                                                <div class="block-body">
                                                    <ul class="dw-proprty-info">
                                                        <li>
                                                            <strong>
                                                                Bedrooms
                                                            </strong>
                                                            {request.bedrooms}
                                                        </li>
                                                        <li>
                                                            <strong>
                                                                Bathrooms
                                                            </strong>
                                                            {request.bathrooms}
                                                        </li>
                                                        <li>
                                                            <strong>
                                                                Toilets
                                                            </strong>
                                                            {request.toilets}
                                                        </li>
                                                        <li>
                                                            <strong>
                                                                Is Premium?
                                                            </strong>
                                                            {request.is_premium
                                                                ? "Yes"
                                                                : "No"}
                                                        </li>
                                                        <li>
                                                            <strong>
                                                                Service Type
                                                            </strong>
                                                            {request.service &&
                                                                request.service
                                                                    .name}
                                                        </li>
                                                        <li>
                                                            <strong>
                                                                Type
                                                            </strong>
                                                            {request.category &&
                                                                request.category
                                                                    .name}
                                                        </li>
                                                        <li>
                                                            <strong>
                                                                Price / Budget
                                                            </strong>
                                                            ₦{" "}
                                                            {window.formatedPrice.format(
                                                                request.budget,
                                                            )}
                                                        </li>

                                                        <li>
                                                            <strong>
                                                                State
                                                            </strong>
                                                            {request.state}
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

// import { notification } from 'antd';
// import axios from 'axios';
// import React, { useEffect, useState } from 'react'
// import { connect } from 'react-redux'
// import PageLoader from '../../components/PageLoader';
// import MetaTags from 'react-meta-tags';
// import Global from '../../Global';
// import PageNotFound from '../../pages/PageNotFound'
// import { Link } from 'react-router-dom';
// import { notifyEmy } from '../../utils/Sheruta';
// import styled from 'styled-components';
// import ImageViewer from "react-simple-image-viewer";

// const ImgContainer = styled.section`
//     padding: 5em;
//     margin-bottom: 1em;
//     border-radius: 10px;
//     background-size: cover;
//     background-repeat: no-repeat;
// `;

// const RequestDetails = (props) => {
//     const { uid } = props.match.params;
//     const { auth } = props;
//     const [showImages, setShowImages] = useState(false);
//     localStorage.setItem('after_login', window.location.pathname)
//     const [state, setState] = useState({
//         loading: true,
//         notFound: false
//     })
//     const [request, setRequest] = useState(null);

//     function makeJobSchema(request) {
//         // const desc = stripHTML(job.description)
//         return JSON.stringify({
//             "@context": process.env.REACT_APP_SITE_URL,
//             "@type": "Article",
//             "mainEntityOfPage": {
//                 "@type": "WebPage",
//                 "@id": process.env.REACT_APP_SITE_URL + `/request/${request.uuid}/${request.users_permissions_user.id}`
//             },
//             "headline": request.heading,
//             "description": request.body,
//             "image": [
//                 request.users_permissions_user.avatar_url
//             ],
//             "datePublished": request.published_at,
//             "dateModified": request.updated_at,
//             "author": {
//                 "@type": "Person",
//                 "name": request.users_permissions_user.first_name + " " + request.users_permissions_user.last_name
//             },
//             "publisher": {
//                 "@type": "Organization",
//                 "name": "Sheruta NG",
//                 "logo": {
//                     "@type": "ImageObject",
//                     "url": Global.LOGO_URL
//                 }
//             }
//         })
//     }

//     useEffect(() => {
//         setState({ ...state, loading: true })

//         axios(process.env.REACT_APP_API_URL + "/property-requests/?uuid=" + uid)
//             .then(res => {
//                 if (res.data.length === 0) {
//                     setState({ ...state, notFound: true, loading: false })
//                 } else {
//                     setRequest(res.data[0])
//                     setState({ ...state, loading: false })
//                 }
//             })
//             .catch(err => {
//                 // console.log('ERROR ------', err)
//                 setState({ ...state, loading: false })
//                 notification.error({ message: 'Error fetching reqeust data' })
//             })
//     }, []);

//     useEffect(() => {
//         if (request) {
//             if (auth.user && auth.user.user.id !== request.users_permissions_user.id) {
//                 notifyEmy({
//                     heading: ` Viewed ${request.users_permissions_user.first_name} ${request.users_permissions_user.last_name}'s Request`,
//                     url: window.location.pathname
//                 })
//             } else if (!auth.user) {
//                 notifyEmy({
//                     heading: `Someone Viewed ${request.users_permissions_user.first_name} ${request.users_permissions_user.last_name}'s Request`,
//                     url: window.location.pathname
//                 })
//             }
//         }
//     }, [request]);

//     const notifySherutaAboutCall = () => {
//         notifyEmy({
//             heading: ` Gave ${request.users_permissions_user.first_name} ${request.users_permissions_user.last_name} a phone call`,
//             url: window.location.pathname
//         })
//     }

//     if (state.loading) {
//         return <PageLoader />
//     } else if (state.notFound) {
//         return <PageNotFound />
//     } else {
//         return (
//             <Layout>
//                 <section className='pt-3'>
//                     <MetaTags>
//                         <title>{request.heading} | Request</title>
//                         <meta name="description" content={request.body} />
//                         <meta property="og:title" content={'Request | ' + request.heading} />
//                         <meta property="og:description" content={request.body} />
//                         <meta name="keywords" content={`${request.category ? request.category.name : null}, ${request.service ? request.service.name : null}`} />
//                         <script type="application/ld+json">
//                             {makeJobSchema(request)}
//                         </script>
//                     </MetaTags>
//                     {
//                         showImages ? <ImageViewer
//                             src={request.image_url}
//                             currentIndex={0}
//                             onClose={() => {
//                                 setShowImages(!showImages)
//                             }}
//                             disableScroll={false}
//                             backgroundStyle={{
//                                 backgroundColor: "rgb(0 0 0 / 91%)"
//                             }}
//                             closeOnClickOutside={true}
//                         /> : null
//                     }
//                     <div className='d-flex justify-content-center mt-5'>
//                         <div className='col-lg-6 col-md-12 col-sm-12 col-12'>
//                             <div className="pt-4 pl-3 pr-3 blog-details single-post-item format-standard shadow bg-dark" style={{ borderRadius: 10 }}>
//                                 <div className=''>
//                                     {
//                                         auth.user ?
//                                             <a href={`tel:${request.users_permissions_user.phone_number}`}><i style={{ fontSize: '25px' }} className='fa fa-phone text-theme'></i></a> :
//                                             <Link to={`/login`}><i style={{ fontSize: '25px' }} className='fa fa-phone text-theme'></i></Link>
//                                     }
//                                 </div>
//                                 <div className="posts-author">
//                                     {
//                                         request.users_permissions_user ?
//                                             <>
//                                                 <span className="img"><img className="img-fluid" src={request.users_permissions_user.avatar_url} alt="" /></span>
//                                                 <h3 className="pa-name text-white">{`${request.users_permissions_user.first_name} ${request.users_permissions_user.last_name}`}</h3>
//                                             </> : null
//                                     }
//                                     <div className='d-flex justify-content-center border-0'>
//                                         {request.category ? <div className='badge badge-warning shadow'>{request.category.name}</div> : null}
//                                         {request.service ? <div className='badge badge-success shadow ml-2'>{request.service.name}</div> : null}
//                                     </div>
//                                     <div className='d-flex'>
//                                         <span className='text-white'><b>Budget:</b></span>
//                                         <span className='ml-2 text-white'>₦ {window.formatedPrice.format(request.budget)}</span>
//                                     </div>
//                                     <div className='d-flex'>
//                                         <span className='text-white'><b>Location:</b></span>
//                                         <span className='ml-2 text-white'>{request.location}</span>
//                                     </div>
//                                     <hr />
//                                     {
//                                         request.heading ?
//                                             <h1 className='text-white display-7' style={{ fontSize: '17px', textAlign: 'start' }}>{request.heading}</h1> : null
//                                     }
//                                     {
//                                         request.image_url.length > 0 ? <ImgContainer style={{ backgroundImage: `url(${request.image_url[0]})` }}>
//                                             <button className='btn btn-dark btn-sm rounded' onClick={() => setShowImages(!showImages)}>Show All Images</button>
//                                         </ImgContainer> : null
//                                     }
//                                     <p className="pa-text text-white" style={{ textAlign: 'start' }}>{request.body}</p>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </section>
//             </Layout>
//         )
//     }
// }

// const mapStateToProps = (state) => ({
//     auth: state.auth
// })

// const mapDispatchToProps = {

// }

// export default connect(mapStateToProps, mapDispatchToProps)(RequestDetails)
