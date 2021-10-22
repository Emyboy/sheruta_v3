import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components'
import RobotMessage from './RobotMessage';
import { showRobotMessage } from '../../../redux/strapi_actions/view.action'

const Wrapper = styled.div`
    /* background-color: pink; */
    position: fixed;
    bottom: 7vh;
    z-index: 4;
    width: 100%;
`;

export default function RobotMessageContainer() {
    const dispatch = useDispatch()
    const { robot_message, robot_action_text, robot_action_link } = useSelector(
        (state) => state.view,
    );
    const { user } = useSelector(state => state.auth);
    useEffect(() => {
        if(!localStorage.getItem('robot_active') && user){
            dispatch(
                showRobotMessage(
                    `Hi ${user.user.first_name} my name is Anita and I'm here to guid you 😊`,
                    // "login here",
                    // "/pricing",
                ),
            );
            localStorage.setItem("robot_active", true);
        }
    },[])
    return (
        <Wrapper
            className={`animate__animated  ${
                robot_message ? "animate__bounceInUp" : "animate__bounceOutDown"
            }`}
        >
            <div className="row justify-content-center mb-4 mt-3 p-2 ">
                <div className="col-sm-12 col-lg-4 col-md-6">
                    <RobotMessage /> 
                </div>
            </div>
        </Wrapper>
    );
}
