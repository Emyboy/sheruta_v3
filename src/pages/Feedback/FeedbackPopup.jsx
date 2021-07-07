import React from 'react'
import { connect } from 'react-redux'
import { Modal } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Btn from '../../components/Btn/Btn'
import store from '../../redux/store/store'

export const FeedbackPopup = (props) => {
    return (
        <Modal show={props.view.askForUserFeedback}>
            <Modal.Body className='text-center'>
                <h2><b>Hello</b></h2>
                <h4>We'd like you to give us some feedback</h4>
                <h5>This will only take 1 minute of your time.</h5>
                <hr />
                <Link to='/feedback'>
                    <Btn
                        text="Ok, I'm In"
                        onClick={() => store.dispatch({
                            type: 'SET_VIEW_STATE',
                            payload: {
                                askForUserFeedback: false
                            }
                        })}
                    />
                </Link>
                <h4 className='mt-3 text-theme' onClick={() => store.dispatch({
                    type: 'SET_VIEW_STATE',
                    payload: {
                        askForUserFeedback: false
                    }
                })}>Remind me later</h4>
            </Modal.Body>
        </Modal>
    )
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    view: state.view
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(FeedbackPopup)
