import React from "react";
import EachNotification from "./EachNotification";
import Layout from "../../components/Layout/Layout";

export default function Notifications() {
    return (
        <Layout page={'notifications'}>
            <section className="pt-3">
                <div>
                    <div className="col-lg-9">
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
