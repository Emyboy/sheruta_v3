import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../../components/Layout/Layout';

const SignUpSuccess = () => {
    return (
        <Layout>
            <div className="animate__animated animate__fadeIn modal-dialog modal-dialog-centered login-pop-form" role="document">
                <div className="modal-content" id="sign-up-success">
                    <Link to='/'><span className="mod-close" data-dismiss="modal" aria-hidden="true"><i className="ti-close"></i></span></Link>
                    <div className="modal-body">
                        <h4 className="modal-header-title mt-5" style={{ lineHeight: '30px'}}>Activate Account</h4>
                        <p className="text-center">
                            Your account has been created. An activation link has been sent to your registration email.
                            Use the link to activate your account.
                        </p>
                        {/* <Link className="btn btn-md full-width pop-login" to="/login">Resend Activation Email</Link> */}
                        <div className='text-center'>
                            <i className='fa fa-envelope' style={{ fontSize: '100px' }}></i>
                            <p>{sessionStorage.getItem('mail')}</p>
                        </div>
                        <div className="text-center">
                            <p className="mt-5"><Link to="/login" className="link">Go For Log In</Link></p>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>

    );
}

export default SignUpSuccess;