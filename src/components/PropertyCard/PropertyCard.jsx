import React, { useState } from "react";
import { Tag } from "antd";
import { Link } from "react-router-dom";

export default function PropertyCard({ data }) {
  const [state, setState] = useState({
    info: false,
  });

  return (
    <div className="col-lg-4 col-md-6 col-sm-12 mb-4 p-2">
      <div className="bg-white rounded border border-gray">
        <div
          className="card bg-white text-white"
          style={{ borderRadius: "14px" }}
        >
          <img
            src={data.image_urls[0]}
            height="250"
            className="card-img"
            alt="..."
            className="rounded"
          />
          <div className="card-img-overlay">
            {/* <h5 className="card-title bg-white">Card title</h5> */}
            <div className="row justify-content-between">
              {data.statu ? (
                <span
                  class="property-type bg-accent shadow pl-2 p-1 pr-2"
                  style={{ borderRadius: "5px" }}
                >
                  {data.statu.name.toUpperCase()}
                </span>
              ) : null}
              <button
                className="btn btn-sm bg-white shadow rounded"
                onClick={() => setState({ ...state, info: !state.info })}
              >
                <i className="ti-info text-dark"></i>
              </button>
            </div>
            <p
              className={`card-text text-shadow bg-accent rounded p-1 mt-1 ${
                state.info ? "show" : "hide"
              }`}
            >
              {data.description.length > 300
                ? data.description.slice(0, 300) + "..."
                : data.description}
            </p>
            {/* <p className={`card-text text-shadow ${state.info ? 'show' : 'hide'}`}>I don't even know what ill go here sef lol</p> */}
          </div>
        </div>
        <div className="container-fluid p-2 mt-2">
          <h2 className="mb-0" style={{ fontSize: "19px" }}>
            <Link
              className="text-dark"
              to={{
                pathname: `/property/${data.name}/${data.id}`,
                state: data,
              }}
            >
              {data.name}
            </Link>
          </h2>
          <div className="d-flex justify-content-between">
            <span style={{ fontSize: "18px" }}>
              <b>₦ {window.formatedPrice.format(data.price)}</b>/{" "}
              {data.payment_type ? data.payment_type.name : null}
            </span>
            {data.categorie ? (
              <span>
                <Tag color="green">{data.categorie.name.toUpperCase()}</Tag>
              </span>
            ) : null}
          </div>
          <div className="container-fluid">
            <div className="row justify-content-start">
              <div className="mr-3">
                <small>Sitting Room: </small>
                <span>
                  <b>{data.sittingroom}</b>
                </span>
              </div>
              <div className="mr-3">
                <small>Bedroom: </small>
                <span>
                  <b>{data.bedroom}</b>
                </span>
              </div>
              <div>
                <small>Toilet: </small>
                <span>
                  <b>{data.toilet}</b>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
