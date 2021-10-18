import React from "react";
import EachNotification from "./EachNotification";
import Layout from "../../components/Layout/Layout";

export default function Notifications() {
    return (
        <Layout page={"notifications"}>
            <section className="pt-3 container-fluid">
                <div className="row justify-content-center">
                    <div className="col-lg-6 col-sm-12">
                        <div className="central-meta">
                            <div className="editing-interest">
                                <span className="create-post">
                                    <i className="ti-bell"></i> All
                                    Notifications
                                    <a title="" href="setting.html">
                                        Notifications Setting
                                    </a>
                                </span>
                                <div className="notification-box">
                                    <ul>
                                        <EachNotification />
                                        <EachNotification />
                                        <EachNotification />
                                        <EachNotification />
                                        <EachNotification />
                                        <EachNotification />
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    );
}
