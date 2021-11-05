import React from "react";
import img1 from "../../assets/img/service/service (1).png";
import img2 from "../../assets/img/service/service (2).png";
import img3 from "../../assets/img/service/service (3).png";

export default function OurServices() {
    return (
        <section id="why-chose" className="whychose_us bgc-f7 pb30">
            <div className="container">
                <div className="row">
                    <div className="col-lg-6 offset-lg-3">
                        <div className="main-title text-center">
                            <h2>Our Services</h2>
                            {/* <p>We provide full service at every step.</p> */}
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6 col-lg-4 col-xl-4">
                        <div className="why_chose_us">
                            <div>
                                <span className="flaticon-home-1">
                                    <img src={img2} />
                                </span>
                            </div>
                            <div className="details">
                                <h4>1. For share</h4>
                                <p>
                                    Use For share to tag posts and requests
                                    involving apartments or spaces that have
                                    occupants with a free room or space.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 col-lg-4 col-xl-4">
                        <div className="why_chose_us">
                            <div>
                                <span className="flaticon-profit">
                                    <img src={img3} />
                                </span>
                            </div>
                            <div className="details">
                                <h4>2. Join Paddy</h4>
                                <p>
                                    Use JOIN PADDY to tag posts and requests
                                    involving unoccupied apartments still in the
                                    market. This targets community members
                                    intereted in securing spaces together.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 col-lg-4 col-xl-4">
                        <div className="why_chose_us">
                            <div>
                                <span className="flaticon-high-five">
                                    <img src={img1} />
                                </span>
                            </div>
                            <div className="details">
                                <h4>3. Carry over</h4>
                                <p>
                                    Use Carry over to tag posts and requests
                                    involving community members taking over your
                                    space as you relocate. Earn as much as 10%
                                    in commission.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
