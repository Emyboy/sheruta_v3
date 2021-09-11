import { notification } from 'antd';
import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { FaFemale, FaMale } from 'react-icons/fa'
import { connect } from 'react-redux';
import Btn from '../../../components/Btn/Btn';
import SelectionCard from '../../../components/SelectionCard/SelectionCard';
import Global from '../../../Global';
import { notifyEmy } from '../../../utils/Sheruta';

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps
)((props) => {
    const { auth, hasInfo, info } = props;
    const [lookingFor, setLookingFor] = useState(false);
    const [loading, setLoading] = useState(false)
    const { step, setStep } = props;

    const updateLookingFor = () => {
        setLoading(true);
        axios(process.env.REACT_APP_API_URL + "/personal-infos" + `${hasInfo ? `/${info.id}` : ``}`, {
            headers: {
                Authorization: `Bearer ${auth.user.jwt}`
            },
            method: "PUT",
            data: {
                looking_for: lookingFor,
            }
        })
            .then(res => {
                setStep(step + 1)
                setLoading(false)
            })
            .catch(err => {
                console.log({...err})
                setLoading(false)
                notification.error('An error occurred, Please try again')
                notifyEmy({
                  heading: "Error updating looking for",
                  log: { ...err },
                  status: "error",
                });
            })
    }

    return (
        <>
            <div className="sec-heading center mb-5">
                <h2 className='animated animate__bounceIn'>How can we help you?</h2>
                <p></p>
            </div>
            <div className="row justify-content-center animated animate__fadeIn">
                <SelectionCard
                    heading={"I have an apartment to share"}
                    isSelected={!lookingFor}
                    onSelect={() => setLookingFor(false)}
                />
                <SelectionCard
                    heading={"I am looking for an apartment to share"}
                    isSelected={lookingFor}
                    onSelect={() => setLookingFor(true)}
                />
            </div>
            <div className="text-center mb-5 mt-3">
                <Btn
                    text='Next'
                    loading={loading}
                    onClick={updateLookingFor}
                />
            </div>
        </>
    )

});
