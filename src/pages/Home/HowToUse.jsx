import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
    margin-bottom: 4em;
    .steps {
        /* border-radius: 50%;
        padding: 1em;
        font-weight: bold;
        font-size: 20px;
        color: white; */
    }
    .middle-icon-large-features-box {
        margin-bottom: 4rem;
        text-align: center;
    }
    .middle-icon-features-content {
        text-align: center;
        h4 {
            font-weight: bold;
        }
    }
`;

export default function HowToUse() {
    return (
        <div>
            <section className="bg-white mt-3">
                <div className="container">
                    <div className="row">
                        <div className="col text-center">
                            <div className="sec-heading center">
                                <h3>How It Works?</h3>
                                <p>
                                    How to start work with us and working
                                    process
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-lg-4 col-md-4">
                            <div className="middle-icon-features">
                                <Wrapper className="middle-icon-features-item">
                                    <div className="middle-icon-large-features-box">
                                        <i className="ti-user text-danger"></i>
                                        <span className="steps shadow bg-danger">
                                            01
                                        </span>
                                    </div>
                                    <div className="middle-icon-features-content">
                                        <h4>Create An Account</h4>
                                        <p>
                                            Sign up and verify your account
                                            through email.
                                        </p>
                                    </div>
                                </Wrapper>
                            </div>
                        </div>

                        <div className="col-lg-4 col-md-4">
                            <div className="middle-icon-features">
                                <Wrapper className="middle-icon-features-item">
                                    <div className="middle-icon-large-features-box">
                                        <i className="ti-search text-success"></i>
                                        <span className="steps shadow bg-success">
                                            02
                                        </span>
                                    </div>
                                    <div className="middle-icon-features-content">
                                        <h4>Find & Search Property</h4>
                                        <p>
                                            Browse through available properties
                                            for both shared apartments and
                                            entire apartments available for
                                            rent.{" "}
                                        </p>
                                    </div>
                                </Wrapper>
                            </div>
                        </div>

                        <div className="col-lg-4 col-md-4">
                            <div className="middle-icon-features">
                                <Wrapper className="middle-icon-features-item">
                                    <div className="middle-icon-large-features-box">
                                        <i className="ti-location-arrow text-warning"></i>
                                        <span className="steps shadow bg-warning">
                                            03
                                        </span>
                                    </div>
                                    <div className="middle-icon-features-content">
                                        <h4>Book Inspection</h4>
                                        <p>
                                            Book inspection for apartments you
                                            are interested in through call or
                                            direct message.
                                        </p>
                                    </div>
                                </Wrapper>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <div className="clearfix"></div>
        </div>
    );
}
