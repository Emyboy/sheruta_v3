import React, { useState } from "react";
import { connect } from "react-redux";
import { Slider } from "antd";
import Btn from "../../../components/Btn/Btn";
import axios from "axios";

export const AgeRange = (props) => {
  const [data, setData] = useState([18, 30]);
  const handleSubmit = () => {
    props.setStep(props.step + 1);
  };

  return (
    <div>
      <div className="sec-heading center mb-4">
        <h2 className="animated animate__bounceIn">
          What age range are you looking for?
        </h2>
        {/* <p>We will need to match you up with the gender of your choosing </p> */}
      </div>
      <div className="text-center">
        <h5>From</h5>
        <h5>
          <b className="display-7">{data[0]}</b>
        </h5>
        <h5>to</h5>
        <h5>
          <b className="display-7">{data[1]}</b>
        </h5>
      </div>
      <label>Slide This 👇🏽</label>
      <Slider
        trackStyle={{ color: "green" }}
        min={18}
        range
        defaultValue={data}
        onChange={(e) => setData(e)}
        //   onAfterChange={e => console.log(e)}
      />
      <hr />
      <Btn text="Continue" className="mb-3" onClick={handleSubmit} />
    </div>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(AgeRange);
