import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Form } from "react-bootstrap";
import Btn from "../../../components/Btn/Btn";
import axios from "axios";
import TextInput from "../../../components/TextInput/TextInput";

const Age = (props) => {
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
          age: getAge()
        },
      }
    )
      .then((res) => {
        console.log(res);
        setLoading(false);
        props.setStep(props.step+1)
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  function getAge() {
    const dateString = date || props.info.date_of_birth;
    if (dateString) {
      const yourYear = dateString.split("-")[0];
      return new Date().getFullYear() - yourYear;
    }
  };

  useEffect(() => {
    if(props.info) {
      setDate(props.info.date_of_birth)
    }
  },[props.info])

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
                    defaultValue={props.info.date_of_birth || date}
                  />
                </div>
                <TextInput
                  label="Age"
                  disabled={true}
                  defaultValue={getAge()}
                />
                {getAge() < 18 ? (
                  <div className="text-center">
                    <div className="alert alert-danger">
                      <span>You are bellow the age limit</span>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
          <hr />
          <Btn text="Submit" loading={loading} disabled={!date || !props.info || getAge() < 18} />
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
