import Cookies from "js-cookie";
import React from "react";
import { useEffect } from "react";

export default function UnderConstruction() {

    useEffect(() => {
        localStorage.clear();
        sessionStorage.clear();
        Cookies.remove('token')
        Cookies.remove('agent')
        Cookies.remove('poll')
    }, [])

    return (
        <div style={{ textAlign: "center" }}>
            <img src="https://www.pngitem.com/pimgs/m/624-6243093_construction-building-under-clipart-transparent-png-construction-building.png" />
            <h1>Site is undergoing an upgrade</h1>
            <h6>We will be back up by the on the 15th 🥺</h6>
            <a target={"_blank"} href="https://www.instagram.com/sheruta_ng/">
                <button className="btn btn-lg btn-success mt-5">
                    Contact US
                </button>
            </a>
        </div>
    );
}
