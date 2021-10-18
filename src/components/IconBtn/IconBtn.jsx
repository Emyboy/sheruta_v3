import React from "react";
import "./IconBtn.css";
import { Button } from "antd";


export default function IconBtn({
    onClick,
    icon,
    className,
    test_id,
    iconComponent,
}) {
    return (
        <Button
            className={`icon-btn btn border-gray btn-sm ${
                className ? className : ""
            }`}
            shape="circle"
            onClick={onClick}
            data-cy={test_id}
        >
            <i>{iconComponent}</i>
        </Button>
    );
}
