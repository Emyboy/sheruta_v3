import moment from "moment";
import React from "react";
import { Link } from "react-router-dom";

export default function EachBlog({ data }) {
    return (
        <div className="col-lg-4">
            <div className="for_blog feat_property">
                <div className="thumb">
                    <img
                        className="img-whp"
                        src={process.env.REACT_APP_API_URL + data.image.url}
                        alt="1.jpg"
                    />
                    {data.blog_categorie && (
                        <div className="blog_tag">{data.blog_categorie.name}</div>
                    )}
                </div>
                <div className="details">
                    <div className="tc_content">
                        <Link to={`/blog/${data.uuid}/${data.id}`}><h4>{data.title}</h4></Link>
                        <ul className="bpg_meta">
                            <li className="list-inline-item">
                                <a href="#">
                                    <i className="flaticon-calendar"></i>
                                </a>
                            </li>
                            <li className="list-inline-item">
                                <a href="#">{moment(data.created_at).fromNow()}</a>
                            </li>
                        </ul>
                        <p>{data.description}</p>
                    </div>
                    {/* <div className="fp_footer">
                        <ul className="fp_meta float-left mb0">
                            <li className="list-inline-item">
                                <a href="#">
                                    <img
                                        src="images/property/pposter1.png"
                                        alt="pposter1.png"
                                    />
                                </a>
                            </li>
                            <li className="list-inline-item">
                                <a href="#">Ali Tufan</a>
                            </li>
                        </ul>
                        <a className="fp_pdate float-right text-thm" href="#">
                            Read More <span className="flaticon-next"></span>
                        </a>
                    </div> */}
                </div>
            </div>
        </div>
    );
}
