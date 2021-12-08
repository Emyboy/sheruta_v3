import React from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import { Tag } from "antd";
import Global from "../../Global";
import UserAction from "../UserAction/UserAction";
import DeactivatedBanner from "../DeactivatedBanner/DeactivatedBanner";

export default function EachRequest({ data }) {
    const user = data?.users_permissions_user;
    const deactivated = user.deactivated;
    
    return (
			<article className="card w-100 shadow-xss rounded-xxl border-0 p-4 mb-3">
				<div className="card-body p-0 d-flex">
					{user && (
						<figure className="avatar me-3">
							<img
								src={
									deactivated ? Global.USER_PLACEHOLDER_AVATAR : user.avatar_url
								}
								alt="image"
								className="shadow-sm rounded-circle w45"
							/>
						</figure>
					)}
					<h4 className="fw-700 text-grey-900 font-xssss mt-1">
						<Link to={`/user/${user.username}`}>
							<a className="text-dark">{deactivated ? '.... ....': user.first_name} </a>
						</Link>
						<span className="d-block font-xssss fw-500 mt-1 lh-3 text-grey-500">
							{moment(data.created_at).fromNow()}
						</span>
					</h4>
					<a
						className="ms-auto"
						id="dropdownMenu2"
						data-bs-toggle="dropdown"
						aria-expanded="false"
					>
						<i className="ti-more-alt text-grey-900 btn-round-md bg-greylight font-xss"></i>
					</a>
					<div
						className="dropdown-menu dropdown-menu-end p-4 rounded-xxl border-0 shadow-lg"
						aria-labelledby="dropdownMenu2"
					>
						<div className="card-body p-0 d-flex link">
							<i className="feather-edit text-grey-500 me-3 font-lg"></i>
							<h4 className="fw-600 text-grey-900 font-xssss mt-0 me-4">
								Edit{' '}
								<span className="d-block font-xsssss fw-500 mt-1 lh-3 text-grey-500">
									Now you can edit your posts
								</span>
							</h4>
						</div>
						<div
							className="card-body p-0 d-flex mt-2 link"
							onClick={() => {
								if (navigator.share) {
									navigator
										.share({
											title: data.heading,
											url:
												window?.location?.host +
												`/request/${data.uuid}/${user?.id}`,
											text: data.body,
										})
										.catch((err) => Promise.reject(err))
								}
							}}
						>
							<i className="feather-share text-grey-500 me-3 font-lg"></i>
							<h4 className="fw-600 text-grey-900 font-xssss mt-0 me-4">
								Share{' '}
								<span className="d-block font-xsssss fw-500 mt-1 lh-3 text-grey-500">
									Share this post with your friends
								</span>
							</h4>
						</div>
						<hr />
						<div className="card-body p-0 d-flex mt-2 link">
							<i className="feather-trash text-grey-500 me-3 font-lg"></i>
							<h4 className="fw-600 text-grey-900 font-xssss mt-0 me-4">
								Delete Post{' '}
								<span className="d-block font-xsssss fw-500 mt-1 lh-3 text-grey-500">
									Delete your post from sheruta
								</span>
							</h4>
						</div>
					</div>
				</div>
				<div className="">
					<div className="row justify-content-between">

						{
                            deactivated ? <DeactivatedBanner /> : <li className="col-sm-6 text-grey-500">
							<i className="ti-location-pin"></i> {data.location}
						</li>
                        }
						<div className="col-sm-4">
							<div className="d-flex">
								{data.category ? (
									<Tag color="cyan">{data.category.name.toUpperCase()}</Tag>
								) : null}
								{data.service ? (
									<Tag color="volcano">{data.service.name}</Tag>
								) : null}
								{/* {data.service ? (
								<h6 className="d-inline-block p-2 text-light bg-theme fw-600 font-xssss rounded-3 me-2">
									{data.service.name}
								</h6>
							) : null}
							{data.category ? (
								<h6 className="d-inline-block p-2 text-dark badge-secondary fw-600 font-xssss rounded-3 me-2">
									{data.category.name}
								</h6>
							) : null} */}
							</div>
						</div>
					</div>
				</div>
				<div className="card-body p-0 me-lg-5 pt-2">
					<Link to={`/request/${data.uuid}/${user?.id}`}>
						<p
							className="fw-500 text-grey-500 lh-26  w-100 mb-0"
							style={{ fontSize: '16px' }}
						>
							{data.body.slice(0, 120)}
							<a className="fw-600 text-theme ms-2">See more</a>
						</p>
					</Link>
				</div>
				<div className="card-body d-block p-0">
					{data.image_url && data.image_url.length > 0 && (
						<div className="row ps-2 pe-2 mt-4">
							{data.image_url &&
								data.image_url.map((img, i) => {
									return (
										<div className="col-xs-4 col-sm-4 p-1">
											<Link to={`/request/${data.uuid}/${user?.id}`}>
												<a data-lightbox="roadtrip">
													<img
														src={data.image_url[i]}
														className="rounded-3 w-100"
														alt="image"
													/>
												</a>
											</Link>
										</div>
									)
								})}

							{/* <div className="col-xs-4 col-sm-4 p-1">
						<a to="images/t-11.jpg" data-lightbox="roadtrip">
							<img
								src="images/t-11.jpg"
								className="rounded-3 w-100"
								alt="image"
							/>
						</a>
					</div>
					<div className="col-xs-4 col-sm-4 p-1">
						<a
							to="images/t-12.jpg"
							data-lightbox="roadtrip"
							className="position-relative d-block"
						>
							<img
								src="images/t-12.jpg"
								className="rounded-3 w-100"
								alt="image"
							/>
							<span className="img-count font-sm text-white ls-3 fw-600">
								<b>+2</b>
							</span>
						</a>
					</div> */}
						</div>
					)}
				</div>
				<div className="card-body row p-0 mt-3 mb-3 justify-content-between">
					<div className="d-flex align-items-center justify-content-start col-md-6">
						<div className="emoji-bttn d-flex align-items-center fw-600 text-grey-900 text-dark lh-26 font-xssss me-2">
							<span>Budget: </span>
						</div>
						<figure className="mb-0 pl-1">
							{' '}
							<b style={{ fontSize: '17px' }} className="text-grey-500">
								{Global.currency}
								{window.formatedPrice.format(data.budget)}{' '}
								{data.payment_type && (
									<small>/{data.payment_type.abbreviation}</small>
								)}
							</b>
						</figure>
					</div>
					<div className="col-md-5">
						<UserAction alignment="end" user={user} />
					</div>
				</div>
			</article>
		)
}

// import moment from "moment";
// import React, { useState, useEffect } from "react";
// import { connect } from "react-redux";
// import { Link } from "react-router-dom";
// import { Badge, notification, Tag } from "antd";
// import { notifyEmy } from "../../services/Sheruta";
// import { useSelector } from "react-redux";
// import Btn from "../Btn/Btn";
// import ConfirmPopup from "../ConfirmPopup/ConfirmPopup";
// import axios from "axios";
// import Cookies from "js-cookie";
// import { DeleteFirebaseImage } from "../../services/Firebase.utils";
// import VerifiedBadge from "../VerifiedBadge/VerifiedBadge";
// import UserAction from "../UserAction/UserAction";

// const EachSocialRequest = (props) => {
//     const { data } = props;
//     const { user } = useSelector((state) => state.auth);
//     const [deleted, setDeleted] = useState(false);
//     const [showDelete, setShowDelete] = useState(false);
//     const [deleteLoading, setDeleteLoading] = useState(false);

//     const handleCallRequest = () => {
//         notifyEmy({
//             heading: `Called ${data.users_permissions_user.first_name} ${data.users_permissions_user.last_name}`,
//             url: window.location.pathname,
//             status: "success",
//         });
//     };

//     const handleDelete = () => {
//         setDeleteLoading(true);
//         axios(process.env.REACT_APP_API_URL + `/property-requests/${data.id}`, {
//             method: "DELETE",
//             headers: {
//                 Authorization: `Bearer ${Cookies.get("token")}`,
//             },
//         })
//             .then((res) => {
//                 setDeleteLoading(false);
//                 if (data.image_url) {
//                     data.image_url.map((val, i) => {
//                         DeleteFirebaseImage(
//                             `images/requests/${data.users_permissions_user.id}/${data.uuid}/image_${i}`,
//                         );
//                     });
//                 }
//                 setDeleted(true);
//                 notification.success({ message: "Deleted" });
//             })
//             .catch((err) => {
//                 setDeleteLoading(false);
//                 notification.error({ message: "Error deleting post" });
//             });
//     };

//     if (deleted) {
//         return null;
//     } else
//         return (
//             <article
//                 className="central-meta item rounded border-gray"
//                 style={{ display: "inline-block" }}
//             >
//                 <ConfirmPopup
//                     heading="Are you sure you want to delete"
//                     show={showDelete}
//                     handleAccept={handleDelete}
//                     handleClose={() => setShowDelete(false)}
//                     loading={deleteLoading}
//                 />
//                 <div className="user-post job">
//                     <div className="friend-info">
//                         <div className="d-flex">
//                             <figure>
//                                 <img
//                                     src={data.users_permissions_user.avatar_url}
//                                     alt=""
//                                     width="40"
//                                     loading="lazy"
//                                     style={{ borderRadius: "50px" }}
//                                 />
//                             </figure>
//                             <div className="friend-name">
//                                 <div className="more">
//                                     <div className="more-post-optns">
//                                         <i className="ti-more-alt"></i>
//                                         <ul>
//                                             {user &&
//                                             user.user.id ===
//                                                 data.users_permissions_user
//                                                     .id ? (
//                                                 <li
//                                                     onClick={() =>
//                                                         setShowDelete(true)
//                                                     }
//                                                 >
//                                                     <i className="fa fa-trash"></i>
//                                                     Delete Post
//                                                 </li>
//                                             ) : null}
//                                         </ul>
//                                     </div>
//                                 </div>
//                                 <ins className="">
//                                     <Link
//                                         to={`/user/${data.users_permissions_user.username}`}
//                                         title=""
//                                         className="d-flex"
//                                     >
//                                         {data.users_permissions_user.first_name}{" "}
//                                         {/* {data.users_permissions_user.last_name} */}
//                                         <VerifiedBadge
//                                             user={data.users_permissions_user}
//                                             size={"15"}
//                                             className="ml-2"
//                                         />
//                                     </Link>
//                                 </ins>
//                                 <small className="text-muted">
//                                     @{data.users_permissions_user.username}
//                                 </small>
//                                 <span>
//                                     <i className="fa fa-clock-o"></i>{" "}
//                                     {moment(data.created_at).fromNow()}
//                                 </span>
//                             </div>
//                         </div>
//                         <div className="post-meta">
//                             <Link
//                                 to={`/request/${data.uuid}/${data.users_permissions_user.id}`}
//                             >
//                                 <h6>{data.heading}</h6>
//                                 <div>
//                                     <ul className="loc mt-2 d-flex pl-0 justify-content-between">
//                                         <li>
//                                             <i className="ti-location-pin"></i>{" "}
//                                             {data.location}
//                                         </li>
//                                         {data.service ? (
//                                             <li>
//                                                 <Tag color="volcano">
//                                                     {data.service.name}
//                                                 </Tag>
//                                             </li>
//                                         ) : null}
//                                         {data.category ? (
//                                             <li>
//                                                 <Tag color="cyan">
//                                                     {data.category.name.toUpperCase()}
//                                                 </Tag>
//                                             </li>
//                                         ) : null}
//                                     </ul>
//                                 </div>
//                                 <div className="description">
//                                     {data.body ? (
//                                         <p>
//                                             {data.body.length > 100 ? (
//                                                 <>
//                                                     {data.body.slice(0, 100)}...{" "}
//                                                     <b className="text-theme">
//                                                         Read More
//                                                     </b>
//                                                 </>
//                                             ) : (
//                                                 data.body
//                                             )}
//                                         </p>
//                                     ) : null}
//                                 </div>
//                             </Link>
//                             {data.image_url && data.image_url.length > 0 ? (
//                                 <Link
//                                     to={`/request/${data.uuid}/${data.users_permissions_user.id}`}
//                                 >
//                                     <figure>
//                                         <div className="img-bunch">
//                                             {data.image_url && (
//                                                 <div>
//                                                     <div
//                                                         className="card"
//                                                         data-strip-group-options="loop: false"
//                                                         data-strip-group="mygroup"
//                                                         style={{
//                                                             backgroundImage: `url(${data.image_url[0]})`,
//                                                             height: "160px",
//                                                             width: "100%",
//                                                             backgroundSize:
//                                                                 "cover",
//                                                             backgroundPosition:
//                                                                 "center",
//                                                             filter: "blur(2px)",
//                                                         }}
//                                                     ></div>
//                                                     <Btn
//                                                         text="View Images"
//                                                         className="btn-sm shadow"
//                                                         onClick={() => {}}
//                                                         style={{
//                                                             position:
//                                                                 "absolute",
//                                                             top: "40%",
//                                                             left: "40%",
//                                                             padding: "5px",
//                                                             fontWeight: "bold",
//                                                             fontSize: "12px",
//                                                         }}
//                                                     />
//                                                 </div>
//                                             )}
//                                             <div className="row"></div>
//                                         </div>
//                                     </figure>
//                                 </Link>
//                             ) : null}
//                             <div className="rate-n-apply mt-2 d-flex justify-content-between">
//                                 <div className="job-price">
//                                     <span>Budget:</span>
//                                     <ins>
//                                         {" "}
//                                         <b>
//                                             ₦
//                                             {window.formatedPrice.format(
//                                                 data.budget,
//                                             )}
//                                         </b>
//                                     </ins>
//                                 </div>
//                                 {user ? (
//                                     <UserAction
//                                         user={data.users_permissions_user}
//                                         alignment={'end'}
//                                     />
//                                 ) : (
//                                     <Link
//                                         onClick={handleCallRequest}
//                                         to={"/login"}
//                                         title=""
//                                         className="main-btn bg-theme text-white"
//                                         data-ripple=""
//                                     >
//                                         Call Me
//                                         <i className="fa fa-phone ml-2"></i>
//                                     </Link>
//                                 )}
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </article>

//         );
// };

// const mapStateToProps = (state) => ({});

// const mapDispatchToProps = {};

// export default connect(mapStateToProps, mapDispatchToProps)(EachSocialRequest);
