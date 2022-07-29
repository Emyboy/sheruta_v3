import React from 'react'
import { Link } from 'react-router-dom';
import Btn from '../../Btn/Btn';

export default function FeeRequestAds() {
    return (
        <div
            className="border-gray shadow rounded p-2 d-flex justify-content-between mb-3"
            style={{
                background: `url(https://img3.stockfresh.com/files/i/iaroslava/m/53/8493661_stock-vector-seamless-vector-geometric-golden-line-pattern-abstract-background-with-gold-texture-on-white-simpl.jpg)`,
                backgroundSize: '40%'
            }}
        >
            <div className="col-sm-12 col-lg-7">
                <h3>Don't be left out</h3>
                <h5>Post a free request today</h5>
            </div>
            <div className="col-sm-1 col-lg-3" style={{ alignSelf: "center" }}>
                <Link to="/flat/submit">
                    <Btn
                        text="Post"
                        className="mr-2 btn-sm"
                        onClick={() => {}}
                    />
                </Link>
            </div>
        </div>
    );
}
