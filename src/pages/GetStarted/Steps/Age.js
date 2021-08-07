import React, { useState } from "react";
import { connect } from "react-redux";
import { Form } from "react-bootstrap";
import Btn from "../../../components/Btn/Btn";
import axios from "axios";
import TextInput from "../../../components/TextInput/TextInput";

const Age = (props) => {
    console.log('PROPS --', props);
  const [date, setDate] = useState();
  const [loading, setLoading] = useState(false);
  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    axios(
      process.env.REACT_APP_API_URL + "/personal-infos" + `/${props.info.id}`,
      {
        headers: {
          Authorization: `Bearer ${props.auth.user.jwt}`,
        },
        method: "PUT",
        data: {
          date_of_birth: date,
        },
      }
    )
      .then((res) => {
        console.log(res);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  return (
    <div>
      <div className="sec-heading center">
        <h2 className="animated animate__bounceIn">Your Date Of Birth</h2>
        <p>
          We use this to calculate how old you are and find the best match for
          you.
        </p>
        <form onSubmit={handleSubmit}>
          <div className="d-flex justify-content-center mt-4">
            <div className="col-lg-6 col-md-6">
              <div className="form-group">
                <div className="input-with-icon">
                  <TextInput
                    label="Date Of Birth"
                    type="date"
                    onChange={(e) => setDate(e.target.value)}
                    defaultValue={props.info.date_of_birth}
                  />
                </div>
              </div>
            </div>
          </div>
          <hr />
          <Btn text="Submit" loading={loading} />
        </form>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Age);
