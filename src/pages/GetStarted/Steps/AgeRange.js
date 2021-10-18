import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { notification, Slider } from "antd";
import Btn from "../../../components/Btn/Btn";
import axios from "axios";
import Cookies from "js-cookie";

export const AgeRange = (props) => {
  const looking_for_age_range = props.info.looking_for_age_range;
  const [data, setData] = useState([18, 30]);
  const [loading, setLoading] = useState(false);
  const handleSubmit = () => {
    setLoading(true);
    axios(process.env.REACT_APP_API_URL + "/personal-infos/" + props.info.id, {
      method: "PUT",
      headers: {
                Authorization: `Bearer ${Cookies.get("token")}`,
            },
      data: {
        looking_for_age_range: `${data[0]}-${data[1]}`,
      },
    })
      .then((res) => {
        setLoading(false);
        props.setStep(props.step + 1);
      })
      .catch((err) => {
        setLoading(false);
        notification.error({ message: "Error, please try again" });
      });
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
        <h2>
          <b className="display-7">{data[0]}</b>
        </h2>
        <h5>to</h5>
        <h2>
          <b className="display-7">{data[1]}</b>
        </h2>
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
      <Btn
        text="Continue"
        className="mb-3"
        onClick={handleSubmit}
        loading={loading}
      />
    </div>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(AgeRange);
