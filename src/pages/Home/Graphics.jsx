import React from "react";
import image from "./Newpics.png";
import whatwedo from "../../assets/img/whatwedo_bg.svg";


export default function ExploreByPopularCity() {
    return (
            <article
                className="mb-5"
                style={{ backgroundImage: `url(${whatwedo})` }}
            >
                <div className="container rounded">
                    <div className="row align-items-center ">
                        <div className="col-lg-6 col-md-6">
                            <img src={image} className="img-fluid" alt="" />
                        </div>

                        <div className="col-lg-6 col-md-6">
                            <div className="explore-content">
                                <h3 className="h2">
                                    <b>What do we do?</b>
                                </h3>
                                <p>
                                    We are an online housing assistance platform
                                    providing Nigerians with easier and safer
                                    housing through shared apartments and more,
                                    Our mission is to help reduce cost of rent
                                    for young Nigerians in the urban sides of the
                                    country
                                </p>
                                <p>
                                    {" "}
                                    Flatmate search made better. Co-living is
                                    here to stay and we are building a community
                                    of verified or verifiable working class
                                    members. We also provide peer to peer
                                    rentals to help secure that apartment with
                                    little or no stress required.{" "}
                                </p>
                                {/* <a href="http://themezhub.com/" className="btn btn-theme-2">Explore By Popular City</a> */}
                            </div>
                        </div>
                    </div>
                </div>
            </article>
    );
}
