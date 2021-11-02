import moment from "moment";
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Badge, notification, Tag } from "antd";
import { notifyEmy } from "../../utils/Sheruta";
import { useSelector } from "react-redux";
import Btn from "../Btn/Btn";
import ConfirmPopup from "../ConfirmPopup/ConfirmPopup";
import axios from "axios";
import Cookies from "js-cookie";
import { DeleteFirebaseImage } from "../../utils/Firebase.utils";
import VerifiedBadge from "../VerifiedBadge/VerifiedBadge";

const EachSocialRequest = (props) => {
    const { data } = props;
    const { user } = useSelector((state) => state.auth);
    const [deleted, setDeleted] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(false);

    const handleCallRequest = () => {
        notifyEmy({
            heading: `Called ${data.users_permissions_user.first_name} ${data.users_permissions_user.last_name}`,
            url: window.location.pathname,
            status: "success",
        });
    };

    const handleDelete = () => {
        setDeleteLoading(true);
        axios(process.env.REACT_APP_API_URL + `/property-requests/${data.id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${Cookies.get("token")}`,
            },
        })
            .then((res) => {
                setDeleteLoading(false);
                if (data.image_url) {
                    data.image_url.map((val, i) => {
                        DeleteFirebaseImage(
                            `images/requests/${data.users_permissions_user.id}/${data.uuid}/image_${i}`,
                        );
                    });
                }
                setDeleted(true);
                notification.success({ message: "Deleted" });
            })
            .catch((err) => {
                setDeleteLoading(false);
                notification.error({ message: "Error deleting post" });
            });
    };

    if (deleted) {
        return null;
    } else
        return (
            <article
                className="central-meta item rounded border-gray"
                style={{ display: "inline-block" }}
            >
                <ConfirmPopup
                    heading="Are you sure you want to delete"
                    show={showDelete}
                    handleAccept={handleDelete}
                    handleClose={() => setShowDelete(false)}
                    loading={deleteLoading}
                />
                <div className="user-post job">
                    <div className="friend-info">
                        <div className="d-flex">
                            <figure>
                                <img
                                    src={data.users_permissions_user.avatar_url}
                                    alt=""
                                    width="40"
                                    style={{ borderRadius: "50px" }}
                                />
                            </figure>
                            <div className="friend-name">
                                <div className="more">
                                    <div className="more-post-optns">
                                        <i className="ti-more-alt"></i>
                                        <ul>
                                            {/* <li>
                                  <i className="fa fa-pencil-square-o">
                                  </i>Edit Post
                                </li> */}
                                            {user &&
                                            user.user.id ===
                                                data.users_permissions_user
                                                    .id ? (
                                                <li
                                                    onClick={() =>
                                                        setShowDelete(true)
                                                    }
                                                >
                                                    <i className="fa fa-trash"></i>
                                                    Delete Post
                                                </li>
                                            ) : null}
                                        </ul>
                                    </div>
                                </div>
                                <ins className="">
                                    <Link
                                        to={`/user/${data.users_permissions_user.username}`}
                                        title=""
                                        className="d-flex"
                                    >
                                        {data.users_permissions_user.first_name}{" "}
                                        {/* {data.users_permissions_user.last_name} */}
                                        <VerifiedBadge
                                            user={data.users_permissions_user}
                                            size={"15"}
                                            className="ml-2"
                                        />
                                    </Link>
                                </ins>
                                <small className="text-muted">
                                    @{data.users_permissions_user.username}
                                </small>
                                <span>
                                    <i className="fa fa-clock-o"></i>{" "}
                                    {moment(data.created_at).fromNow()}
                                </span>
                            </div>
                        </div>
                        <div className="post-meta">
                            <Link
                                to={`/request/${data.uuid}/${data.users_permissions_user.id}`}
                            >
                                <h6>{data.heading}</h6>
                                <div>
                                    <ul className="loc mt-2 d-flex pl-0 justify-content-between">
                                        <li>
                                            <i className="ti-location-pin"></i>{" "}
                                            {data.location}
                                        </li>
                                        {data.service ? (
                                            <li>
                                                <Tag color="volcano">
                                                    {data.service.name}
                                                </Tag>
                                            </li>
                                        ) : null}
                                        {data.category ? (
                                            <li>
                                                <Tag color="cyan">
                                                    {data.category.name.toUpperCase()}
                                                </Tag>
                                            </li>
                                        ) : null}
                                    </ul>
                                </div>
                                <div className="description">
                                    {data.body ? (
                                        <p>
                                            {data.body.length > 100 ? (
                                                <>
                                                    {data.body.slice(0, 100)}...{" "}
                                                    <b className="text-theme">
                                                        Read More
                                                    </b>
                                                </>
                                            ) : (
                                                data.body
                                            )}
                                        </p>
                                    ) : null}
                                </div>
                            </Link>
                            {data.image_url && data.image_url.length > 0 ? (
                                <Link
                                    to={`/request/${data.uuid}/${data.users_permissions_user.id}`}
                                >
                                    <figure>
                                        <div className="img-bunch">
                                            {data.image_url && (
                                                <div>
                                                    <div
                                                        className="card"
                                                        data-strip-group-options="loop: false"
                                                        data-strip-group="mygroup"
                                                        style={{
                                                            backgroundImage: `url(${data.image_url[0]})`,
                                                            height: "160px",
                                                            width: "100%",
                                                            backgroundSize:
                                                                "cover",
                                                            backgroundPosition:
                                                                "center",
                                                            filter: "blur(2px)",
                                                        }}
                                                    ></div>
                                                    <Btn
                                                        text="View Images"
                                                        className="btn-sm shadow"
                                                        onClick={() => {}}
                                                        style={{
                                                            position:
                                                                "absolute",
                                                            top: "40%",
                                                            left: "40%",
                                                            padding: "5px",
                                                            fontWeight: "bold",
                                                            fontSize: "12px",
                                                        }}
                                                    />
                                                </div>
                                            )}
                                            <div className="row"></div>
                                        </div>
                                    </figure>
                                </Link>
                            ) : null}
                            <div className="rate-n-apply mt-2">
                                <div className="job-price">
                                    <span>Budget:</span>
                                    <ins>
                                        {" "}
                                        <b>
                                            ₦
                                            {window.formatedPrice.format(
                                                data.budget,
                                            )}
                                        </b>
                                    </ins>
                                </div>
                                {user ? (
                                    <a
                                        onClick={handleCallRequest}
                                        href={`tel:${data.users_permissions_user.phone_number}`}
                                        title=""
                                        className="main-btn bg-theme text-white"
                                        data-ripple=""
                                    >
                                        Call Me
                                        <i className="fa fa-phone ml-2"></i>
                                    </a>
                                ) : (
                                    <Link
                                        onClick={handleCallRequest}
                                        to={"/login"}
                                        title=""
                                        className="main-btn bg-theme text-white"
                                        data-ripple=""
                                    >
                                        Call Me
                                        <i className="fa fa-phone ml-2"></i>
                                    </Link>
                                )}
                            </div>
                            {/* <div className="we-video-info">
              <ul>
                <li>
                  <span className="views" title="views">
                    <i className="fa fa-eye"></i>
                    <ins>1.2k</ins>
                  </span>
                </li>
                <li>
                  <div className="likes heart" title="Like/Dislike">
                    ❤ <span>2K</span>
                  </div>
                </li>
                <li>
                  <span className="comment" title="Comments">
                    <i className="fa fa-commenting"></i>
                    <ins>52</ins>
                  </span>
                </li>

                <li>
                  <span>
                    <a className="share-pst" href="#" title="Share">
                      <i className="fa fa-share-alt"></i>
                    </a>
                    <ins>20</ins>
                  </span>
                </li>
              </ul>
              <div className="users-thumb-list">
                <a
                  data-toggle="tooltip"
                  title=""
                  href="#"
                  data-original-title="Anderw"
                >
                  <img alt="" src="images/resources/userlist-1.jpg" />
                </a>
                <a
                  data-toggle="tooltip"
                  title=""
                  href="#"
                  data-original-title="frank"
                >
                  <img alt="" src={image2} />
                </a>
                <a
                  data-toggle="tooltip"
                  title=""
                  href="#"
                  data-original-title="Sara"
                >
                  <img alt="" src={image2} />
                </a>
                <a
                  data-toggle="tooltip"
                  title=""
                  href="#"
                  data-original-title="Amy"
                >
                  <img alt="" src={image2} />
                </a>
                <a
                  data-toggle="tooltip"
                  title=""
                  href="#"
                  data-original-title="Ema"
                >
                  <img alt="" src={image2} />
                </a>
                <span>
                  <strong>You</strong>, <b>Sarah</b> and{" "}
                  <a href="#" title="">
                    24+ more
                  </a>{" "}
                  liked
                </span>
              </div>
            </div> */}
                        </div>
                    </div>
                </div>
            </article>

            // <div
            //   className="central-meta item"
            //   style={{ display: "inline-block", borderRadius: "17px" }}
            // >
            //   <div className="user-post">
            //     <div className="friend-info">
            //       <div className="d-flex">
            //         <figure>
            //           <img
            //             src={data.users_permissions_user.avatar_url}
            //             alt=""
            //             width="50px"
            //             style={{ borderRadius: "50%" }}
            //           />
            //         </figure>
            //         <span className="friend-name">
            //           <div className="more">
            //             <div className="more-post-optns">
            //               <i className="ti-more-alt"></i>
            //               <ul>
            //                 <li>
            //                   <i className="fa fa-pencil-square-o"></i>Edit Post
            //                 </li>
            //                 <li>
            //                   <i className="fa fa-trash-o"></i>Delete Post
            //                 </li>
            //                 <li className="bad-report">
            //                   <i className="fa fa-flag"></i>Report Post
            //                 </li>
            //                 <li>
            //                   <i className="fa fa-address-card-o"></i>Boost This Post
            //                 </li>
            //                 <li>
            //                   <i className="fa fa-clock-o"></i>Schedule Post
            //                 </li>
            //                 <li>
            //                   <i className="fa fa-wpexplorer"></i>Select as featured
            //                 </li>
            //                 <li>
            //                   <i className="fa fa-bell-slash-o"></i>Turn off
            //                   Notifications
            //                 </li>
            //               </ul>
            //             </div>
            //           </div>
            //           <ins>
            //             <Link
            //               to={`/request/${data.uuid}/${data.users_permissions_user.id}`}
            //               title=""
            //             >
            //               {data.users_permissions_user.first_name}{" "}
            //               {data.users_permissions_user.last_name}
            //             </Link>
            //           </ins>
            //           <span> {moment(data.created_at).fromNow()}</span>
            //         </span>
            //       </div>
            //       <div className="post-meta">
            //         <Link
            //           to={`/request/${data.uuid}/${data.users_permissions_user.id}`}
            //         >
            //           <div className="description mt-0">
            //             <p>
            //               {data.body.length > 200 ? (
            //                 <>
            //                   {data.body.slice(0, 200)}...{" "}
            //                   <b className="text-theme">Read More</b>
            //                 </>
            //               ) : (
            //                 data.body
            //               )}
            //             </p>
            //           </div>
            //         </Link>
            //         <figure>
            //           <div className="img-bunch">
            //             <div className="row">
            //               {data.image_url &&
            //                 data.image_url.map((val, i) => {
            //                   return (
            //                     <div
            //                       className="col-4"
            //                       style={{ maxWidth: "32.333333%", margin: "1.0px" }}
            //                     >
            //                       <div
            //                         className="card"
            //                         data-strip-group-options="loop: false"
            //                         data-strip-group="mygroup"
            //                         style={{
            //                           backgroundImage: `url(${val})`,
            //                           height: "160px",
            //                           width: "100%",
            //                           backgroundSize: "100% 100%",
            //                         }}
            //                       ></div>
            //                     </div>
            //                   );
            //                 })}
            //             </div>
            //           </div>
            //           <ul className="like-dislike">
            //             <li>
            //               <Link className="bg-purple" href="#" title="Save to Pin Post">
            //                 <i className="fa fa-thumb-tack"></i>
            //               </Link>
            //             </li>
            //             <li>
            //               <Link className="bg-blue" href="#" title="Like Post">
            //                 <i className="ti-thumb-up"></i>
            //               </Link>
            //             </li>
            //             <li>
            //               <Link className="bg-red" href="#" title="dislike Post">
            //                 <i className="ti-thumb-down"></i>
            //               </Link>
            //             </li>
            //           </ul>
            //         </figure>

            //         <ul className="like-dislike">
            //           <li>
            //             <Link href="#" title="Save to Pin Post">
            //               <i className="fa fa-thumb-tack"></i>
            //             </Link>
            //           </li>
            //           <li>
            //             <Link href="#" title="Like Post">
            //               <i className="ti-thumb-up"></i>
            //             </Link>
            //           </li>
            //           <li>
            //             <Link href="#" title="dislike Post">
            //               <i className="ti-thumb-down"></i>
            //             </Link>
            //           </li>
            //         </ul>

            //         <div className="we-video-info">
            //           <ul>
            //             <li>
            //               <span className="views" title="views">
            //                 <i className="fa fa-eye"></i>
            //                 <ins>1.2k</ins>
            //               </span>
            //             </li>
            //             <li>
            //               <div className="likes heart" title="Like/Dislike">
            //                 ❤ <span>2K</span>
            //               </div>
            //             </li>
            //             <li>
            //               <span className="comment" title="Comments">
            //                 <i className="fa fa-commenting"></i>
            //                 <ins>52</ins>
            //               </span>
            //             </li>

            //             <li>
            //               <span>
            //                 <Link className="share-pst" href="#" title="Share">
            //                   <i className="fa fa-share-alt"></i>
            //                 </Link>
            //                 <ins>20</ins>
            //               </span>
            //             </li>
            //           </ul>
            //           <div className="users-thumb-list">
            //             <Link
            //               data-toggle="tooltip"
            //               title=""
            //               href="#"
            //               data-original-title="Anderw"
            //             >
            //               <img alt="" src="images/resources/userlist-1.jpg" />
            //             </Link>
            //             <Link
            //               data-toggle="tooltip"
            //               title=""
            //               href="#"
            //               data-original-title="frank"
            //             >
            //               <img alt="" src="images/resources/userlist-2.jpg" />
            //             </Link>
            //             <Link
            //               data-toggle="tooltip"
            //               title=""
            //               href="#"
            //               data-original-title="Sara"
            //             >
            //               <img alt="" src="images/resources/userlist-3.jpg" />
            //             </Link>
            //             <Link
            //               data-toggle="tooltip"
            //               title=""
            //               href="#"
            //               data-original-title="Amy"
            //             >
            //               <img alt="" src="images/resources/userlist-4.jpg" />
            //             </Link>
            //             <Link
            //               data-toggle="tooltip"
            //               title=""
            //               href="#"
            //               data-original-title="Ema"
            //             >
            //               <img alt="" src="images/resources/userlist-5.jpg" />
            //             </Link>
            //             <span>
            //               <strong>You</strong>, <b>Sarah</b> and{" "}
            //               <Link href="#" title="">
            //                 24+ more
            //               </Link>{" "}
            //               liked
            //             </span>
            //           </div>
            //         </div>
            //       </div>
            //       <div className="coment-area">
            //         <ul className="we-comet">
            //           <li>
            //             <div className="comet-avatar">
            //               <img src="images/resources/nearly3.jpg" alt="" />
            //             </div>
            //             <div className="we-comment">
            //               <h5>
            //                 <Link
            //                   to={`/request/${data.uuid}/${data.users_permissions_user.id}`}
            //                   title=""
            //                 >
            //                   Jason borne
            //                 </Link>
            //               </h5>
            //               <p>
            //                 we are working for the dance and sing songs. this video is
            //                 very awesome for the youngster. please vote this video and
            //                 like our channel
            //               </p>
            //               <div className="inline-itms">
            //                 <span>1 year ago</span>
            //                 <Link className="we-reply" href="#" title="Reply">
            //                   <i className="fa fa-reply"></i>
            //                 </Link>
            //                 <Link href="#" title="">
            //                   <i className="fa fa-heart"></i>
            //                   <span>20</span>
            //                 </Link>
            //               </div>
            //             </div>
            //           </li>
            //           <li>
            //             <div className="comet-avatar">
            //               <img src="images/resources/comet-4.jpg" alt="" />
            //             </div>
            //             <div className="we-comment">
            //               <h5>
            //                 <Link
            //                   to={`/request/${data.uuid}/${data.users_permissions_user.id}`}
            //                   title=""
            //                 >
            //                   Sophia
            //                 </Link>
            //               </h5>
            //               <p>
            //                 we are working for the dance and sing songs. this video is
            //                 very awesome for the youngster.
            //                 <i className="em em-smiley"></i>
            //               </p>
            //               <div className="inline-itms">
            //                 <span>1 year ago</span>
            //                 <Link className="we-reply" href="#" title="Reply">
            //                   <i className="fa fa-reply"></i>
            //                 </Link>
            //                 <Link href="#" title="">
            //                   <i className="fa fa-heart"></i>
            //                   <span>20</span>
            //                 </Link>
            //               </div>
            //             </div>
            //           </li>
            //           <li>
            //             <Link href="#" title="" className="showmore underline">
            //               more comments+
            //             </Link>
            //           </li>
            //           <li className="post-comment">
            //             <div className="comet-avatar">
            //               <img src="images/resources/nearly1.jpg" alt="" />
            //             </div>
            //             <div className="post-comt-box">
            //               <form method="post">
            //                 <textarea placeholder="Post your comment"></textarea>
            //                 <div className="add-smiles">
            //                   <div className="uploadimage">
            //                     <i className="fa fa-image"></i>
            //                     <label className="fileContainer">
            //                       <input type="file" />
            //                     </label>
            //                   </div>
            //                   <span
            //                     className="em em-expressionless"
            //                     title="add icon"
            //                   ></span>
            //                   <div className="smiles-bunch">
            //                     <i className="em em---1"></i>
            //                     <i className="em em-smiley"></i>
            //                     <i className="em em-anguished"></i>
            //                     <i className="em em-laughing"></i>
            //                     <i className="em em-angry"></i>
            //                     <i className="em em-astonished"></i>
            //                     <i className="em em-blush"></i>
            //                     <i className="em em-disappointed"></i>
            //                     <i className="em em-worried"></i>
            //                     <i className="em em-kissing_heart"></i>
            //                     <i className="em em-rage"></i>
            //                     <i className="em em-stuck_out_tongue"></i>
            //                   </div>
            //                 </div>

            //                 <button type="submit"></button>
            //               </form>
            //             </div>
            //           </li>
            //         </ul>
            //       </div>
            //     </div>
            //   </div>
            // </div>
        );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(EachSocialRequest);
