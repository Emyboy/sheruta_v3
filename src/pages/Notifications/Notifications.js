import React, { useEffect } from "react";
import EachNotification from "./EachNotification";
import Layout from "../../components/Layout/Layout";
import { getAllNotifications } from "../../redux/strapi_actions/view.action";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router";

export default function _Notifications() {
    localStorage.setItem('after_login', '/notifications')
    const dispatch = useDispatch();
    const { notifications } = useSelector((state) => state.view);
    const { user } = useSelector((state) => state.auth);

    useEffect(async () => {
        dispatch(getAllNotifications());
    }, []);

    if(!user){
        return <Redirect to='/login' />
    }
    
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
                                    {/* <a title="" href="setting.html">
                                        Notifications Setting
                                    </a> */}
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
