import { Modal } from "react-bootstrap";
import React, { useState } from "react";
import { BsFillBellFill } from "react-icons/bs";
import Btn from "../Btn/Btn";
import firebase from "../../Firebase";
import { useSelector } from "react-redux";
import { notifyEmy } from "../../services/Sheruta";
import axios from "axios";
import Cookies from "js-cookie";
import { notification } from "antd";

export default function NotificationPopup() {
    const [done, setDone] = useState(false);
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);
    const { user } = useSelector((state) => state.auth);
    const { personal_info } = useSelector((state) => state.view);

    const savePushToken = (token) => {
        axios(
            process.env.REACT_APP_API_URL +
                `/notifications/store/${user.user.id}`,
            {
                method: "POST",
                headers: {
                    authorization: `Bearer ${Cookies.get("token")}`,
                },
                data: {
                    push_token: token,
                },
            },
        )
            .then((res) => {
                setDone(true);
                setLoading(false);
                setShow(false);
                notifyEmy({
                    heading: "Enabled notifications",
                });
                notification.success({ message: "Notification enabled" });
            })
            .catch((err) => {
                console.log("Error saving notification", err);
                setDone(true);
                setLoading(false);
                setShow(false);
                notifyEmy({
                    heading: "Error saving notification key to DB",
                    log: err,
                });
            });
    };

    const handleClick = () => {
        setLoading(true);
        Notification.requestPermission().then(() => {
            const msg = firebase.messaging();
            msg.requestPermission()
                .then(() => {
                    return msg.getToken();
                })
                .then((data) => {
                    savePushToken(data);
                })
                .catch((err) => {
                    console.log("ERROR --", err);
                    notifyEmy({
                        heading: "Error turning on notification",
                        log: { ...err },
                    });
                });
        });
    };

    React.useEffect(() => {
        if (user && personal_info && Notification.permission !== "granted") {
            setTimeout(() => {
                setShow(true);
            }, 10000);
        }
    }, [personal_info, user]);

    if (done) {
        return null;
    }

    return (
        <Modal show={show}>
            <div className="card-body">
                <div className="text-center">
                    <BsFillBellFill size={80} />
                    <h2 className="mt-3">Turn On Notification</h2>
                    <h4>Get Realtime updates on</h4>
                    <hr />
                    <div>
                        <h5>New flat for share</h5>
                        <h5>Requests update</h5>
                        <h5>Messages</h5>
                        <h5>Profile activities</h5>
                        <h5>And much more...</h5>
                    </div>
                    <hr />
                </div>
                <div className="text-center">
                    <Btn
                        text="Allow Notifications"
                        onClick={handleClick}
                        loading={loading}
                    />
                    <br />
                    <Btn
                        text="Not Now"
                        onClick={() => setShow(false)}
                        loading={loading}
                        className="mt-3 btn-sm"
                        danger
                    />
                </div>
            </div>
        </Modal>
    );
}
