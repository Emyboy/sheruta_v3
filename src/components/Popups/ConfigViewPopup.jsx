import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Modal } from "react-bootstrap";
import axios from "axios";
import Cookies from "js-cookie";
import SelectionCard from "../SelectionCard/SelectionCard";
import Btn from "../Btn/Btn";
import store from "../../redux/store/store";
import { notifyEmy } from "../../utils/Sheruta";

const ConfigViewPopup = (props) => {
  const { auth, view } = props;
  const { user } = auth.user;
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [isLookingFor, setIsLookingFor] = useState(undefined);

  useEffect(() => {
    console.log("USER --", user);
    axios(process.env.REACT_APP_API_URL + "/personal-infos/me", {
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    })
      .then((res) => {
        console.log("RES ---", res);
        store.dispatch({
          type: "SET_VIEW_STATE",
          payload: {
            personal_info: res.data,
          },
        });
      })
      .catch((err) => {
        setShow(true);
      });
  }, []);

  const updatePersonalInfo = () => {
    setLoading(true);
    const data = view.personal_info
      ? {
          looking_for: isLookingFor,
        }
      : {
          looking_for: isLookingFor,
          phone_number: user.phone_number,
          users_permissions_user: user.id,
        };
    axios(process.env.REACT_APP_API_URL + "/personal-infos", {
      method: view.personal_info ? "PUT" : "POST",
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
      data,
    })
      .then((res) => {
        setLoading(false);
        store.dispatch({
          type: "SET_VIEW_STATE",
          payload: {
            personal_info: res.data,
          },
        });
        setShow(false);
        notifyEmy({
            heading: `${user.first_name} updated personal from set view popup`,
            log: data,
        })
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  return (
    <Modal show={show}>
      <Modal.Body>
        <h3>Configure what you see</h3>
        <h4 className="text-muted">How can we help?</h4>
        <div className="row justify-content-center mt-5">
          <SelectionCard
            heading="I am looking for"
            subHeading="Show me people who have"
            onSelect={() => setIsLookingFor(true)}
            isSelected={isLookingFor === true}
          />
          <SelectionCard
            heading="I have for share"
            subHeading="Show me people who are looking"
            onSelect={() => setIsLookingFor(false)}
            isSelected={isLookingFor === false}
          />
        </div>
        <div className="text-center">
          <Btn
            text="Change"
            onClick={updatePersonalInfo}
            className="mt-5"
            disabled={isLookingFor === undefined || loading}
          />
        </div>
      </Modal.Body>
    </Modal>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  view: state.view,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ConfigViewPopup);
