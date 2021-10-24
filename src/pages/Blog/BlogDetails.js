import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import ReactMarkdown from "react-markdown";
import axios from "axios";
import PageNotFound from "../PageNotFound";
import PageLoader from "../../components/PageLoader";
import styled from "styled-components";

const Body = styled.div`
    a {
        color: #00ba74;
        font-weight: bold;
    }
`;

export default function BlogDetails(props) {
    const { id } = props.match.params;
    const [data, setData] = useState(null);
    const [notFound, setNotFound] = useState(false);

    useEffect(() => {
        axios(process.env.REACT_APP_API_URL + `/blogs/?id=${id}`)
            .then((res) => {
                if (res.data.length === 0) {
                    setNotFound(true);
                    return;
                }
                setData(res.data[0]);
            })
            .catch((err) => {
                setNotFound(true);
            });
    }, []);

    if (notFound) {
        return <PageNotFound />;
    }
    if (data) {
        return (
            <Layout>
                <section>
                    <div className="container mb-5">
                        <div className="row justify-content-center pb-4">
                            <div className="col-lg-8 bg-white pt-4 rounded border-gray">
                                <div className="mbp_thumb_post">
                                    {data.blog_categorie && (
                                        <div className="blog_sp_tag">
                                            <a href="#">
                                                {data.blog_categorie.name}
                                            </a>
                                        </div>
                                    )}
                                    <h1 className="blog_sp_title">
                                        Redfin Ranks the Most Competitive
                                        Neighborhoods of 2020
                                    </h1>
                                    <img
                                        src={
                                            process.env.REACT_APP_API_URL +
                                            data.image.url
                                        }
                                        className="rounded border-gray"
                                    />
                                    {/* <ul className="blog_sp_post_meta">
                                        <li className="list-inline-item">
                                            <a href="#">Ali Tufan</a>
                                        </li>
                                        <li className="list-inline-item">
                                            <span className="flaticon-calendar"></span>
                                        </li>
                                        <li className="list-inline-item">
                                            <a href="#">January 16, 2020</a>
                                        </li>
                                        <li className="list-inline-item">
                                            <span className="flaticon-view"></span>
                                        </li>
                                        <li className="list-inline-item">
                                            <a href="#"> 341 views</a>
                                        </li>
                                        <li className="list-inline-item">
                                            <span className="flaticon-chat"></span>
                                        </li>
                                        <li className="list-inline-item">
                                            <a href="#">15</a>
                                        </li>
                                    </ul> */}
                                    <div className="thumb">
                                        {/* <img className="img-fluid" src="images/blog/bs1.jpg" alt="bs1.jpg"> */}
                                    </div>
                                    <Body className="details">
                                        <ReactMarkdown>
                                            {data.body.replace(
                                                "/uploads",
                                                `${process.env.REACT_APP_API_URL}/uploads`,
                                            )}
                                        </ReactMarkdown>
                                        {/* ============================================================================ */}
                                    </Body>
                                    {/* <ul className="blog_post_share">
                                        <li>
                                            <p>Share</p>
                                        </li>
                                        <li>
                                            <a href="#">
                                                <i className="fa fa-facebook"></i>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                                                <i className="fa fa-twitter"></i>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                                                <i className="fa fa-linkedin"></i>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                                                <i className="fa fa-google"></i>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                                                <i className="fa fa-pinterest"></i>
                                            </a>
                                        </li>
                                    </ul> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </Layout>
        );
    } else {
        return <PageLoader />;
    }
}
