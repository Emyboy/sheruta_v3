import React, { Component } from 'react'
import { connect } from 'react-redux'
import { sendRequest } from '../../redux/actions/user.action';
import { notification } from 'antd';
import MetaTags from 'react-meta-tags';
import Btn from '../../components/Btn/Btn'
import Layout from '../../components/Layout/Layout'

// import loadingGif from '../../img/loading.gif';
// import DoneModal from '../../components/DoneModal';

const mapStateToProps = state => ({
    auth: state.auth,
    user: state.user
})

const mapActionToProps = {
    sendRequest
}

export default connect(
    mapStateToProps,
    mapActionToProps
)(
    class Contact extends Component {
        constructor(props) {
            super(props);
            const { auth } = props;
            this.state = {
                name: auth.isLoggedIn ? auth.user.fullname : null,
                phoneno: auth.isLoggedIn ? auth.user.phoneno : null,
                message: null
            }
        }
        componentDidMount() {
        }

        handleInputChaneg = e => {
            this.setState({
                [e.target.name]: e.target.value
            })
        }

        handleSubmit = (e) => {
            e.preventDefault();
            const { name, message, phoneno } = this.state;
            if (name === null || message === null || phoneno === null) {
                notification.warning({ message: 'Please Fill Out The Form' })
            } else
                this.props.sendRequest({ ...this.state, type: 'Message' });
        }

        render() {
            const { auth } = this.props;
            return (
                <Layout>
                    <MetaTags>
                        <title>Contact Us | Sheruta NG</title>
                        <meta name="description" content={'No: 181, Ago Palace Way, Okota, Lagos.'} />
                        <meta property="og:title" content={'Contact Us | Sheruta NG'} />
                        <meta property="og:description" content={'No: 181, Ago Palace Way, Okota, Lagos.'} />
                    </MetaTags>
                    {/* <DoneModal title={'Your request has been sent'} subTitle={"We well get back to you via Phone Call"} status={"success"} /> */}
                    <div className="page-title">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-12 col-md-12">

                                    <h2 className="ipt-title">Contact Us</h2>
                                    <span className="ipn-subtitle">Lists of our all Popular agencies</span>

                                </div>
                            </div>
                        </div>
                    </div>


                    <section>

                        <div className="container">

                            <div className="row">

                                <form onSubmit={(e) => this.handleSubmit(e)} className="col-lg-7 col-md-7">

                                    {
                                        auth.isLoggedIn ? null :
                                            <div className="row">
                                                <div className="col-lg-6 col-md-6">
                                                    <div className="form-group">
                                                        <label>Name</label>
                                                        <input onChange={(e) => this.handleInputChaneg(e)} name='name' type="text" className="form-control simple" />
                                                    </div>
                                                </div>
                                                <div className="col-lg-6 col-md-6">
                                                    <div className="form-group">
                                                        <label>Phone No:</label>
                                                        <input onChange={(e) => this.handleInputChaneg(e)} type="text" name='phoneno' className="form-control simple" />
                                                    </div>
                                                </div>
                                            </div>
                                    }

                                    {/* <div className="form-group">
                                        <label>Subject</label>
                                        <input type="text" className="form-control simple" />
                                    </div> */}

                                    <div className="form-group">
                                        <label>Message</label>
                                        <textarea onChange={(e) => this.handleInputChaneg(e)} name='message' className="form-control simple"></textarea>
                                    </div>

                                    <div className="form-group">
                                        {/* <button className="btn btn-theme" type="submit">Submit Request</button> */}
                                        {/* <button className="btn btn-theme full-width"> {user.uploadLoading ? <img src={loadingGif} alt='' /> : 'Send Message'}</button> */}
                                        <Btn
                                            text='Send Message'
                                            onClick={() => { }}
                                        />
                                    </div>

                                </form>

                                <div className="col-lg-5 col-md-5">
                                    <div className="contact-info">

                                        <h2>Get In Touch</h2>
                                        {/* <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p> */}

                                        <div className="cn-info-detail">
                                            <div className="cn-info-icon">
                                                <i className="ti-home"></i>
                                            </div>
                                            <div className="cn-info-content">
                                                <h4 className="cn-info-title">Reach Us</h4>
                                                No: 181, <br />Ago Palace Way, <br /> Okota, Lagos.
                                                {/* 2512, New Market,<br/>Eliza Road, Sincher 80 CA,<br/>Canada, USA */}
                                            </div>
                                        </div>

                                        <div className="cn-info-detail">
                                            <div className="cn-info-icon">
                                                <i className="ti-email"></i>
                                            </div>
                                            <div className="cn-info-content">
                                                <h4 className="cn-info-title">Drop A Mail</h4>
                                                {/* support@Rikada.com<br/>Rikada@gmail.com */}
                                                info@sheruta.ng
                                            </div>
                                        </div>

                                        <div className="cn-info-detail">
                                            <div className="cn-info-icon">
                                                <i className="ti-mobile"></i>
                                            </div>
                                            <div className="cn-info-content">
                                                <h4 className="cn-info-title">Call Us</h4>
                                                {/* (41) 123 521 458<br/>+91 235 548 7548 */}
                                                +2348138154470
                                            </div>
                                        </div>

                                    </div>
                                </div>

                            </div>

                        </div>

                    </section>

                </Layout>
            )
        }
    })
