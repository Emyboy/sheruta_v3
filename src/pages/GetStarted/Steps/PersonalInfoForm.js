import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Btn from "../../../components/Btn/Btn";
import TextInput from "../../../components/TextInput/TextInput";
import { Accordion } from "react-bootstrap";
import { Form, InputGroup, FormControl } from 'react-bootstrap';

const PersonalInfoForm = (props) => {
  const [info, setInfo] = useState(props.info);

    const handleSubmit = e => {
        e.preventDefault();
        console.log(info);
    }

  useEffect(() => {
    setInfo(props.info);
  }, [props.info]);

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
                required
                defaultValue={info.occupation}
                onChange={(e) => {}}
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
                required
                defaultValue={info.company_name}
                onChange={(e) => {}}
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
                required
                defaultValue={info.company_address}
                onChange={(e) => {}}
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
                defaultValue={info.supervisor_name}
                required
                onChange={(e) => {}}
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
                required
                type="number"
                onChange={(e) => {}}
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
                defaultValue={info.supervisor_number}
                required
                onChange={(e) => {}}
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
        <Btn text="Submit" className="w-50" type="submit" />
      </div>
    </form>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(PersonalInfoForm);
