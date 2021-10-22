import React from "react";
import styled from "styled-components";
import Global from "../../../Global";
import { FaTimes } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { showRobotMessage } from "../../../redux/strapi_actions/view.action";


const Wrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    h5 {
        text-align: left;
        width: ${Global.isMobile ? "75%" : "80%"};
        text-transform: none;
    }
    img {
        border-radius: 50%;
        height: 60px;
        /* align-self: center; */
    }
    svg {
        position: absolute;
        left: 8px;
        top: 8px;
    }
`;

export default function RobotMessage() {
    const {
        robot_message,
        robot_action_text,
        robot_action_link,
        personal_info,
    } = useSelector((state) => state.view);
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch()

    const handleClose =() => {
        dispatch(showRobotMessage(null, null));
    }

    if (personal_info) {
        return (
            <Wrapper
                className={`bg-white rounded border border-info p-3 shadow link`}
            >
                <FaTimes size={20} onClick={handleClose} />
                <img
                    src={
                        "https://firebasestorage.googleapis.com/v0/b/sheruta-prod.appspot.com/o/DONT%20DELETE%2FLOGOS%2Fsheruta%20logo%20accect%20big.png?alt=media&token=caffc833-ce8b-40ed-be52-32d7e03bbdb7"
                    }
                    width="60"
                    alt="robot"
                    className="border-gray"
                    style={{ marginLeft: !Global.isMobile ? "20px" : "10px" }}
                />
                <h5>
                    {robot_message}
                    {robot_action_text && (
                        <Link
                            to={robot_action_link}
                            className="text-theme"
                            onClick={handleClose}
                        >
                            <b> {robot_action_text}</b>
                        </Link>
                    )}
                </h5>
            </Wrapper>
        );
    } else {
        return null;
    }
}
