import React, { useState } from 'react'
import { connect } from 'react-redux';
import { useForm } from 'react-hook-form'

import Btn from '../../components/Btn/Btn'
import axios from 'axios';
import Layout from '../../components/Layout/Layout';


export const ResetPasswordRequest = (props) => {


    const { register, handleSubmit } = useForm();

    const [state, setState] = useState({
        loading: false,
        errorMessage: null,
        sent: false,
        message: null
    })

    const onSubmit = data => {
        if (data.email) {
            setState({ ...state, loading: true })
            axios(process.env.REACT_APP_API_URL + '/personal-infos/password/reset/request', {
                method: 'POST',
                data: { email: data.email }
            })
                .then(res => {
                    setState({ ...state, loading: false, sent: true, message: res.data.message })
                })
                .catch(err => {
                    setState({ ...state, loading: false })
                    if (err.response.data.message) {
                        setState({ ...state, errorMessage: err.response.data.message })
                    }
                })
        }
    }

    if (state.sent) {
        return <Layout>
            <div >
                <div className="animate__animated animate__fadeIn modal-dialog modal-dialog-centered login-pop-form" role="document">
                    <div className="modal-content" id="registermodal">
                        {/* <span className="mod-close" data-dismiss="modal" aria-hidden="true"><i className="ti-close"></i></span> */}
                        <div className="modal-body">
                            <div className="login-form">
                                {state.errorMessage ? <div className='alert alert-danger text-center'>
                                    <b className='m-0 p-0 h5'>{state.errorMessage}</b>
                                </div> : null}
                                <form onSubmit={handleSubmit(onSubmit)} className='text-center'>

                                    <h4 className="modal-header-title">{state.message}</h4>
                                    <p>Please Check Your Mail</p>

                                </form>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    } else
        return (
            <Layout>
                <div >
                    <div className="animate__animated animate__fadeIn modal-dialog modal-dialog-centered login-pop-form" role="document">
                        <div className="modal-content" id="registermodal">
                            {/* <span className="mod-close" data-dismiss="modal" aria-hidden="true"><i className="ti-close"></i></span> */}
                            <div className="modal-body">
                                <h4 className="modal-header-title" style={{ lineHeight: '50px'}}>Password Reset</h4>
                                <div className="login-form">
                                    {state.errorMessage ? <div className='alert alert-danger text-center'>
                                        <b className='m-0 p-0 h5'>{state.errorMessage}</b>
                                    </div> : null}
                                    <form onSubmit={handleSubmit(onSubmit)}>

                                        <div className="form-group">
                                            <label>Your Email</label>
                                            <div className="input-with-icon">
                                                <input disabled={state.loading} autoFocus name='email' type="email" className="form-control" placeholder="Ex. youmain@mail.com" {...register("email")} />
                                                <i className="ti-user"></i>
                                            </div>
                                            {/* {errors.identifier && <p className='text-danger'>{errors.identifier.message}</p>} */}
                                        </div>

                                        <div className="form-group">
                                            <Btn text='Send' loading={state.loading} className='full-width mt-2' type='submit' />
                                            {/* <div className='text-center mt-3'>
                                        <Link to='/signup' className='text-success h5'>Signup</Link>
                                    </div> */}
                                        </div>

                                    </form>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        )
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(ResetPasswordRequest)
