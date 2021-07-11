import React from 'react'
import { connect } from 'react-redux'
import { Modal } from 'react-bootstrap';
import Btn from '../Btn/Btn';
import store from '../../redux/store/store';
import { Link } from 'react-router-dom';

const PaymentPopup = (props) => {
    const { view } = props;
    if (view.showPaymentPopup) {

        return (
            <Modal show={view.showPaymentPopup} className='animated animate__bounceIn'>
                <Modal.Body>
                    <div className='text-center'>
                        <i className='ti-alert display-3 text-warning'></i>
                        <h4><b>No or invalid subscription plan</b></h4>
                    </div>
                    <hr className='text-muted' />
                    <label><b>Why you are seeing this.</b></label>
                    <ol>
                        <li>Your subscription may have expired</li>
                        <li>Your subscription type doesn't enable you perform this action</li>
                    </ol>
                    <span className='text-danger'><b>NOTE: </b></span><span>If this is a mistake, don't fail to contact us</span>
                    <hr className='text-muted' />
                    <div className='text-center'>
                        <Link to='/pricing'>
                            <Btn
                                text='Subscribe Now'
                                className='btn-sm'
                                onClick={() => {
                                    store.dispatch({
                                        type: 'SET_VIEW_STATE',
                                        payload: {
                                            showPaymentPopup: false
                                        }
                                    })
                                }}
                            />
                        </Link>
                        <br />
                        <Btn
                            text='Close'
                            className='btn-sm mt-4 bg-light text-danger'
                            onClick={() => {
                                store.dispatch({
                                    type: 'SET_VIEW_STATE',
                                    payload: {
                                        showPaymentPopup: false
                                    }
                                })
                            }}
                        />
                    </div>
                </Modal.Body>
            </Modal>
        )
    } else
        return null
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    view: state.view
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(PaymentPopup)
