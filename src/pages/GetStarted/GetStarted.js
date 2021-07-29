import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import Layout from '../../components/Layout/Layout';
import MetaTags from 'react-meta-tags';
import { Redirect } from 'react-router';
import Gendar from './Steps/Gendar'
import axios from 'axios';
import { notification } from 'antd';
import LookingForGender from './Steps/LookingForGender';
import LookingForStatus from './Steps/LookingForStatus';
import PrefaredLocations from './Steps/PrefaredLocations';

const RenderStep = ({ props, step }) => {
    switch (step) {
        case 1:
            return <LookingForStatus {...props} />
        case 2:
            return <Gendar {...props} />
        case 3:
            return <LookingForGender {...props} />
        case 4:
            return <PrefaredLocations {...props} />
        default:
            return null;
    }
}

export const GetStarted = (props) => {
    localStorage.setItem('after_login', '/start');
    const { auth } = props;
    const [step, setStep] = useState(1);
   
    const [hasInfo, setHasInfo] = useState(false);

    const stepsProps = {
        setStep: setStep,
        step: step,
        hasInfo,
        info: hasInfo
    };

    useEffect(() => {
        if (auth.user && !hasInfo) {
            axios(process.env.REACT_APP_API_URL + `/personal-infos/?users_permissions_user=${auth.user.user.id}`)
                .then(res => {
                    if (res.data.length > 0) {
                        setHasInfo(res.data[0]);
                    }
                })
                .catch(error => {
                    notification.error({ message: "Error fetching user information" })
                })
        }
    }, [step]);

    

    if (auth.user) {
        return (
            <Layout>
                <MetaTags>
                    <title>Get Started | Sheruta NG</title>
                    <meta name="description" content="Get Started with Sheruta Today" />
                    <meta property="og:title" content="Get Started | Sheruta NG" />
                    <meta property="og:description" content="Get Started with Sheruta Today" />
                </MetaTags>

                <secion>
                    <div className='container bg-white mt-5 mb-2 border-success border rounded'
                    // style={{ height: '80vh' }}
                    >
                        <div className="row mb-3">
                            <div className="col text-center">
                                {hasInfo ? <div className="badge-warning">Updated Personal Information</div> : null}
                            </div>
                        </div>
                        <RenderStep props={stepsProps} step={step} />
                    </div>
                </secion>

            </Layout>
        )
    } else {
        return <Redirect to="/login" />
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(GetStarted)
