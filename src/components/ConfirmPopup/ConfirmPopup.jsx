import React from 'react';
import Btn from "../Btn/Btn";
import { Modal} from 'react-bootstrap';



export default function ConfirmPopup({
    show,
    handleClose,
    loading,
    heading,
    handleAccept
}) {
    return (
      <Modal show={show} style={{ marginTop: "40vh" }}>
        <Modal.Body>
          {heading && (
            <h6 className="display-7 text-center mb-4" style={{ lineHeight: 1 }}>
              {heading}
            </h6>
          )}
          <div className="d-flex justify-content-between">
            <Btn className="w-50 btn-sm" text="yes" loading={loading} onClick={handleAccept} />
            <Btn className="w-50 btn-sm" text="No" danger disabled={loading} onClick={handleClose} />
          </div>
        </Modal.Body>
      </Modal>
    );
}
