import React, { useState, useEffect } from 'react'
import { connect, useSelector, useDispatch } from 'react-redux'
import Layout from '../../components/Layout/Layout';
import MetaTags from 'react-meta-tags';
import { Redirect } from 'react-router';
import Gender from './Steps/Gendar'
import axios from 'axios';
import { notification } from 'antd';
import LookingForGender from './Steps/LookingForGender';
import LookingForStatus from './Steps/GetStartedInstructions';
import PrefaredLocations from './Steps/PrefaredLocations';
import PersonalInfoForm from './Steps/PersonalInfoForm';
// import Age from './Steps/Age';
import AgeRange from './Steps/AgeRange';
import UpdateAvatar from './Steps/UpdateAvatar';
import ValidIdCard from './Steps/ValidIdCard';
import FinishStep from './Steps/FinishStep';

const RenderStep = ({ props, step }) => {
    // console.log('BUT RENDERED ---', { props, step })
    const allSteps = [
      <LookingForStatus {...props} />,
    //   <Gender {...props} />,
      <LookingForGender {...props} />,
      <PrefaredLocations {...props} />,
      <ValidIdCard {...props} />,
      <AgeRange {...props} />,
      <UpdateAvatar {...props} />,
      <PersonalInfoForm {...props} />,
      <FinishStep {...props} />,
    ];
    return allSteps[step-1]
}

export const GetStarted = (props) => {
    localStorage.setItem('after_login', '/start');
    const { params } = props.match;
    const { auth, match } = props;
    const [step, setStep] = useState(parseInt(params.step) || 1);
    const { personal_info } = useSelector(state => state.view);

    const [hasInfo, setHasInfo] = useState(false);
    const dispatch = useDispatch();

    // const stepsProps = {
    //     setStep: setStep,
    //     step: step,
    //     hasInfo,
    //     info: hasInfo
    // };

    useEffect(() => {
        if (auth.user) {
            axios(
                process.env.REACT_APP_API_URL +
                `/personal-infos/me`,
                {
                    headers: {
                        Authorization: `Bearer ${props.auth.user.jwt}`,
                    },
                }
            )
                .then((res) => {
                    // console.log(res)
                    setHasInfo(res.data);
                    dispatch({
                        type: 'SET_VIEW_STATE',
                        payload: {
                            personal_info: res.data
                        }
                    })
                })
                .catch((error) => {
                    dispatch({
                        type: "SET_VIEW_STATE",
                        payload: {
                            configureView: true
                        },
                    });
                    notification.error({
                        message: "Error fetching user information",
                    });
                });
        }
    }, [step]);

    // if (personal_info && personal_info.id_back_img_url && personal_info.id_front_img_url) {
    //     return <Redirect to='/' />
    // }

    if (auth.user) {
        return (
            <Layout back>
                <MetaTags>
                    <title>Get Started | Sheruta NG</title>
                    <meta name="description" content="Get Started with Sheruta Today" />
                    <meta property="og:title" content="Get Started | Sheruta NG" />
                    <meta property="og:description" content="Get Started with Sheruta Today" />
                </MetaTags>

                <secion>
                    <div className='container bg-white mt-5 mb-4 border-success border rounded'
                    >
                        {/* <div className="row mb-3">
                            <div className="col text-center">
                                {hasInfo ? <div className="badge-warning">Updated Personal Information</div> : null}
                            </div>
                        </div> */}
                        <RenderStep props={{ hasInfo: hasInfo, setStep, info: hasInfo, step }} step={parseInt(match.params?.step) || step} />
                    </div>
                </secion>

            </Layout>
        )
    } else {
        return <Redirect to="/signup" />
    }
    
}

const mapStateToProps = (state) => ({
    auth: state.auth
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(GetStarted)
