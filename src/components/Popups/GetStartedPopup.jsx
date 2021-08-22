import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Modal } from "react-bootstrap";
import Btn from "../Btn/Btn";
import { Link } from "react-router-dom";

const GetStartedPopup = (props) => {
  const { view } = props;
  const [hasFinished, setHasFinished] = useState(undefined);
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (view.personal_info) {
      const { id_front_img_url, occupation, looking_for_gender } =
        view.personal_info;
      if (looking_for_gender) {
        setHasFinished(false);
      }
      if (!id_front_img_url && !occupation) {
        setShow(true);
      }
    }
  }, [view.personal_info]);

  return (
    <Modal show={show}>
      <Modal.Body>
        <h3>Join the community today.</h3>
        <h5 className="text-muted">Get access to verified flat mates</h5>
        <h5 className="text-muted">Find people closest to you</h5>
        <h5 className="text-muted">Be the first to get updates</h5>
        <div className="row">
          <Link to="/start">
            <Btn
              text="Join Now"
              className="mt-4"
              onClick={() => setShow(false)}
            />
          </Link>
          <span
            style={{ alignSelf: "center" }}
            className="mt-4 link ml-5"
            onClick={() => setShow(false)}
          >
            <h6 className="text-theme">Remind me later</h6>
          </span>
        </div>
      </Modal.Body>
    </Modal>
  );
};

const mapStateToProps = (state) => ({
  view: state.view,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(GetStartedPopup);
