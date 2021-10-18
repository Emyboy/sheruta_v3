import { notification, Tag } from "antd";
import Axios from "axios";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import PageLoader from "../../components/PageLoader";
import { Carousel, Image } from "react-bootstrap";
import MetaTags from "react-meta-tags";
import { Spinner } from "react-activity";
import Layout from "../../components/Layout/Layout";
import { Link } from "react-router-dom";
import PropertyCardSM from "../../components/PropertyCard/PropertyCardSM";

export const PropertyDetails = (props) => {
    const [isLoading, setIsLoading] = useState(true);
    const [query, setQuery] = useState(null);
    const [image_urls, setImage_urls] = useState([]);
    const [agentData, setAgentData] = useState(null);
    const [categoryList, setCategoryList] = useState([]);

    useEffect(() => {
        if (props.location.state) {
            // getAgentDat(props.match.params.agent_id);
            setQuery(props.location.state);
            setIsLoading(false);
            setImage_urls(Object.values(props.location.state.image_urls));
        } else {
            const { property_id } = props.match.params;
            Axios(
                `${process.env.REACT_APP_API_URL}/properties/?id=${property_id}`,
            )
                .then((res) => {
                    setQuery(res.data[0]);
                    setImage_urls(Object.values(res.data[0].image_urls));
                    setIsLoading(false);
                    // getAgentDat(agent_id);
                })
                .catch((err) => {
                    setIsLoading(false);
                });
        }
    }, [props]);

    useEffect(() => {
        if (query) {
            if (query.categorie) {
                if (query) {
                    const url =
                        process.env.REACT_APP_API_URL +
                        "/properties/category/" +
                        query.categorie.id +
                        "/5";
                    Axios(url)
                        .then((res) => {
                            setCategoryList(res.data);
                        })
                        .catch((err) => {});
                }
            }
            const { property_id } = props.match.params;
            Axios(
                `${process.env.REACT_APP_API_URL}/agents/free/prop/${property_id}`,
            )
                .then((agent) => {
                    setAgentData(agent.data);
                    // if (typeof agent.data.account) {
                    //     setAgentData(agent.data.account[0])
                    // } else {
                    //     notification.error({ message: 'Error Loading Agent Info' })
                    // }
                })
                .catch((err) => {
                    notification.error({ message: "Error Loading Agent Info" });
                });
        }
        console.log("QUERY ---", query);
    }, [query, props]);

    function makeJobSchema(query) {
        // const desc = stripHTML(job.description)
        return JSON.stringify({
            "@context": process.env.REACT_APP_SITE_URL,
            "@type": "Product",
            name: query.name,
            image: query.image_urls.map((val) => {
                return val;
            }),
            description: query.description,
            datePublished: query.published_at,
            dateModified: query.updated_at,
            // "sku": "0446310786",
            // "mpn": "925872",
            // "brand": {
            //     "@type": "Brand",
            //     "name": "ACME"
            // },
            review: {
                "@type": "Review",
                reviewRating: {
                    "@type": "Rating",
                    ratingValue: "5",
                    bestRating: "5",
                },
                author: {
                    "@type": "Person",
                    name: "Sheruta NG",
                },
            },
            aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.4",
                reviewCount: "89",
            },
            // "offers": {
            //     "@type": "Offer",
            //     "url": "https://example.com/anvil",
            //     "priceCurrency": "USD",
            //     "price": "119.99",
            //     "priceValidUntil": "2020-11-20",
            //     "itemCondition": "https://schema.org/UsedCondition",
            //     "availability": "https://schema.org/InStock"
            // }
        });
    }

    // console.log('QUERY ---', query);

    if (isLoading) {
        return <PageLoader />;
    } else {
        if (!query) {
            return <PageLoader />;
        } else {
            return (
                <Layout back>
                    <section
                        className="our-agent-single bgc-f7 pb30-991"
                        style={{ paddingBottom: "20vh" }}
                    >
                        <MetaTags>
                            <title>{query.name} | Sheruta NG</title>
                            <meta
                                name="description"
                                content={query.description}
                            />
                            <meta property="og:title" content={query.name} />
                            <meta
                                property="og:description"
                                content={query.description}
                            />
                            <meta
                                property="og:image"
                                content={query.image_urls[0]}
                            />
                            <script type="application/ld+json">
                                {makeJobSchema(query)}
                            </script>
                        </MetaTags>
                        <div className="container">
                            <div className="row">
                                <div className="p-0 col-lg-8 col-md-12 col-sm-12">
                                    <Carousel>
                                        {image_urls.map((val, i) => {
                                            return (
                                                <Carousel.Item>
                                                    <span
                                                        aria-hidden="true"
                                                        className="carousel-control-next-icon"
                                                    />
                                                    <span
                                                        id="image-viewer"
                                                        style={{
                                                            height: "610px",
                                                            position:
                                                                "relative",
                                                        }}
                                                    >
                                                        <Image
                                                            fluid
                                                            className="item-slick  slick-current slick-active"
                                                            src={val}
                                                            alt={"slide" + i}
                                                        />
                                                    </span>
                                                </Carousel.Item>
                                            );
                                        })}
                                    </Carousel>

                                    <div className="p-0">
                                        <div className="listing_single_description mb-3 pl-4 pr-3">
                                            <h2 className="text-accent display-7 mb-1">
                                                {query.name}
                                            </h2>
                                            <span>
                                                <i className="ti-location-pin"></i>
                                                {query.location}
                                            </span>
                                            <div className="container mt-3">
                                                <div className="row justify-content-between">
                                                    <div>
                                                        <h4 className="display-7">
                                                            <b>
                                                                ₦{" "}
                                                                {window.formatedPrice.format(
                                                                    query.price,
                                                                )}
                                                            </b>{" "}
                                                            <small
                                                                style={{
                                                                    fontSize:
                                                                        "15px",
                                                                }}
                                                            >
                                                                /{" "}
                                                                {query.payment_type
                                                                    ? query
                                                                          .payment_type
                                                                          .name
                                                                    : null}
                                                            </small>
                                                        </h4>
                                                    </div>
                                                    <div>
                                                        {query.categorie ? (
                                                            <Tag color="green">
                                                                {query.categorie.name.toUpperCase()}
                                                            </Tag>
                                                        ) : null}
                                                        {query.service ? (
                                                            <Tag color="magenta">
                                                                {query.service.name.toUpperCase()}
                                                            </Tag>
                                                        ) : null}
                                                        {query.statu ? (
                                                            <Tag color="cyan">
                                                                {query.statu.name.toUpperCase()}
                                                            </Tag>
                                                        ) : null}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="block-header border-0 mb-0">
                                                <h4 className="block-title text-muted">
                                                    Agent Info
                                                </h4>
                                            </div>
                                            {agentData ? (
                                                <div className="listing_single_description mb-3 shadow border-0 pl-0 pb-1 pt-1">
                                                    <div className="agent-title bg-white">
                                                        <div className="agent-photo">
                                                            <img
                                                                src={
                                                                    agentData.logo_url
                                                                }
                                                                alt=""
                                                            />
                                                        </div>
                                                        <div className="agent-details">
                                                            <h4>
                                                                {agentData.name}
                                                            </h4>
                                                            <a
                                                                href={`tel:${agentData.phone_number}`}
                                                            >
                                                                <span>
                                                                    <i className="lni-phone-handset"></i>
                                                                    {
                                                                        agentData.phone_number
                                                                    }
                                                                </span>
                                                            </a>
                                                        </div>
                                                        <div className="clearfix"></div>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="text-center">
                                                    <Spinner />
                                                    <p className="h5">
                                                        {" "}
                                                        Loading Agent Data
                                                    </p>
                                                </div>
                                            )}
                                        </div>

                                        <div className="listing_single_description col-lg-12 mb-3">
                                            <div class="">
                                                <div class="row">
                                                    <div class="col-lg-12">
                                                        <h4 class="mb15">
                                                            <b>
                                                                Property Details
                                                            </b>
                                                        </h4>
                                                    </div>
                                                    <div class="col-md-6 col-lg-6 col-xl-4">
                                                        <ul class="list-inline-item">
                                                            <li>
                                                                <p>
                                                                    Property ID
                                                                    :
                                                                </p>
                                                            </li>
                                                            <li>
                                                                <p>Price :</p>
                                                            </li>
                                                            {/* <li>
                                                                <p>
                                                                    Property
                                                                    Size :
                                                                </p>
                                                            </li> */}
                                                        </ul>
                                                        <ul class="list-inline-item">
                                                            <li>
                                                                <p>
                                                                    <span>
                                                                        #
                                                                        {
                                                                            query.id
                                                                        }
                                                                    </span>
                                                                </p>
                                                            </li>
                                                            <li>
                                                                <p>
                                                                    <span>
                                                                        ₦{" "}
                                                                        {window.formatedPrice.format(
                                                                            query.price,
                                                                        )}
                                                                    </span>
                                                                </p>
                                                            </li>
                                                            {/* <li>
                                                                <p>
                                                                    <span>
                                                                        1560 Sq
                                                                        Ft
                                                                    </span>
                                                                </p>
                                                            </li> */}
                                                        </ul>
                                                    </div>
                                                    <div class="col-md-6 col-lg-6 col-xl-4">
                                                        <ul class="list-inline-item">
                                                            <li>
                                                                <p>
                                                                    Bedrooms :
                                                                </p>
                                                            </li>
                                                            <li>
                                                                <p>
                                                                    Bathrooms :
                                                                </p>
                                                            </li>
                                                            <li>
                                                                <p>Toilet :</p>
                                                            </li>
                                                            <li>
                                                                <p>Service :</p>
                                                            </li>
                                                        </ul>
                                                        <ul class="list-inline-item">
                                                            <li>
                                                                <p>
                                                                    <span>
                                                                        {
                                                                            query.bedroom
                                                                        }
                                                                    </span>
                                                                </p>
                                                            </li>
                                                            <li>
                                                                <p>
                                                                    <span>
                                                                        {
                                                                            query.bathroom
                                                                        }
                                                                    </span>
                                                                </p>
                                                            </li>
                                                            <li>
                                                                <p>
                                                                    <span>
                                                                        {
                                                                            query.toilet
                                                                        }
                                                                    </span>
                                                                </p>
                                                            </li>
                                                            <li>
                                                                <p>
                                                                    <span>
                                                                        {query.service &&
                                                                            query.service.name.toUpperCase()}
                                                                    </span>
                                                                </p>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                    <div class="col-md-6 col-lg-6 col-xl-4">
                                                        <ul class="list-inline-item">
                                                            <li>
                                                                <p>
                                                                    Property
                                                                    Type :
                                                                </p>
                                                            </li>
                                                            <li>
                                                                <p>
                                                                    Property
                                                                    Status :
                                                                </p>
                                                            </li>
                                                        </ul>
                                                        <ul class="list-inline-item">
                                                            <li>
                                                                <p>
                                                                    <span>
                                                                        {query.categorie &&
                                                                            query
                                                                                .categorie
                                                                                .name}
                                                                    </span>
                                                                </p>
                                                            </li>
                                                            <li>
                                                                <p>
                                                                    <span>
                                                                        {query.statu &&
                                                                            query.statu.name.toUpperCase()}
                                                                    </span>
                                                                </p>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="listing_single_description mb-3">
                                            <div className="block-header">
                                                <h4 className="block-title">
                                                    <b>Description</b>
                                                </h4>
                                            </div>

                                            <div className="block-body">
                                                <p>{query.description}</p>
                                            </div>
                                        </div>

                                        <div class="col-lg-12 listing_single_description pt-2">
                                            <div class=" mt30 ">
                                                <div class="row">
                                                    <div class="col-lg-12">
                                                        <h4 class="mb10">
                                                            <b>Amenities</b>
                                                        </h4>
                                                    </div>
                                                    <div class="col-sm-12 col-md-12 col-lg-12">
                                                        <ul class="order_list list-inline-item row">
                                                            {query.amenities.map(
                                                                (val, i) => {
                                                                    return (
                                                                        <li
                                                                            key={`${i}-amenity`}
                                                                        >
                                                                            <a href="#">
                                                                                <span class="flaticon-tick"></span>
                                                                                {
                                                                                    val.name
                                                                                }
                                                                            </a>
                                                                        </li>
                                                                    );
                                                                },
                                                            )}
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-lg-4 col-md-12 col-sm-12">
                                    <div className="sidebar-widgets mt-4">
                                        <h4>Similar Properties</h4>

                                        <div className="sidebar_featured_property">
                                            {categoryList.map((val, i) => {
                                                if (val.id !== query.id) {
                                                    return (
                                                        <PropertyCardSM
                                                            val={val}
                                                            key={i}
                                                        />
                                                    );
                                                }
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </Layout>
            );
        }
    }
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(PropertyDetails);
