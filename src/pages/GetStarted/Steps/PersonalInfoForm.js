import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Btn from "../../../components/Btn/Btn";
import TextInput from "../../../components/TextInput/TextInput";
import { Accordion } from "react-bootstrap";
import { Form, InputGroup, FormControl } from "react-bootstrap";
import Select from "react-select";
import axios from "axios";
import { notification } from "antd";

const PersonalInfoForm = (props) => {
  const [info, setInfo] = useState(props.info);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    ...info,
    occupation: info.occupation,
    company_name: info.company_name,
    company_address: info.company_address,
    supervisor_name: info.supervisor_name,
    supervisor_number: info.supervisor_number,
    twitter: info.twitter,
    facebook: info.facebook,
    linkedin: info.linkedin,
    instagram: info.instagram,
    religion: info.religion,
    marital_status: info.marital_status,
    nin: info.nin,
    temperament: info.temperament,
    phone_number: info.phone_number,
    next_of_kin_address: info.next_of_kin_address,
    next_of_kin_name: info.next_of_kin_name,
    next_of_kin_phone: info.next_of_kin_phone,
    users_permissions_user: props.auth.user.user.id,
  });

  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    axios(
      process.env.REACT_APP_API_URL +
        "/personal-infos" +
        `${props.info ? "/" + info.id : ""}`,
      {
        headers: {
          Authorization: `Bearer ${props.auth.user.jwt}`,
        },
        method: props.info ? "PUT" : "POST",
        data,
      }
    )
      .then((res) => {
        setLoading(false);
        props.setStep(props.step + 1);
      })
      .catch((err) => {
        setLoading(false);
        notification.error({ message: "Error updating personal info" });
      });
  };

  useEffect(() => {
    setInfo(props.info);
  }, [props.info]);
  console.log("PROPS ---", props);
  return (
    <form onSubmit={handleSubmit}>
      <div className="text-center">
        <h4>Work Information</h4>
      </div>
      <div className="row">
        <div className="col-lg-6 col-md-6">
          <div className="form-group">
            <div className="input-with-icon">
              <TextInput
                label="Occupation"
                placeholder="EX. Doctor"
                name="occupation"
                required
                defaultValue={info.occupation}
                onChange={(e) =>
                  setData({ ...data, occupation: e.target.value })
                }
              />
            </div>
          </div>
        </div>
        <div className="col-lg-6 col-md-6">
          <div className="form-group">
            <div className="input-with-icon">
              <TextInput
                label="Company Name"
                placeholder="EX. Shell"
                name="company_name"
                required
                defaultValue={info.company_name}
                onChange={(e) =>
                  setData({ ...data, company_name: e.target.value })
                }
              />
            </div>
          </div>
        </div>

        <div className="col-lg-6 col-md-6">
          <div className="form-group">
            <div className="input-with-icon">
              <TextInput
                label="Company Address"
                placeholder="EX. No 1 Jane Doe Street"
                name="company_address"
                required
                defaultValue={info.company_address}
                onChange={(e) =>
                  setData({ ...data, company_address: e.target.value })
                }
              />
            </div>
          </div>
        </div>

        <div className="col-lg-6 col-md-6">
          <div className="form-group">
            <div className="input-with-icon">
              <TextInput
                label="Supervisor's Name"
                placeholder="EX. John Doe"
                name="supervisor_name"
                defaultValue={info.supervisor_name}
                required
                onChange={(e) =>
                  setData({ ...data, supervisor_name: e.target.value })
                }
              />
            </div>
          </div>
        </div>

        <div className="col-lg-6 col-md-6">
          <div className="form-group">
            <div className="input-with-icon">
              <TextInput
                label="Supervisor Phone Number"
                placeholder="Ex. 08081234567"
                name="phone"
                defaultValue={info.supervisor_number}
                required
                onChange={(e) =>
                  setData({ ...data, supervisor_number: e.target.value })
                }
              />
            </div>
          </div>
        </div>

        <div className="col-lg-6 col-md-6">
          <div className="form-group">
            <div className="input-with-icon">
              <Form.Label>
                <b className="text-muted">Religion</b>
              </Form.Label>{" "}
              <span className="text-danger">Required *</span>
              <Select
                className="mt-2"
                options={[
                  { value: "christian", label: "Christian" },
                  { value: "muslim", label: "Muslim" },
                  { value: "others", label: "Others" },
                ]}
                onChange={(e) => setData({ ...data, religion: e.value })}
              />
            </div>
          </div>
        </div>
      </div>
      <hr />
      <div className="text-center">
        <h4>Social Information</h4>
      </div>
      <div className="row">
        <div className="col-lg-6 col-md-6">
          <div className="form-group">
            <div className="input-with-icon">
              <Form.Label htmlFor="basic-url">Facebook Username</Form.Label>
              <InputGroup className="mb-3">
                <InputGroup.Text
                  id="basic-addon3"
                  className="mt-3"
                  style={{ fontWeight: "bold" }}
                >
                  https://www.facebook.com/
                </InputGroup.Text>
                <FormControl
                  id="basic-url"
                  aria-describedby="basic-addon3"
                  className="pl-1"
                />
              </InputGroup>
            </div>
          </div>
        </div>
        <div className="col-lg-6 col-md-6">
          <div className="form-group">
            <div className="input-with-icon">
              <Form.Label htmlFor="basic-url">Instagram Username</Form.Label>
              <InputGroup className="mb-3">
                <InputGroup.Text
                  id="basic-addon3"
                  className="mt-3"
                  style={{ fontWeight: "bold" }}
                >
                  https://www.instagram.com/
                </InputGroup.Text>
                <FormControl
                  id="basic-url"
                  aria-describedby="basic-addon3"
                  className="pl-1"
                />
              </InputGroup>
            </div>
          </div>
        </div>

        <div className="col-lg-6 col-md-6">
          <div className="form-group">
            <div className="input-with-icon">
              <Form.Label htmlFor="basic-url">Twitter Username</Form.Label>
              <InputGroup className="mb-3">
                <InputGroup.Text
                  id="basic-addon3"
                  className="mt-3"
                  style={{ fontWeight: "bold" }}
                >
                  https://www.twitter.com/
                </InputGroup.Text>
                <FormControl
                  id="basic-url"
                  aria-describedby="basic-addon3"
                  className="pl-1"
                />
              </InputGroup>
            </div>
          </div>
        </div>

        <div className="col-lg-6 col-md-6">
          <div className="form-group">
            <div className="input-with-icon">
              <TextInput
                label="Linkedin URL"
                placeholder="EX. linkedin.com/in/sheruta"
                defaultValue={info.supervisor_name}
                onChange={(e) => {}}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="form-group text-center">
        {/* <button type="submit" className="btn btn-md full-width pop-login">Sign Up</button> */}
        <Btn text="Submit" className="w-50" type="submit" loading={loading} />
      </div>
    </form>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(PersonalInfoForm);
