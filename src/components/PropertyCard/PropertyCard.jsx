import React, { useState } from "react";
import { Tag } from "antd";
import { Link } from "react-router-dom";

export default function PropertyCard({ data }) {
    const [state, setState] = useState({
        info: false,
    });

    return (
        <article className="col-lg-4 col-md-6 col-sm-12 mb-4 p-2">
            <div className="owl-item active">
                <div className="item">
                    <div className="feat_property">
                        <div className="thumb">
                            <Link
                                className="text-dark"
                                to={{
                                    pathname: `/property/${data.name}/${data.id}`,
                                    state: data,
                                }}
                            >
                                <img
                                    className="img-whp"
                                    src={data.image_urls[0]}
                                    loading="lazy"
                                    alt="fp1.jpg"
                                    // height='100'
                                    // width='100'
                                />
                            </Link>
                            <div className="thmb_cntnt">
                                <ul className="tag mb0">
                                    {data.statu ? (
                                        <li
                                            className="list-inline-item"
                                            style={{ width: "100px" }}
                                        >
                                            <a>
                                                {data.statu.name.toUpperCase()}
                                            </a>
                                        </li>
                                    ) : null}
                                    {data.categorie ? (
                                        <li
                                            className="list-inline-item"
                                            style={{ width: "100px" }}
                                        >
                                            <a>
                                                {data.categorie.name.toUpperCase()}
                                            </a>
                                        </li>
                                    ) : null}
                                </ul>
                                {/* <ul className="icon mb0">
                                    <li className="list-inline-item">
                                        <a>
                                            <span className="flaticon-transfer-1"></span>
                                        </a>
                                    </li>
                                    <li className="list-inline-item">
                                        <a>
                                            <span className="flaticon-heart"></span>
                                        </a>
                                    </li>
                                </ul> */}
                                <a
                                    className="fp_price"
                                    style={{ right: "20px", bottom: "15px" }}
                                >
                                    ₦ {window.formatedPrice.format(data.price)}
                                    {data.payment_type && (
                                        <small>/{data.payment_type.name}</small>
                                    )}
                                </a>
                            </div>
                        </div>
                        <div className="details">
                            <div className="tc_content">
                                <p className="text-thm">Apartment</p>
                                <Link
                                    className="text-dark"
                                    to={{
                                        pathname: `/property/${data.name}/${data.id}`,
                                        state: data,
                                    }}
                                >
                                    <h4>{data.name}</h4>
                                </Link>
                                <p>
                                    <span className="flaticon-placeholder"></span>{" "}
                                    {data.location}
                                </p>
                                <ul className="prop_details mb0">
                                    <li className="list-inline-item">
                                        <a>Beds: {data.bedroom}</a>
                                    </li>
                                    <li className="list-inline-item">
                                        <a>Baths: {data.bathroom}</a>
                                    </li>
                                    <li className="list-inline-item">
                                        <a>Toilets: {data.toilet} </a>
                                    </li>
                                </ul>
                            </div>
                            {/* <div className="fp_footer">
                            <ul className="fp_meta float-left mb0">
                                <li className="list-inline-item">
                                    <a>
                                        <img
                                            src="images/property/pposter1.png"
                                            alt="pposter1.png"
                                        />
                                    </a>
                                </li>
                                <li className="list-inline-item">
                                    <a>Ali Tufan</a>
                                </li>
                            </ul>
                            <div className="fp_pdate float-right">
                                4 years ago
                            </div>
                        </div> */}
                        </div>
                    </div>
                </div>
            </div>
        </article>
    );

    // return (
    //   <div className="col-lg-4 col-md-6 col-sm-12 mb-4 p-2">
    //     <div className="bg-white rounded border border-gray">
    //       <div
    //         className="card bg-white text-white"
    //         style={{ borderRadius: "14px" }}
    //       >
    //         <img
    //           src={data.image_urls[0]}
    //           height="250"
    //           className="card-img"
    //           alt="..."
    //           className="rounded"
    //         />
    //         <div className="card-img-overlay">
    //           {/* <h5 className="card-title bg-white">Card title</h5> */}
    //           <div className="row justify-content-between">
    //             {data.statu ? (
    //               <span
    //                 className="property-type bg-accent shadow pl-2 p-1 pr-2"
    //                 style={{ borderRadius: "5px" }}
    //               >
    //                 {data.statu.name.toUpperCase()}
    //               </span>
    //             ) : null}
    //             <button
    //               className="btn btn-sm bg-white shadow rounded"
    //               onClick={() => setState({ ...state, info: !state.info })}
    //             >
    //               <i className="ti-info text-dark"></i>
    //             </button>
    //           </div>
    //           <p
    //             className={`card-text text-shadow bg-accent rounded p-1 mt-1 ${
    //               state.info ? "show" : "hide"
    //             }`}
    //           >
    //             {data.description.length > 300
    //               ? data.description.slice(0, 300) + "..."
    //               : data.description}
    //           </p>
    //           {/* <p className={`card-text text-shadow ${state.info ? 'show' : 'hide'}`}>I don't even know what ill go here sef lol</p> */}
    //         </div>
    //       </div>
    //       <div className="container-fluid p-2 mt-2">
    //         <h2 className="mb-0" style={{ fontSize: "19px" }}>
    //           <Link
    //             className="text-dark"
    //             to={{
    //               pathname: `/property/${data.name}/${data.id}`,
    //               state: data,
    //             }}
    //           >
    //             {data.name}
    //           </Link>
    //         </h2>
    //         <div className="d-flex justify-content-between">
    //           <span style={{ fontSize: "18px" }}>
    //             <b>₦ {window.formatedPrice.format(data.price)}</b>/{" "}
    //             {data.payment_type ? data.payment_type.name : null}
    //           </span>
    //           {data.categorie ? (
    //             <span>
    //               <Tag color="green">{data.categorie.name.toUpperCase()}</Tag>
    //             </span>
    //           ) : null}
    //         </div>
    //         <div className="container-fluid">
    //           <div className="row justify-content-start">
    //             <div className="mr-3">
    //               <small>Sitting Room: </small>
    //               <span>
    //                 <b>{data.sittingroom}</b>
    //               </span>
    //             </div>
    //             <div className="mr-3">
    //               <small>Bedroom: </small>
    //               <span>
    //                 <b>{data.bedroom}</b>
    //               </span>
    //             </div>
    //             <div>
    //               <small>Toilet: </small>
    //               <span>
    //                 <b>{data.toilet}</b>
    //               </span>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // );
}
