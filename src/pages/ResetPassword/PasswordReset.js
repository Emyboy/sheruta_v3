import React, { useState } from 'react'
import { connect } from 'react-redux';
import { useForm } from 'react-hook-form'
import Btn from '../../components/Btn/Btn'
import axios from 'axios';
import { Link } from 'react-router-dom';


const ResetPassword = (props) => {

    const { token, resetPasswordToken } = props.match.params;

    const { register, handleSubmit, errors } = useForm();

    const [state, setState] = useState({
        loading: false,
        errorMessage: null,
        changed: false,
        message: null
    })

    const onSubmit = data => {
        if (data.password && data.password2) {
            if (data.password === data.password2) {
                setState({ ...state, loading: true })
                axios(process.env.REACT_APP_API_URL + '/personal-infos/password/reset', {
                    method: 'POST',
                    data: {
                        token,
                        newPassword: data.password,
                        resetPasswordToken
                    }
                })
                    .then(res => {
                        setState({ ...state, loading: false, message: res.data.message, changed: true })
                    })
                    .catch(err => {
                        setState({ ...state, errorMessage: err.response.data ? err.response.data.message : 'Server Error', loading: false })
                    })
            }
        }
    }

    if (state.changed) {
        return <div >
            <div className="animate__animated animate__fadeIn modal-dialog modal-dialog-centered login-pop-form" role="document">
                <div className="modal-content" id="registermodal">
                    {/* <span className="mod-close" data-dismiss="modal" aria-hidden="true"><i className="ti-close"></i></span> */}
                    <div className="modal-body">
                        <h4 className="modal-header-title">{state.message}</h4>
                        <div className="login-form">
                            {state.errorMessage ? <div className='alert alert-danger text-center'>
                                <b className='m-0 p-0 h5'>{state.errorMessage}</b>
                            </div> : null}
                            <form onSubmit={handleSubmit(onSubmit)}>

                                <div className="form-group text-center">
                                    <Link to='/login'>
                                        <button className='btn btn-success w-1000 rounded'>Login</button>
                                    </Link>
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
    }

    return (
        <div >
            <div className="animate__animated animate__fadeIn modal-dialog modal-dialog-centered login-pop-form" role="document">
                <div className="modal-content" id="registermodal">
                    {/* <span className="mod-close" data-dismiss="modal" aria-hidden="true"><i className="ti-close"></i></span> */}
                    <div className="modal-body">
                        <h4 className="modal-header-title" style={{ lineHeight: '50px' }}>Password Reset</h4>
                        <div className="login-form">
                            {state.errorMessage ? <div className='alert alert-danger text-center'>
                                <b className='m-0 p-0 h5'>{state.errorMessage}</b>
                            </div> : null}
                            <form onSubmit={handleSubmit(onSubmit)}>

                                <div className="form-group">
                                    <label>New Password</label>
                                    <div className="input-with-icon">
                                        <input disabled={state.loading} autoFocus name='password' type="password" className="form-control" placeholder="* * * * *" {...register("password")} />
                                        <i className="ti-key"></i>
                                    </div>
                                    {/* {errors.identifier && <p className='text-danger'>{errors.identifier.message}</p>} */}
                                </div>
                                <div className="form-group">
                                    <label>Re-enter Password</label>
                                    <div className="input-with-icon">
                                        <input disabled={state.loading} name='password' type="password" className="form-control" placeholder="* * * * *" {...register("password2")} />
                                        <i className="ti-key"></i>
                                    </div>
                                    {/* {errors.identifier && <p className='text-danger'>{errors.identifier.message}</p>} */}
                                </div>

                                <div className="form-group">
                                    <Btn text='Reset' loading={state.loading} className='full-width mt-2' type='submit' />
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
    )
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword)
