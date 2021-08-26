import React from "react";

export default function SocialImagePreview() {
  return (
    <div
      className="strp-window strp-horizontal strp-side-right strp-window-skin-strip strp-measured"
      style={{
        width: "60%",
        background: "rgb(2 5 3 / 77%)",
        boxShadow: "0 8px 32px 0 rgba( 31, 38, 135, 0.37 )",
        backdropFilter: "blur( 14.5px )",
        border: "1px solid rgba( 255, 255, 255, 0.18 )",
      }}
    >
      <div className="p-2 bg-info">
        <i className="fa fa-close display-5 text-dark"></i>
      </div>
      <div
        className="d-flex justify-content-center h-100"
        style={{ alignContent: "center" }}
      >
        <img
          style={{ alignSelf: "center" }}
          src="https://i.pinimg.com/originals/1e/d8/c6/1ed8c69bc8eea2570d8d712fc2ff3c84.jpg"
        />
      </div>
    </div>
  );
}
