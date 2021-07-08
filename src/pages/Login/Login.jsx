import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useForm } from 'react-hook-form'
import { Redirect } from 'react-router';
import { setAuthState } from '../../redux/strapi_actions/auth.actions'
import Btn from '../../components/Btn/Btn'
import axios from 'axios';
import { notification } from 'antd';
import MetaTags from 'react-meta-tags';
import { Link } from 'react-router-dom';
import VerifyEmailProcess from '../VerifyEmail/VerifyEmailProcess';
import Layout from '../../components/Layout/Layout';

const mapStateToProps = state => ({
    auth: state.auth
});

const mapActionToProps = {
    setAuthState
}


const Login = props => {

    const [state, setState] = useState({
        loading: false,
        errorMessage: null,
        notVerified: false,
        userData: null
    })
    // useEffect(() => {

    // }, [state.userData]);

    const { register, handleSubmit, errors } = useForm();

    const onSubmit = data => {
        setState({ ...state, loading: true })
        axios(process.env.REACT_APP_API_URL + '/auth/local', {
            method: 'POST',
            data
        })
            .then(res => {
                const isVerified = res.data.user.confirmed;
                if (isVerified) {
                    setState({ ...state, loading: false })
                    notification.success({ message: 'Welcome' })
                    localStorage.setItem('token', res.data.jwt);
                    props.setAuthState({
                        user: res.data
                    })
                } else {
                    setState({ ...state, notVerified: true, userData: res.data })
                }
            })
            .catch(err => {
                setState({
                    ...state,
                    errorMessage: err.response? err.response.data.data[0].messages[0].message : "Server Error",
                    loading: false
                })
                setTimeout(() => {
                    setState({ ...state, errorMessage: null })
                }, 3000);
            })
    }

    if (props.auth.user) {
        return <Redirect to={localStorage.getItem('after_login') || '/'} />
    } else if (state.notVerified) {
        return <VerifyEmailProcess userData={state.userData} />
    } else
        return (
            <Layout
                back
                page='login'
             >
                <MetaTags>
                    <title>Login | Sheruta NG</title>
                    <meta name="description" content={'Login to Sheruta and get access to shared apartments today'} />
                    <meta property="og:title" content={'Login | Sheruta NG'} />
                    <meta property="og:description" content={'Login to Sheruta and get access to shared apartments today'} />
                </MetaTags>
                <div className="animate__animated animate__fadeIn modal-dialog modal-dialog-centered login-pop-form mt-5" role="document">
                    <div className="modal-content" id="registermodal">
                        <span className="mod-close" data-dismiss="modal" aria-hidden="true"><i className="ti-close"></i></span>
                        <div className="modal-body">
                            <h4 className="modal-header-title">Log In</h4>
                            <div className="login-form">
                                {state.errorMessage ? <div className='alert alert-danger text-center'>
                                    <b className='m-0 p-0 h5'>{state.errorMessage}</b>
                                </div> : null}
                                <form onSubmit={handleSubmit(onSubmit)}>

                                    <div className="form-group">
                                        <label>Email</label>
                                        <div className="input-with-icon">
                                            <input disabled={state.loading} autoFocus name='identifier' type="email" className="form-control" placeholder="Email" {...register("identifier")} />
                                            <i className="ti-user"></i>
                                        </div>
                                        {/* {errors.identifier && <p className='text-danger'>{errors.identifier.message}</p>} */}
                                    </div>

                                    <div className="form-group">
                                        <label>Password</label>
                                        <div className="input-with-icon">
                                            <input disabled={state.loading} name='password' type="password" className="form-control" placeholder="*******" {...register("password")}
                                            />
                                            <i className="ti-unlock"></i>
                                        </div>
                                        {/* {errors.password && <p className='text-danger'>{errors.password.message}</p>} */}
                                    </div>

                                    <div className="form-group">
                                        <Btn text='Login' loading={state.loading} className='full-width mt-2' type='submit' />
                                        <Link to='/password/reset/request' className='text-theme pl-0 link btn'>Forgot Password</Link>
                                        <div className='text-center mt-3'>
                                            <Link to='/signup' className='text-success h5'>Signup</Link>
                                        </div>
                                    </div>

                                </form>
                            </div>

                        </div>
                    </div>
                </div>
            </Layout>
        )
}



export default connect(mapStateToProps, mapActionToProps)(Login);


