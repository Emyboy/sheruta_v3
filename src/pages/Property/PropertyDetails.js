import { notification } from 'antd';
import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Carousel, Image } from 'react-bootstrap';
import PageLoader from '../../components/PageLoader';
// import { Spinner } from 'react-activity';
import AgentDetailCard from '../../components/AgentDetailCard';
import MetaTags from 'react-meta-tags';
import axios from 'axios';
import HorizontalProductCard from '../../components/HorizontalProductCard'
import { Link } from 'react-router-dom';
import { Spinner } from 'react-activity';

// const formatedPrice = new Intl.NumberFormat('en-NG');
export default props => {

    const [isLoading, setIsLoading] = useState(true);
    const [query, setQuery] = useState(null);
    const [image_urls, setImage_urls] = useState([]);
    const [agentData, setAgentData] = useState(null);
    const [categoryList, setCategoryList] = useState([])

    const getApartmentsByCategory = () => {
        if (query) {
            const url = process.env.REACT_APP_BASE_URL + '/properties/category/' + query.categorie.id + "/5";
            axios(url)
                .then(res => {
                    setCategoryList(res.data)
                })
                .catch(err => {
                })
        }
    }


    const getAgentDat = () => {
        const { agent_id, property_id } = props.match.params;
        Axios(`${process.env.REACT_APP_BASE_URL}/agents/free/prop/${property_id}`)
            .then(agent => {
                setAgentData(agent.data)
                // if (typeof agent.data.account) {
                //     setAgentData(agent.data.account[0])
                // } else {
                //     notification.error({ message: 'Error Loading Agent Info' })
                // }
            })
            .catch(err => {
                notification.error({ message: 'Error Loading Agent Info' })
            })
    }


    const getApartmentDetails = () => {
        const { agent_id, property_id } = props.match.params;
        Axios(`${process.env.REACT_APP_BASE_URL}/properties/?id=${property_id}`)
            .then(res => {
                setQuery(res.data[0]);
                setImage_urls(Object.values(res.data[0].image_urls))
                setIsLoading(false);
                // getAgentDat(agent_id);
            })
            .catch(err => {
                setIsLoading(false);
            })
    };

    useEffect(() => {
        if (props.location.state) {
            // getAgentDat(props.match.params.agent_id);
            setQuery(props.location.state);
            setIsLoading(false);
            setImage_urls(Object.values(props.location.state.image_urls));
        } else {
            getApartmentDetails();

        }
    }, []);

    useEffect(() => {
        if (query) {
            if (query.categorie) {
                getApartmentsByCategory();
            }
            getAgentDat();
        }
    }, [query])

    function makeJobSchema(query) {
        // const desc = stripHTML(job.description)
        return JSON.stringify({
            "@context": process.env.REACT_APP_SITE_URL,
            "@type": "Product",
            "name": query.name,
            "image": query.image_urls.map(val => { return val }),
            "description": query.description,
            "datePublished": query.published_at,
            "dateModified": query.updated_at,
            // "sku": "0446310786",
            // "mpn": "925872",
            // "brand": {
            //     "@type": "Brand",
            //     "name": "ACME"
            // },
            "review": {
                "@type": "Review",
                "reviewRating": {
                    "@type": "Rating",
                    "ratingValue": "5",
                    "bestRating": "5"
                },
                "author": {
                    "@type": "Person",
                    "name": "Sheruta NG"
                }
            },
            "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.4",
                "reviewCount": "89"
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
        })
    }


    if (isLoading) {
        return <PageLoader />
    } else {
        if (!query) {
            return <PageLoader />
        } else {
            return (
                <section className="gray">
                    <div className='container'>
                        <div className='row'>
                            <MetaTags>
                                <title>{query.name} | Sheruta NG</title>
                                <meta name="description" content={query.description} />
                                <meta property="og:title" content={query.name} />
                                <meta property="og:description" content={query.description} />
                                <meta property="og:image" content={query.image_urls[0]} />
                                <script type="application/ld+json">
                                    {makeJobSchema(query)}
                                </script>
                            </MetaTags>

                            <div className='col-lg-8 col-md-12 col-sm-12'>
                                <div className="slide-property-first mb-4">
                                    <div className="pr-price-into">
                                        <h1 className='h3'>{query.name}</h1>
                                        <h2>₦ {window.renderPrice(query.price)} <i>{query.payment_type && `/ ${query.payment_type.name}`}</i>
                                            {query.statu ?
                                                <span className="prt-type rent badge p-2">{query.statu.name}</span>
                                                : null
                                            }
                                        </h2>
                                        <h3 className="h6"><i className="lni-map-marker"></i> {query.location}</h3>
                                    </div>
                                </div>

                                {/* <div className="slide-property-sec mb-4">
                                    <div className="pr-all-info">

                                        <div className="pr-single-info">

                                        </div>

                                        <div className="pr-single-info">
                                            <a href="#c" className="compare-button" data-toggle="tooltip" data-original-title="Compare"><i className="ti-share"></i></a>
                                        </div>

                                        <div className="pr-single-info">
                                            <a href="#c" className="compare-button" data-toggle="tooltip" data-original-title="Compare"><i className="ti-bookmark"></i></a>
                                        </div>

                                        <div className="pr-single-info">
                                            <a href="#c" className="add-to-favorite" data-toggle="tooltip" data-original-title="Add To Favorites"><i className="lni-heart"></i></a>
                                        </div>

                                        <div className="pr-single-info">
                                            <a href="#c" className="like-bitt add-to-favorite" data-toggle="tooltip" data-original-title="Add To Favorites"><i className="lni-heart-filled"></i></a>
                                        </div>

                                    </div>
                                </div> */}

                                <div className="property3-slide single-advance-property mb-4">
                                    {/* <ImageViewer imageurl1={imageurl1} imageurl2={imageurl2} imageurl3={imageurl3} imageurl4={imageurl4} /> */}
                                    <Carousel>
                                        {
                                            image_urls.map((val, i) => {
                                                return (
                                                    <Carousel.Item>
                                                        <span aria-hidden="true" className="carousel-control-next-icon" />
                                                        <span id='image-viewer' style={{ height: "610px", position: "relative" }}>
                                                            <Image
                                                                // onClick={() => props.toggleLightBox(props.showLightBox, 0)}
                                                                // style={{ 
                                                                //     minHeight: '30%'
                                                                // }}
                                                                fluid
                                                                className="item-slick  slick-current slick-active"
                                                                src={val}
                                                                alt={"slide" + i}
                                                            />

                                                        </span>
                                                    </Carousel.Item>
                                                )
                                            })
                                        }
                                    </Carousel>

                                </div>

                                <div className="block-wrap">

                                    <div className="block-header">
                                        <h4 className="block-title">Property Info</h4>
                                    </div>

                                    <div className="block-body">
                                        <ul className="dw-proprty-info">
                                            <li><strong>Bedrooms</strong>{query.bedroom}</li>
                                            {/* <li><strong>Bathrooms</strong>2</li> */}
                                            <li><strong>Sitting Rooms</strong>{query.sittingroom}</li>
                                            <li><strong>Bathrooms</strong>{query.bathroom}</li>
                                            {/* <li><strong>Price</strong>$53264</li>
                                        <li><strong>City</strong>New York</li>
                                        <li><strong>Build On</strong>2007</li> */}
                                        </ul>
                                    </div>

                                </div>

                                <div className="block-header">
                                    <h4 className="block-title">Agent Info</h4>
                                </div>

                                {/* {
                                    agentData ? <AgentDetailCard query={query} val={agentData} service={query.service} /> : <div className='text-center'>
                                        <div className='alert alert-danger'>
                                            <h4>No Agent Data Was Found</h4>
                                            <Link to='/contact' className='btn-info rounded btn btn-sm'><h5 className='m-0'>Contact Sheruta</h5></Link>
                                        </div>
                                    </div>
                                } */}


                                {
                                    agentData ? <div className='block-wrap shadow'>
                                        <div className="agent-title bg-white">
                                            <div className="agent-photo"><img src={agentData.logo_url} alt="" /></div>
                                            <div className="agent-details">
                                                <h4>{agentData.name}</h4>
                                                <a href={`tel:${agentData.phone_number}`}>
                                                    <span><i className="lni-phone-handset"></i>{agentData.phone_number}</span>
                                                </a>

                                            </div>
                                            <div className="clearfix"></div>
                                        </div>
                                    </div>
                                        :
                                        <div className='text-center'>
                                            <Spinner />
                                            <p className='h5'> Loading Agent Data</p>
                                        </div>
                                }


                                <div className="block-wrap">

                                    <div className="block-header">
                                        <h4 className="block-title">Description</h4>
                                    </div>

                                    <div className="block-body">
                                        <p>{query.description}</p>
                                    </div>

                                </div>


                                <div className="block-wrap">

                                    <div className="block-header">
                                        <h4 className="block-title">Ameneties</h4>
                                    </div>

                                    <div className="block-body">
                                        <ul className="avl-features third">
                                            {
                                                query.amenities.map((val, i) => {
                                                    return <li>{val.name}</li>
                                                })
                                            }
                                        </ul>
                                    </div>

                                </div>


                            </div>










                            <div className="col-lg-4 col-md-12 col-sm-12">
                                <div className="page-sidebar">



                                    {/* <div className="agent-widget">
                                    <div className="agent-title">
                                        <div className="agent-photo"><img src="assets/img/user-6.jpg" alt="" /></div>
                                        <div className="agent-details">
                                            <h4><a href="#c">Shivangi Preet</a></h4>
                                            <span><i className="lni-phone-handset"></i>(91) 123 456 7895</span>
                                        </div>
                                        <div className="clearfix"></div>
                                    </div>

                                    <div className="form-group">
                                        <input type="text" className="form-control" placeholder="Your Email" />
                                    </div>
                                    <div className="form-group">
                                        <input type="text" className="form-control" placeholder="Your Phone" />
                                    </div>
                                    <div className="form-group">
                                        <textarea className="form-control">I'm interested in this property.</textarea>
                                    </div>
                                    <button className="btn btn-theme full-width">Send Message</button>
                                </div> */}



                                    <div className="sidebar-widgets">

                                        <h4>Similar Category</h4>

                                        {
                                            categoryList.map((x, i) => {
                                                return x.id === query.id ? null : <HorizontalProductCard val={x} key={i} />
                                            })
                                        }

                                    </div>

                                </div>
                            </div>





                        </div>
                    </div>
                </section>
            )
        }
    }
}

