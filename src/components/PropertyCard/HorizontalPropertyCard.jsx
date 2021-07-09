import { notification } from 'antd';
import axios from 'axios';
import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
// import { Link } from 'react-router-dom';


export default React.memo((props) => {
    const { val } = props;

    const [state, setState] = useState({
        category: null,
        service: null,
        status: null
    })

    const getCategory = () => {
        axios(process.env.REACT_APP_API_URL + '/categories?id=' + val.categorie)
            .then(res => {
                setState({
                    ...state,
                    category: res.data[0].name
                })
            })
            .catch(err => {
                notification.error({ message: 'Error fetching category' })
            })
    }

    const getStatus = () => {
        axios(process.env.REACT_APP_API_URL + '/status?id=' + val.statu)
            .then(res => {
                setState({
                    ...state,
                    status: res.data[0].name
                })
            })
            .catch(err => {
                notification.error({ message: 'Error fetching status' })
            })
    }

    const getService = () => {
        axios(process.env.REACT_APP_API_URL + '/services?id=' + val.service)
            .then(res => {
                setState({
                    ...state,
                    service: res.data[0].name
                })
            })
            .catch(err => {
                notification.error({ message: 'Error fetching services' })
            })
    }

    // useEffect(() => {
    //     if (val.categorie && !state.category) {
    //         getCategory()
    //     }
    // }, [state.category])
    // useEffect(() => {
    //     if (val.statu && !state.status) {
    //         getStatus()
    //     }
    // }, [state.status])
    // useEffect(() => {
    //     if (val.service && !state.service) {
    //         getService()
    //     }
    // }, [state.service])


    return (
        <div className="col-lg-12 col-md-12">
            <div className="property-listing property-1">

                <div className="listing-img-wrapper">
                    <a href={`/property/${val.name}/${val.id}`}>
                        <img src={val.image_urls[0]} className="img-fluid mx-auto" alt="" />
                    </a>
                    <div className="listing-like-top">
                        <span className='text-white'><b style={{ textShadow: "0 0 12px black" }}>{val.service.name}</b></span>
                    </div>
                    <div className="listing-rating rounded text-white">
                        <b>{state.category}</b>
                    </div>
                    {val.statu && <span className="property-type shadow"><b>{val.statu.name}</b></span>}
                </div>

                <div className="listing-content">

                    <div className="listing-detail-wrapper">
                        <div className="listing-short-detail">
                            <h4 className="listing-name"><a href={`/property/${val.name}/${val.id}`}>{val.name}</a></h4>
                            <span className="listing-location"><i className="ti-location-pin"></i>{val.location}</span>
                        </div>
                        {/* <div className="list-author">
                            <a href="#"><img src="assets/img/add-user.png" className="img-fluid img-circle avater-30" alt="" /></a>
                        </div> */}
                    </div>

                    <div className="listing-features-info border-0">
                        <ul>
                            <li><strong>Bedroom:</strong>{val.bedroom}</li>
                            <li><strong>Bathroom:</strong>{val.bathroom}</li>
                            <li><strong>Sittingroom:</strong>{val.sittingroom}</li>
                        </ul>
                    </div>

                    <div className="listing-footer-wrapper border-0">
                        <div className="listing-price">
                            <h4 className="list-pr">₦ {window.formatedPrice.format(val.price)}</h4>
                        </div>
                        {/* <div className="listing-detail-btn">
                            <a href={`/property/${val.name}/${val.id}`} className="more-btn">More Info</a>
                        </div> */}
                    </div>

                </div>

            </div>
        </div>
    )
});
