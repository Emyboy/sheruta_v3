import { notification } from "antd";
import axios from "axios";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Btn from "../../components/Btn/Btn";
import Layout from "../../components/Layout/Layout";

const SignUpSuccess = () => {
    const [state, setState] = useState({
        loading: false,
        display: "verify",
        showResend: false,
    });
    const verificationRequest = () => {
        setState({
            ...state,
            loading: true,
        });
        axios(
            process.env.REACT_APP_API_URL +
                "/personal-infos/verify/email/request",
            {
                method: "POST",
                // headers: {
                //     Authorization: 'Bearer ' + userData.jwt
                // },
                data: { token: Cookies.get("token") },
            },
        )
            .then((res) => {
                setState({
                    ...state,
                    loading: false,
                    display: "sent",
                    showResend: false
                });
                notification.success({ message: "Email has been sent" })
            })
            .catch((err) => {
                setState({
                    ...state,
                    loading: false,
                });
                notification.error({ message: "Error, Please try again." });
            });
    };

    useEffect(() => {
        setTimeout(() => {
            setState({ ...state, showResend: true });
        }, 20000);
    }, []);

    return (
        <Layout>
            <div
                className="animate__animated animate__fadeIn modal-dialog modal-dialog-centered login-pop-form"
                role="document"
            >
                <div className="modal-content" id="sign-up-success">
                    <Link to="/">
                        <span
                            className="mod-close"
                            data-dismiss="modal"
                            aria-hidden="true"
                        >
                            <i className="ti-close"></i>
                        </span>
                    </Link>
                    <div className="modal-body">
                        <h4
                            className="modal-header-title mt-5"
                            style={{ lineHeight: "40px" }}
                        >
                            Activate Account
                        </h4>
                        <p className="text-center">
                            Your account has been created. An activation link
                            has been sent to your registration email. Use the
                            link to activate your account.
                        </p>
                        {/* <Link className="btn btn-md full-width pop-login" to="/login">Resend Activation Email</Link> */}
                        <div className="text-center">
                            <i
                                className="fa fa-envelope"
                                style={{ fontSize: "100px" }}
                            ></i>
                            <p>{sessionStorage.getItem("mail")}</p>
                        </div>
                        {state.showResend ? (
                            <div className="text-center">
                                <h5>Didn't get an email?</h5>
                                <Btn
                                    text="Resend Verification Email"
                                    className="full-width mt-2 mb-4"
                                    onClick={verificationRequest}
                                    loading={state.loading}
                                />
                                <h6>OR</h6>
                                <p className="mt-5">
                                    <Link to="/login" className="link">
                                        Go For Log In
                                    </Link>
                                </p>
                            </div>
                        ) : <div className="text-center">
                                <small>Resend email in 20 seconds </small>
                            </div>
                            }
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default SignUpSuccess;
