import { notification } from 'antd';
import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { FaFemale, FaMale } from 'react-icons/fa'
import { connect } from 'react-redux';
import Btn from '../../../components/Btn/Btn';
import SelectionCard from '../../../components/SelectionCard/SelectionCard';
import Global from '../../../Global';
import { notifyEmy } from '../../../services/Sheruta';

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps
)((props) => {
    const { auth, hasInfo } = props;
    const [gender, setGender] = useState(null);
    const [loading, setLoading] = useState(false);
    const { step, setStep } = props;

    

    const updateGender = () => {
        setLoading(true)
        axios(process.env.REACT_APP_API_URL + "/personal-infos" + `${hasInfo ? `/${hasInfo.id}` : ``}`, {
            headers: {
                Authorization: `Bearer ${auth.user.jwt}`
            },
            method: hasInfo ? 'PUT' : 'POST',
            data: {
                looking_for_gender: gender,
            }
        })
            .then(res => {
                setStep(step + 1)
                setLoading(false)
            })
            .catch(err => {
                setLoading(false)
                notification.error('An error occurred, Please try again')
                notifyEmy({
                  heading: "Error updating gender",
                  log: { ...err },
                  status: "error",
                });
            })
    }

    return (
        <>
            <div className="sec-heading center">
                <h2 className='animated animate__bounceIn'>What gender are you looking for?</h2>
                <p>We will need to match you up with the gender of your choosing </p>
            </div>
            <div className="row justify-content-center animated animate__fadeIn">
                <SelectionCard
                    heading={<FaMale size={Global.isMobile ? 100 : 170} />}
                    subHeading={<h4>Male</h4>}
                    isSelected={gender === 'm'}
                    onSelect={() => setGender('m')}
                />
                <SelectionCard
                    heading={<FaFemale size={Global.isMobile ? 100 : 170} />}
                    subHeading={<h4>Female</h4>}
                    isSelected={gender === 'f'}
                    onSelect={() => setGender('f')}
                />
            </div>
            <div className="text-center mb-5 mt-3">
                <Btn
                    id='next-btn'
                    text='Next'
                    disabled={!gender}
                    loading={loading}
                    onClick={updateGender}
                />
            </div>
        </>
    )
});
