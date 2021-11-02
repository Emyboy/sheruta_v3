import React from "react";
import { Link } from "react-router-dom";
import Btn from "../../components/Btn/Btn";

export default function HomeJumbo() {
    return (
        <section
            className="home-one home1-overlay home1_bgi1"
            style={{
                background: `url("https://cdn.apartmenttherapy.info/image/upload/f_auto,q_auto:eco,c_fill,g_auto,w_1500,ar_3:2/project%20prism%2Fcolor%20search%20archive%2Ffdca42285757a45c50328d80460f369b415e66a3")`,
                backgroundSize: "cover",
                backgroundPosition: " center center",
                height: "960px",
            }}
        >
            <div className="container">
                <div className="row posr">
                    <div className="col-lg-12">
                        <div
                            // className="home_content"
                            style={{ paddingTop: "41vh" }}
                        >
                            <div className="home-text text-center">
                                <h2 className="fz55">
                                    Find Verified Flatmates.
                                </h2>
                                <p className="fz18 color-white">
                                    Join the community today
                                </p>
                            </div>
                            <div className="home_adv_srch_opt text-center">
                                <Link to="/start">
                                    <Btn text={"Get Started"} />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
