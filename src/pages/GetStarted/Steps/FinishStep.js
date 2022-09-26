import axios from "axios";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Btn from "../../../components/Btn/Btn";
import { notifyEmy } from "../../../services/Sheruta";
import { useDispatch } from "react-redux";
import { getUser } from "../../../redux/strapi_actions/auth.actions";

const FinishStep = (props) => {
  const { user } = props.auth;
  const dispatch = useDispatch()
  useEffect(() => {
    notifyEmy({
      heading: `${user.user.first_name} Finished updating personal info`,
      log: {
        user: user.user,
        personal_info: props.info
      },
      personal_info: props.info.id,
      status: 'success',
      url: window.location.pathname
    })
  }, []);

  useEffect(() => {
   
    notifyEmy({
      heading: "Finished the get started",
      status: 'success',
    })
    axios(process.env.REACT_APP_API_URL + `/sheruta/verify-request/${user.user.id}`, { method: 'POST' })
      .then(res => {
        // console.log('VERIFY --', res)
        dispatch(getUser())
      })
      .catch(err => {
        // console.log('VEIRFY ---', err)
      })
  }, [])

  return (
    <div className="container">
      <div className="text-center">
        <h2 className="fw-bold">Congratulations</h2>
        <h5>You are all done</h5>
        <img
          src="https://i.makeagif.com/media/4-13-2015/9Otr4j.gif"
          style={{ width: "200px" }}
        />
      </div>
      <hr />
      <div className="text-center">
        <Link to='/flat/submit'>
          <Btn
            text="Finish"
            className="mb-4"
            onClick={() => {
              // props.setStep(props.step + 1);
            }}
          />
        </Link>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(FinishStep);
