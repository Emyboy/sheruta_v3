import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Modal } from "react-bootstrap";
import Btn from "../Btn/Btn";
import { Link } from "react-router-dom";

const GetStartedPopup = (props) => {
  const { view, auth } = props;
  const [hasFinished, setHasFinished] = useState(undefined);
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (view.personal_info) {
      const { looking_for_gender, occupation } =
        view.personal_info;
      if (looking_for_gender) {
        setHasFinished(false);
      }
      if (!occupation) {
        setShow(true);
      }else {
        setShow(false);
        
      }
    }
  }, [auth, view.personal_info]);

  const handleRemind = () => {
    sessionStorage.setItem('get_started_pause', true);
    setShow(false);
  }

  if (sessionStorage.getItem("get_started_pause")){
    return null;
  }
      return (
				<Modal
					show={show && !window.location.pathname.includes('start')}
					className="pt-5"
				>
					<Modal.Body className="card">
						<h1 className="text-black mb-4">
							<strong>Join the community today.</strong>
						</h1>
						<small className="text-muted mb-2">
							Get access to verified flat mates.
						</small>
						<small className="text-muted mb-2">Find people closest to you.</small>
						<small className="text-muted mb-2">Be the first to get updates.</small>
						<div className="container">
							<div className="row">
								<Link to="/start">
									<Btn
										test_id="get_started_popup_btn"
										text="Join Now"
										className="mt-4"
										onClick={() => setShow(false)}
									/>
								</Link>
								<span
									style={{ alignSelf: 'center' }}
									className="mt-4 link mt-3 text-theme"
									onClick={handleRemind}
								>
									<h3 className="text-current">Remind me later</h3>
								</span>
							</div>
						</div>
					</Modal.Body>
				</Modal>
			)
};

const mapStateToProps = (state) => ({
  view: state.view,
  auth: state.auth
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(GetStartedPopup);
