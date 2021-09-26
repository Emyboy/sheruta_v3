import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import TextArea from '../../components/TextArea/TextArea';
import Btn from '../../components/Btn/Btn'
import axios from 'axios';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import Layout from '../../components/Layout/Layout';

const UserFeedback = (props) => {

    localStorage.setItem('after_login', '/feedback')

    const [state, setState] = useState({
        step: 1,
    });

    const [data, setData] = useState({
        rating: null,
        message: null
    });

    useEffect(() => {
        if (data.rating > 2 && data.rating !== null) {
            setTimeout(() => {
                setState({ ...state, step: 2 })
            }, 1000);
        } else if (data.rating < 3 && data.rating !== null) {
            setTimeout(() => {
                setState({ ...state, step: 3 })
            }, 1000);
        }
    }, [data.rating]);

    const sendFeedback = () => {
        setTimeout(() => {
            setState({ ...state, step: 4 })
        }, 1000);
        axios(process.env.REACT_APP_API_URL + '/user-feedbacks', {
            method: 'POST',
            headers: {
                Authorization:
                    `Bearer ${props.auth.user.jwt}`,
            },
            data: {
                body: data.message,
                heading: 'Feedback after posting request',
                rating: data.rating,
                users_permissions_user: props.auth.user ? props.auth.user.user.id : null
            }
        })
            .then(res => {
                // console.log(res)
            })
            .catch(err => {
                // console.log(err)
            })
    }

    if (props.auth.user) {
        return (
            <Layout>
                <div className='container'>
                    <div className='bg-white mt-5 mb-5 rounded'>
                        <div className='card-body'>
                            {
                                state.step === 1 ? <div className='text-center animated animate__fadeIn'>
                                    <h2 className='mb-4'><b>Hi there.</b></h2>
                                    <h4>Kindly rate your experience so far.</h4>
                                    <div className='row justify-content-center mt-2'>
                                        <i className={`link m-2 fa fa-smile-beam display-5 ${data.rating === 4 ? 'text-theme' : ''}`} onClick={() => setData({ ...data, rating: 4 })}></i>
                                        <i className={`link m-2 fa fa-meh display-5 ${data.rating === 3 ? 'text-warning' : ''}`} onClick={() => setData({ ...data, rating: 3 })}></i>
                                        <i className={`link m-2 fa fa-frown display-5 ${data.rating === 2 ? 'text-info' : ''}`} onClick={() => setData({ ...data, rating: 2 })}></i>
                                        <i className={`link m-2 fa fa-angry display-5 ${data.rating === 1 ? 'text-danger' : ''}`} onClick={() => setData({ ...data, rating: 1 })}></i>
                                    </div>
                                </div> : null
                            }
                            {
                                state.step === 2 ? <div className='text-center animated animate__fadeIn'>
                                    {/* <h5 className='h1 mb-4'><b>Hi there,</b></h5> */}
                                    <h2>Please tell us why you chose that.</h2>
                                    <TextArea
                                        placeholder='Type in here...'
                                        onChange={e => {
                                            setData({ ...data, message: e.target.value })
                                        }}
                                    />
                                    <Btn
                                        text='Send'
                                        onClick={sendFeedback}
                                    />
                                </div> : null
                            }
                            {
                                state.step === 3 ? <div className='text-center animated animate__fadeIn'>
                                    <h2 className='mb-4'><b>What would you like us to improve or add?</b></h2>
                                    <TextArea
                                        placeholder='Type in here...'
                                        onChange={e => {
                                            setData({ ...data, message: e.target.value })
                                        }}
                                    />
                                    <Btn
                                        text='Send'
                                        onClick={sendFeedback}
                                    />
                                </div> : null
                            }
                            {
                                state.step === 4 ? <div className='text-center animated animate__fadeIn'>
                                    <h2 className='mb-4'><b>Thank you for your time.</b></h2>
                                    <h4>Have a nice day.</h4>
                                    <Link to='/'>
                                        <Btn
                                            text='Continue'
                                        />
                                    </Link>
                                </div> : null
                            }
                        </div>
                    </div>
                </div>
            </Layout>
        )
    } else {
        return <Redirect to='/login' />
    }

}

const mapStateToProps = (state) => ({
    auth: state.auth,
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(UserFeedback)
