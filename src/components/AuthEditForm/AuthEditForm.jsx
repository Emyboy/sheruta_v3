import axios from "axios";
import Cookies from "js-cookie";
import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getUser } from "../../redux/strapi_actions/auth.actions";
import { notifyEmy } from "../../services/Sheruta";
import Btn from "../Btn/Btn";
import TextArea from "../TextArea/TextArea";
import TextInput from "../TextInput/TextInput";

export default function AuthEditForm({ after_submit }) {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("danger");
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const [data, setData] = useState({
        first_name: user && user.user.first_name,
        last_name: user && user.user.last_name,
        bio: user && user.user.bio,
    });

    useEffect(() => {
        if (message) {
            setTimeout(() => {
                setMessage("");
            }, 5000);
        }
    }, [message]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        axios(
            process.env.REACT_APP_API_URL +
                `/users-permissions/auth/local/edit/${
                    user ? user.user.id : null
                }`,
            {
                method: "POST",
                data: data,
                headers: {
                    Authorization: `Bearer ${Cookies.get("token")}`,
                },
            },
        )
            .then((res) => {
                notifyEmy({
                    heading: `${data.first_name} ${data.last_name} Updated Profile`,
                    log: { ...res.data },
                    url: window.location.pathname,
                    status: "success",
                });
                setLoading(false);
                dispatch(getUser());
                setMessageType("success");
                setMessage("Your profile has been updated");
            })
            .catch((err) => {
                setLoading(false);
                notifyEmy({
                    heading: "Error updating user profile",
                    log: { ...err },
                    url: window.location.pathname,
                    status: "error",
                });
                setMessageType("danger");
                setMessage("Error updating profile");
            });
    };

    if (!user) {
        return null;
    } else {
        return (
            <Form onSubmit={handleSubmit}>
                <div className="row">
                    <div className="col-md-6">
                        <TextInput
                            placeholder="First Name"
                            label="First Name"
                            defaultValue={user.user.first_name}
                            onChange={(e) =>
                                setData({ ...data, first_name: e.target.value })
                            }
                            required
                        />
                    </div>
                    <div className="col-md-6">
                        <TextInput
                            placeholder="Last Name"
                            label="Last Name"
                            defaultValue={user.user.last_name}
                            required
                            onChange={(e) =>
                                setData({ ...data, last_name: e.target.value })
                            }
                        />
                    </div>
                    <div className="col-md-12">
                        <TextArea
                            placeholder="Bio"
                            label="Tell us more about yourself"
                            rows={"4"}
                            defaultValue={user.user.bio}
                            onChange={(e) =>
                                setData({ ...data, bio: e.target.value })
                            }
                        />
                    </div>
                </div>
                {message && (
                    <div className={`alert alert-${messageType}`}>
                        {message}
                    </div>
                )}
                <hr />
                <Btn text="Update" loading={loading} />
            </Form>
        );
    }
}
