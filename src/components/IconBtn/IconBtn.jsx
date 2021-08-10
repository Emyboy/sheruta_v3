import React from "react";
import "./IconBtn.css";
import { Button } from "antd";

export default function IconBtn({ onClick, icon, className }) {
  return (
    <Button
      className={`icon-btn btn border btn-sm ${className ? className : ""}`}
      shape="circle"
      onClick={onClick}
    >
      <i className={`${icon} text-dark`}></i>
    </Button>
  );
}
