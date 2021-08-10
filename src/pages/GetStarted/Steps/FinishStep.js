import React from "react";
import { connect } from "react-redux";
import Btn from "../../../components/Btn/Btn";

const FinishStep = (props) => {
  return (
    <div className="container">
      <div className="text-center">
        <h2>Congratulations</h2>
        <h5>You are all done</h5>
        <img
          src="https://i.makeagif.com/media/4-13-2015/9Otr4j.gif"
          style={{ width: "200px" }}
        />
      </div>
      <hr />
      <div className="text-center">
        <Btn
          text="Finish"
          className="mb-4"
          onClick={() => {
            props.setStep(props.step + 1);
          }}
        />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(FinishStep);
