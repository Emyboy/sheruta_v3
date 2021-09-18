import React from "react";
import "./IconBtn.css";
import { Button } from "antd";

export default function IconBtn({ onClick, icon, className, test_id }) {
  return (
    <Button
      className={`icon-btn btn border btn-sm ${className ? className : ""}`}
      shape="circle"
      onClick={onClick}
      data-cy={test_id}
    >
      <i className={`${icon} text-dark`}></i>
    </Button>
  );
}
