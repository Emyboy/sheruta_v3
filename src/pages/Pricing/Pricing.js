import { notification } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { usePaystackPayment, PaystackButton } from 'react-paystack';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Modal } from 'react-bootstrap';
import Layout from '../../components/Layout/Layout';

const formatedPrice = new Intl.NumberFormat('en-NG');

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps
)((props) => {
    localStorage.setItem('after_login', '/pricing');

    const mockRef = {
        message: "Approved",
        reference: "1625420988167",
        status: "success",
        trans: "1203458722",
        transaction: "1203458722",
        trxref: "1625420988167"
    }

    const [state, setState] = useState({
        loading: true,
        plans: [],
        paystackDone: false,
        message: null,
        messageType: null
    });

    const [data, setData] = useState({
        payment_plan: null,
        reference: null
    });

    const config = {
        reference: (new Date()).getTime(),
        publicKey: process.env.REACT_APP_PAYSTACK_PUBLIC_KEY,
    };

    const handlePaystackSuccessAction = (reference, payment_plan_id) => {
        // Implementation for whatever you want to do with reference and after success call.
        setData({ ...data, payment_plan: payment_plan_id, reference })
        setState({ ...state, paystackDone: true })
    };

    // you can call this function anything
    const handlePaystackCloseAction = () => {
        // implementation for  whatever you want to do when the Paystack dialog closed.
        console.log('closed')
    }

    const getAllPaymentPlans = () => {
        axios(process.env.REACT_APP_API_URL + '/payment-plans')
            .then(res => {
                console.log('res---', res);
                setState({ ...state, loading: false, plans: res.data })
            })
            .catch(err => {
                notification.error({ message: 'Error getting payment plans' })
            })
    }

    const sendPaymentToBackend = () => {
        // console.log('SENDING ----', {
        //     ...data.reference,
        //     // ...mockRef,
        //     payment_plan: data.payment_plan,
        //     users_permissions_user: props.auth.user.user.id
        // })
        axios(process.env.REACT_APP_API_URL + '/transactions', {
            method: 'POST',
            headers: {
                Authorization:
                    `Bearer ${props.auth.user.jwt}`,
            },
            data: {
                ...data.reference,
                // ...mockRef,
                payment_plan: data.payment_plan,
                users_permissions_user: props.auth.user.user.id
            }
        })
            .then(res => {
                if (res.status === 201) {
                    setState({ ...state, paystackDone: false, message: res.data.message, messageType: 'success' })
                } else
                    setState({ ...state, paystackDone: false, message: res.data.message, messageType: 'failed' })
            })
            .catch(err => {
                setState({ ...state, paystackDone: false, message: 'Server Error', messageType: 'failed' })
            })
    }

    useEffect(() => {
        getAllPaymentPlans();
    }, []);

    // useEffect(() => {
    //     sendPaymentToBackend();
    // },[])

    useEffect(() => {
        if (state.paystackDone) {
            sendPaymentToBackend()
        }
    }, [state.paystackDone])

    return (
        <Layout>
            <div className='container mt-4 pb-5'>
                <Modal show={state.message ? true : false}>
                    <Modal.Body>
                        <div className='text-center'>
                            <i className='fa fa-check display-5'></i>
                            <h3>{state.message}</h3>
                            <Link to={localStorage.getItem('after_payment') || '/'}>
                                <button className='btn bg-theme'>Continue</button>
                            </Link>
                        </div>
                    </Modal.Body>
                </Modal>
                <div className="row mt-4">
                    <div className="col text-center">
                        <div className="sec-heading center">
                            <h2>See our packages</h2>
                            <p>We offer best and smart packages for you.</p>
                        </div>
                    </div>
                </div>

                <div className="row mb-5 justify-content-center pb-5">

                    {
                        state.plans.map((val, i) => {
                            return <div className="col-lg-4 col-md-4" key={i}>
                                <div className="pricing-wrap">

                                    <div className="pricing-header pb-1">
                                        <i className="lni-layers"></i>
                                        <h4 className="pr-title">{val.name}</h4>
                                        <span className="pr-subtitle">{val.sub_title}</span>
                                    </div>
                                    <div className="pricing-value">
                                        {val.discount_price ? <h5 className="mb-4 line-through  text-danger">{formatedPrice.format(val.price)}</h5> : null}
                                        <h4 className="pr-value">{formatedPrice.format(val.discount_price ? val.discount_price : val.price)}</h4>
                                    </div>
                                    <div className="pricing-body">
                                        <ul>
                                            <li>{val.duration_in_days} Days Access To</li>
                                            {/* <li>{val.property_count} Property Upload</li> */}
                                            <li>Agent Contacts {val.agent_contact ? <i className='ti ti-check text-theme'></i> : <i className='ti ti-close text-danger'></i>}</li>
                                            <li>Email Notifications {val.email_update ? <i className='ti ti-check text-theme'></i> : <i className='ti ti-close text-danger'></i>}</li>
                                            <li>Join Paddy {val.join_paddy ? <i className='ti ti-check text-theme'></i> : <i className='ti ti-close text-danger'></i>}</li>
                                            <li>Requests {val.requests ? <i className='ti ti-check text-theme'></i> : <i className='ti ti-close text-danger'></i>}</li>
                                            <li>Property Upload {val.upload_property ? <i className='ti ti-check text-theme'></i> : <i className='ti ti-close text-danger'></i>}</li>
                                            <li>User Contacts {val.user_contacts ? <i className='ti ti-check text-theme'></i> : <i className='ti ti-close text-danger'></i>}</li>
                                        </ul>
                                    </div>
                                    <div className="pricing-bottom">
                                        {
                                            !props.auth.user ?
                                                <Link to="/login" className="btn-pricing text-white">Login To Pay</Link> :
                                                <PaystackButton className='btn bg-theme rounded' {...{
                                                    ...config,
                                                    text: 'Pay Now',
                                                    amount: `${val.discount_price ? val.discount_price + "00" : val.price + "00"}`,
                                                    email: props.auth.user.user.email,
                                                    onSuccess: (reference) => handlePaystackSuccessAction(reference, val.id),
                                                    onClose: handlePaystackCloseAction,
                                                }} />
                                        }
                                    </div>

                                </div>
                            </div>
                        })
                    }

                    {/* <div className="col-lg-4 col-md-4">
                    <div className="pricing-wrap recommended">

                        <div className="pricing-header">
                            <i className="lni-diamond"></i>
                            <h4 className="pr-title">Platinum Package</h4>
                            <span className="pr-subtitle">Start With Platinum Package</span>
                        </div>
                        <div className="pricing-value">
                            <h4 className="pr-value">149</h4>
                        </div>
                        <div className="pricing-body">
                            <ul>
                                <li>5+ Listings</li>
                                <li>Contact With Agent</li>
                                <li>3 Month Validity</li>
                                <li>7x24 Fully Support</li>
                                <li>50GB Space</li>
                            </ul>
                        </div>
                        <div className="pricing-bottom">
                            <a href="#c" className="btn-pricing text-white">Choose Plan</a>
                        </div>

                    </div>
                </div>

                <div className="col-lg-4 col-md-4">
                    <div className="pricing-wrap">

                        <div className="pricing-header">
                            <i className="lni-invention"></i>
                            <h4 className="pr-title">Standard Package</h4>
                            <span className="pr-subtitle">Start With Standard Package</span>
                        </div>
                        <div className="pricing-value">
                            <h4 className="pr-value">199</h4>
                        </div>
                        <div className="pricing-body">
                            <ul>
                                <li>5+ Listings</li>
                                <li>Contact With Agent</li>
                                <li>3 Month Validity</li>
                                <li>7x24 Fully Support</li>
                                <li>50GB Space</li>
                            </ul>
                        </div>
                        <div className="pricing-bottom">
                            <a href="#c" className="btn-pricing text-white">Choose Plan</a>
                        </div>

                    </div>
                </div> */}

                </div>
            </div>
        </Layout>
    )
});
