import React, { useEffect } from "react";
import EachNotification from "./EachNotification";
import Layout from "../../components/Layout/Layout";
import { getAllNotifications } from "../../redux/strapi_actions/view.action";
import { useDispatch, useSelector } from "react-redux";

export default function _Notifications() {
    const dispatch = useDispatch();
    const { notifications } = useSelector((state) => state.view);

    useEffect(async () => {
        dispatch(getAllNotifications());
    }, []);
    
    console.log('NOTIFICAITION ==============', notifications)
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
                                        {notifications && notifications.map(
                                            (val, i) => {
                                                return (
                                                    <EachNotification
                                                        key={`${i}-notification`}
                                                        data={val}
                                                    />
                                                );
                                            },
                                        )}
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
