import React, { useState } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Spinner } from "react-activity";
import { notification } from "antd";
import MetaTags from "react-meta-tags";
import Layout from "../../components/Layout/Layout";
import { notifyEmy } from "../../utils/Sheruta";

export const Signup = (props) => {
  const { register, handleSubmit } = useForm();
  const [state, setState] = useState({
    loading: false,
    errorMessage: null,
    goToSuccess: false,
    gender: "male",
  });

  const onSubmit = (e) => {
    // console.log('SENDING ---', { ...e, username: e.username.replace(/\s/g, '')})
    setState({ ...state, loading: true });
    axios(process.env.REACT_APP_API_URL + "/auth/local/register", {
      method: "POST",
      data: { ...e, username: e.username.replace(/\s/g, "") },
    })
      .then((res) => {
        if (res.status === 201) {
          notification.success({ message: "Account Created" });
          notifyEmy({
            heading: `${e.email} just signup`,
            log: { ...res.data },
          });
          sessionStorage.setItem("mail", e.email);
          setState({ ...state, loading: false, goToSuccess: true });
        }
        setState({ ...state, loading: false });
        // store.dispatch({
        //     type: 'SET_AUTH_STATE',
        //     payload: {
        //         user: res.data
        //     }
        // })
      })
      .catch((err) => {
        notifyEmy({
          heading: "Error signing Up",
          log: null
        });
        setState({ ...state, loading: false });
        setState({
          ...state,
          errorMessage: err.response.data.message || "Singup Error",
        });
        setTimeout(() => {
          setState({ ...state, errorMessage: null });
        }, 3000);
      });
  };

  if (state.goToSuccess) {
    // return <SignUpSuccess />
    return <Redirect to="/signup/success" />;
  } else {
    return (
      <Layout back>
        <div className="animate__animated animate__fadeIn modal-dialog modal-dialog-centered login-pop-form mt-5 mb-5 pb-5">
          <MetaTags>
            <title>Signup | Sheruta NG</title>
            <meta
              name="description"
              content={
                "Be the first to Signup on Sheruta and get access to shared apartments today"
              }
            />
            <meta property="og:title" content={"Signup | Sheruta NG"} />
            <meta
              property="og:description"
              content={
                "Be the first to Signup on Sheruta and get access to shared apartments today"
              }
            />
          </MetaTags>
          <div className="modal-content m-2 border-gray rounded" id="sign-up">
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
              <h4 className="modal-header-title">Sign Up</h4>
              <div className="login-form">
                <form onSubmit={handleSubmit(onSubmit)}>
                  {state.errorMessage ? (
                    <div className="alert alert-danger">
                      {state.errorMessage}
                    </div>
                  ) : null}
                  <div className="row">
                    <div className="col-lg-6 col-md-6">
                      <div className="form-group">
                        <div className="input-with-icon">
                          <input
                            required
                            type="text"
                            className="form-control"
                            placeholder="First Name"
                            name="first_name"
                            id="first_name"
                            {...register("first_name")}
                          />
                          <i className="ti-user"></i>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6">
                      <div className="form-group">
                        <div className="input-with-icon">
                          <input
                            required
                            type="text"
                            className="form-control"
                            placeholder="Last Name"
                            name="last_name"
                            id="last_name"
                            {...register("last_name")}
                          />
                          <i className="ti-user"></i>
                        </div>
                      </div>
                    </div>

                    <div className="col-lg-6 col-md-6">
                      <div className="form-group">
                        <div className="input-with-icon">
                          <input
                            required
                            type="text"
                            className="form-control"
                            placeholder="Username"
                            name="username"
                            id="username"
                            {...register("username")}
                          />
                          <i className="ti-user"></i>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6">
                      <div className="form-group">
                        <div className="input-with-icon">
                          <input
                            required
                            type="email"
                            className="form-control"
                            placeholder="Email"
                            name="email"
                            id="email"
                            {...register("email")}
                          />
                          <i className="ti-email"></i>
                        </div>
                      </div>
                    </div>
                    <div className="w-100 col">
                      <div className="form-group">
                        <div className="input-with-icon">
                          <input
                            required
                            type="text"
                            className="form-control"
                            placeholder="Phone No (whatsapp)"
                            name="password"
                            id="phone_no"
                            {...register("phone_number")}
                          />
                          <i className="lni lni-phone"></i>
                        </div>
                      </div>
                    </div>

                    <div className="col-lg-6 col-md-6">
                      <div className="form-group">
                        <div className="input-with-icon">
                          <input
                            required
                            type="password"
                            className="form-control"
                            name="password"
                            id="password"
                            placeholder="Password"
                            {...register("password")}
                          />
                          <i className="ti-unlock"></i>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6">
                      <div className="form-group">
                        <div className="input-with-icon">
                          <input
                            required
                            type="password"
                            id="confirm_password"
                            className="form-control"
                            placeholder="Confirm Password"
                          />
                          <i className="ti-unlock"></i>
                        </div>
                      </div>
                    </div>

                    <div className="col-lg-6 col-md-6">
                      <div className="form-group">
                        <div className="input-with-icon">
                          <select
                            className="form-control"
                            {...register("gander")}
                          >
                            <option value="male">Male</option>
                            <option value="femaile">Female</option>
                          </select>
                          <i className="ti-face-smile"></i>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="form-group">
                    <button
                      disabled={state.loading}
                      type="submit"
                      id='signup-btn'
                      className="btn btn-md full-width pop-login"
                    >
                      {state.loading ? <Spinner color="white" /> : "Sign Up"}
                    </button>
                  </div>
                </form>
              </div>
              <div className="text-center">
                <p style={{ marginTop: '7rem'}}>
                  <i className="ti-user mr-1"></i>Already Have An Account?{" "}
                  <Link to="/login" className="link">
                    Go For LogIn
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
