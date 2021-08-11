import React from 'react'
import Btn from '../../components/Btn/Btn'
import Select from 'react-select'
import axios from 'axios';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { v4 as Uid } from 'uuid'
import { Alert, notification } from 'antd';
import { Link } from 'react-router-dom';
import TextInput from '../../components/TextInput/TextInput'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { getUserFeedback } from '../../redux/strapi_actions/view.action'
import Layout from '../../components/Layout/Layout';
import store from '../../redux/store/store';
import { notifyEmy } from '../../utils/Sheruta'

const uid = Uid();

const CraeteRequest = (props) => {
    localStorage.setItem('after_login', `${window.location.pathname}`)
    localStorage.setItem('after_payment', `${window.location.pathname}`)

    const { view, match } = props;

    const { params } = match;


    const [state, setState] = React.useState({
        categories: [],
        services: [],
        loading: false,
        done: false,
        hideOptions: true,
        message: null
    });

    const [data, setData] = React.useState({
        heading: null,
        body: null,
        uuid: uid,
        category: null,
        service: null,
        users_permissions_user: props.auth.user ? props.auth.user.user.id : null,
        budget: null,
        location: null,
        google_location: null,
        is_searching: false
    })


    const handleSubmit = e => {
        e.preventDefault();
        if (!state.categories) {
            notification.error({ message: 'Please select a category' });
            return
        }
        if (!data.location) {
            notification.error({ message: 'Please add a location' });
            return
        }
        setState({ ...state, loading: true });
        const newRequest = { 
            ...data, 
            body_html: `<p>${data.body}</p>`, 
            uuid: uid, users_permissions_user: props.auth.user.user.id ,
            service: parseInt(params.service_id),
            category: parseInt(params.category_id),
            is_searching: params.is_searching === "true",
        };
        axios(process.env.REACT_APP_API_URL + "/property-requests", {
            method: 'POST',
            data: newRequest,
            headers: {
                Authorization:
                    `Bearer ${props.auth.user.jwt}`,
            },
        })
            .then(res => {
                props.getUserFeedback();
                localStorage.removeItem('ph_request');
                setState({ ...state, loading: false, done: true })
            })
            .catch(err => {
                notifyEmy({
                  heading: "Error Posting requests",
                  log: { ...err },
                  status: "error",
                });
                if (err.response.status == 426 || err.response.status === 402) {
                    store.dispatch({
                        type: 'SET_VIEW_STATE',
                        payload: {
                            showPaymentPopup: true
                        }
                    });
                    localStorage.setItem('ph_request', JSON.stringify(newRequest));
                }
                setState({ ...state, loading: false });
                notification.error({ message: 'Error creating request' })
            })
    };

    React.useEffect(() => {
        const ph_request = JSON.parse(localStorage.getItem('ph_request'))
        if (Object.keys(params).length === 0) {
            setState({ ...state, hideOptions: false })
        }
        if (Object.keys(params).length > 0) {
            setData({
                ...data,
                service: parseInt(params.service_id), 
                category: parseInt(params.category_id),
                is_searching: params.is_searching === "true",
            })
            setData({ ...data, ...ph_request })
        }
        if (ph_request) {
            setState({ ...state, message: 'Continue from where you left off' })
        }
    }, [])


    if (state.done) {
        return <Layout back>
            {window.scrollTo({ top: 0, behavior: 'smooth' })}
            <div className='mt-5 mb-5'>
                <div className='container bg-white text-center'>
                    <div className='pt-5 pb-5'>
                        <div className='text-center'>
                            <h1><b>Request Created</b></h1>
                        </div>
                        <div className="comment-box submit-form">
                            {/* <h3 className="reply-title">Post Request</h3> */}
                            <div className="comment-form">
                                <Link to={`/request/${data.uuid}/${props.auth.user.user.id}`}>
                                    <Btn text='View Request' />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    } else if (!props.auth.user) {
        return <Redirect to='/login' />
    } else
        return (
            <Layout back>
                <div className='mt-5 pb-5'>
                    <div className='container bg-white mb-5'>
                        <div className='pt-5 pb-5'>
                            <div className='text-center'>
                                <h2>Create Request</h2>
                                {state.message ? <Alert message={state.message} type="success" /> : null}
                            </div>
                            <div className="comment-box submit-form">
                                {/* <h3 className="reply-title">Post Request</h3> */}
                                <div className="comment-form">
                                    <form onSubmit={handleSubmit}>
                                        <div className="row">
                                            <div className="col-lg-12 col-md-6 col-sm-12">
                                                <TextInput
                                                    label='Request Heading'
                                                    required
                                                    placeholder="Eg. I need a shared apartment in Ikeja"
                                                    onChange={e => setData({ ...data, heading: e.target.value })}
                                                    defaultValue={data.heading}
                                                />
                                            </div>

                                            {
                                                state.hideOptions ? null : <>
                                                    <div className="col-lg-6 col-md-6 col-sm-12">
                                                        <div className="form-group">
                                                            <label>Select Category</label>
                                                            <Select
                                                                placeholder='Select Category'
                                                                options={view.categories.map(val => ({ label: val.name, value: val.id }))}
                                                                onChange={e => {
                                                                    setData({ ...data, category: e.value })
                                                                }}
                                                                className='border rounded'
                                                                disabled={state.loading}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6 col-md-6 col-sm-12">
                                                        <div className="form-group">
                                                            <label>Select Service</label>
                                                            <Select
                                                                placeholder='Select Service'
                                                                onChange={e => {
                                                                    setData({ ...data, service: e.value })
                                                                }}
                                                                options={view.services.map(val => ({ label: val.name, value: val.id }))}
                                                                className='border rounded'
                                                                disabled={state.loading}
                                                            />
                                                        </div>
                                                    </div>

                                                </>
                                            }
                                            <div className="col-lg-6 col-md-6 col-sm-12">
                                                <div className="form-group">
                                                    <label>Area</label>
                                                    <GooglePlacesAutocomplete
                                                        apiKey={process.env.REACT_APP_GOOGLE_PLACES_API_KEY}
                                                        apiOptions={{ language: 'en', region: 'ng' }}
                                                        selectProps={{
                                                            // props.state.location,
                                                            className: 'border',
                                                            onChange: e => {
                                                                setData({ ...data, google_location: e, location: e.label })
                                                            },
                                                            placeholder:
                                                                'Eg: Yaba, Lekki, Okota',
                                                        }}
                                                        autocompletionRequest={{
                                                            componentRestrictions: {
                                                                country: ['ng'],
                                                            },
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-lg-6 col-md-6 col-sm-12">
                                                <div className="form-group">
                                                    <label>Budget / Price</label>
                                                    <input
                                                        style={{ height: '40px' }}
                                                        className='form-control'
                                                        type='number'
                                                        required
                                                        defaultValue={data.budget}
                                                        placeholder='Eg. 300000'
                                                        onChange={e => setData({ ...data, budget: e.target.value })}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-lg-12 col-md-12 col-sm-12">
                                                <div className="form-group">
                                                    <label>Request Body</label>
                                                    <textarea onChange={e => {
                                                        setData({
                                                            ...data,
                                                            body_html: e.target.value,
                                                            body: e.target.value,
                                                        })
                                                    }} disabled={state.loading} required name="body" className="form-control" cols="30" rows="6" placeholder="Type your request...."
                                                        defaultValue={data.body}
                                                    ></textarea>
                                                </div>
                                            </div>
                                            <div className="col-lg-12 col-md-12 col-sm-12">
                                                <div className="form-group">
                                                    <Btn type='submit' text='Post Request' className='w-100 shadow' loading={state.loading} />
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        )
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    view: state.view
})

const mapDispatchToProps = {
    getUserFeedback
}

export default connect(mapStateToProps, mapDispatchToProps)(CraeteRequest)
