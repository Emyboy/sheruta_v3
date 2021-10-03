import React, { useEffect, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
import axios from "axios";
import Cookies from "js-cookie";
import SelectionCard from "../SelectionCard/SelectionCard";
import Btn from "../Btn/Btn";
import store from "../../redux/store/store";
import { notifyEmy } from "../../utils/Sheruta";
import { logout } from "../../redux/strapi_actions/auth.actions";

import { getAuthPersonalInfo } from "../../redux/strapi_actions/view.action";

const ConfigViewPopup = (props) => {
  const { auth } = props;
  const { user } = auth.user;
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [isLookingFor, setIsLookingFor] = useState(undefined);
  const dispatch = useDispatch();
  const view = useSelector(state => state.view);

  useEffect(() => {
    if(!view.personal_info){
      dispatch(getAuthPersonalInfo());
    }
  }, [auth.user]);

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
    axios(process.env.REACT_APP_API_URL + `/personal-infos/?users_permissions_user=${auth.user.user.id}`, {
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
            configureView: false
          },
        });
        setShow(false);
        notifyEmy({
          heading: `${user.first_name} updated his status to ${isLookingFor ? "I'm Looking For": "I Have"}`,
          log: data,
        });
      })
      .catch((err) => {
        setLoading(false);
        notifyEmy({
          heading: "error configuring view"
        })
      });
  };

  return (
    <Modal show={view.configureView}>
      <Modal.Body>
        <h3>Configure what you see</h3>
        <h4 className="text-muted">How can we help?</h4>
        <div className="row justify-content-center mt-5">
          <SelectionCard
            heading="I am looking for"
            test_id="looking_for"
            subHeading="Show me people who have"
            onSelect={() => setIsLookingFor(true)}
            isSelected={isLookingFor === true}
          />
          <SelectionCard
            heading="I have for share"
            subHeading="Show me people who are looking"
            test_id="not_looking_for"
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

const mapDispatchToProps = {
  logout,
};

export default connect(mapStateToProps, mapDispatchToProps)(ConfigViewPopup);
