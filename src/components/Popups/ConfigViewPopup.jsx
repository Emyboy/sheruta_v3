import React, { useEffect, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { Modal } from "antd";
import axios from "axios";
import Cookies from "js-cookie";
import SelectionCard from "../SelectionCard/SelectionCard";
import Btn from "../Btn/Btn";
import store from "../../redux/store/store";
import { notifyEmy } from "../../services/Sheruta";
import { logout } from "../../redux/strapi_actions/auth.actions";

import { getAuthPersonalInfo } from "../../redux/strapi_actions/view.action";

const ConfigViewPopup = (props) => {
  const { auth } = props;
  const { user } = auth.user;
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [isLookingFor, setIsLookingFor] = useState(null);
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

  if (Cookies.get('has_nin') === 'true' || view.personal_info) {
		return null
	}

  return (
		<Modal
			visible={view.configureView}
			footer={null}
			closable={false}
			width={699}
		>
			<div className="text-center">
				<h2 className="fw-bold">How can we help?</h2>
				<h5 className="text-muted">Select one below</h5>
			</div>
			<div className="row justify-content-center mt-5 mb-3">
				<div className="col-sm-12 col-md-6 mb-3 link">
					<div
						className={`card rounded ${isLookingFor && 'border-success border-3 shadow'}`}
						onClick={() => setIsLookingFor(true)}
					>
						<div className="card-body">
							<h3 className="fw-bold">I am looking for</h3>
							<h6>Show me people who have</h6>
						</div>
					</div>
				</div>
				<div className="col-sm-12 col-md-6 mb-3 link">
					<div
						className={`card rounded ${isLookingFor === false && `border-success border-3 shadow`}`}
						onClick={() => setIsLookingFor(false)}
					>
						<div className="card-body">
							<h3 className="fw-bold">I have for share</h3>
							<h6>Show those who are looking for</h6>
						</div>
					</div>
				</div>
				{/* <SelectionCard
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
				/> */}
			</div>
			<div className="alert alert-info mb-0">
				<h5 className="mb-0 text-center">
					<strong>You can also change this in settings</strong>
				</h5>
			</div>
			<div className="text-center">
				<Btn
					text="Configure"
					onClick={updatePersonalInfo}
					className="mt-5"
					disabled={isLookingFor === null || loading}
				/>
			</div>
		</Modal>
	)
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  view: state.view,
});

const mapDispatchToProps = {
  logout,
};

export default connect(mapStateToProps, mapDispatchToProps)(ConfigViewPopup);
