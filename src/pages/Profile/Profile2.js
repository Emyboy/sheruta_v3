import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router';
import { logout } from '../../redux/strapi_actions/auth.actions'
import ProfileImageModal from './ProfileImageModal';
import { notification, Tabs } from 'antd';
import Btn from '../../components/Btn/Btn';
import axios from 'axios';
import EachRequest from '../Request/EachRequest';
import Layout from '../../components/Layout/Layout';

const { TabPane } = Tabs;
function callback(key) {
    console.log(key);
}

export const Profile2 = (props) => {
    const { auth } = props;
    const { user } = auth;

    const [state, setState] = useState({
        showImageModal: false,
        userRequests: []
    })


    useEffect(() => {
        if(user){
            axios(process.env.REACT_APP_API_URL + '/property-requests/?users_permissions_user=' + user.user.id, {

            })
                .then(res => {
                    console.log('REQ --', res)
                    setState({ ...state, userRequests: res.data })
                })
                .catch(err => {
                    notification.error({ message: 'Error Fetching User Data' })
                })
        }
    }, [props.auth.user])

    if (!props.auth.user) {
        return <Redirect to='/' />
    } else
        return (
            <Layout
                page='profile'
            >
                <section className="pt-2" style={{ height: '90vh' }}>
                    <ProfileImageModal show={state.showImageModal} handleClose={() => setState({ ...state, showImageModal: !state.showImageModal })} />
                    <div className="container-fluid">
                        <div className="row" style={{ justifyContent: 'center' }}>

                            <div className="col-lg-9 col-md-8 p-0">
                                <div className="dashboard-navbar bg-white p-1" style={{ height: '81vh' }}>
                                    <Tabs defaultActiveKey="1" onChange={callback}>
                                        <TabPane tab="Profile" key="1" className='profile-content'>
                                            <div className="d-user-avater">
                                                <img src={user.user.avatar_url} className="img-fluid avater" alt="" />
                                                <h4>{`${user.user.first_name} ${user.user.last_name}`}</h4>
                                                <span>{user.user.email}</span><br />
                                                <span>@{user.user.username}</span>
                                                <button
                                                    onClick={() => setState({ ...state, showImageModal: !state.showImageModal })}
                                                    className='btn btn-sm btn-success shadow'
                                                    style={{ position: 'absolute', top: '104px', borderRadius: '15px' }}
                                                >Change Image</button>
                                            </div>
                                            <div className='text-center'>
                                                <Btn
                                                    text={'Logout'}
                                                    icon={'ti-power-off'}
                                                    onClick={props.logout}
                                                />
                                            </div>
                                        </TabPane>
                                        <TabPane tab="Requests" key="2" className='profile-content'>
                                            <div className="comment-area">
                                                <div className="all-comments">
                                                    <div className="comment-list container">
                                                        <div className='row'>
                                                            {
                                                                state.userRequests.map((val, i) => {
                                                                    return <EachRequest val={val} key={i} />
                                                                })
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </TabPane>
                                    </Tabs>



                                </div>
                            </div>



                        </div>
                    </div>
                </section>
            </Layout>
        )
}

const mapStateToProps = (state) => ({
    auth: state.auth,
})

const mapDispatchToProps = {
    logout
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile2)
