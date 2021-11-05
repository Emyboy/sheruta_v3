import { Badge } from "react-bootstrap";
import React from "react";
import { Link } from "react-router-dom";
import Global from "../../Global";
import styled from "styled-components";

const Wrapper = styled.div`
    .badge {
        position: fixed !important;
        bottom: 4em;
        z-index: 50;
    }
`;

const spacing = Global.isMobile ? "15px" : "25px";

const FooterNav = ({ text, icon, path, active, IconComponent, count }) => {
    return (
        <Wrapper className="mt-1">
            <div className="text-center">
                {count && count > 0 ? (
                    <Badge className="bg-danger" style={{ marginLeft: "40px" }}>
                        {count}
                    </Badge>
                ) : null}
                <Link
                    className={`  ${active ? "text-theme" : "text-accent"}`}
                    to={path}
                    style={{ marginLeft: spacing, marginRight: spacing }}
                >
                    {IconComponent ? (
                        IconComponent
                    ) : (
                        <i style={{ fontSize: "22px" }} className={icon}></i>
                    )}
                </Link>
                <br />
                <small className={`${active ? "text-theme" : "text-accent"}`}>
                    {text}
                </small>
            </div>
        </Wrapper>
    );
};

export default FooterNav;
