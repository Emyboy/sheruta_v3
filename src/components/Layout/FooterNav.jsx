import { Badge } from "react-bootstrap";
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.div`
    .badge {
        position: fixed !important;
        bottom: 4em;
        z-index: 50;
    }
`;

const FooterNav = ({ text, icon, path, active, IconComponent, count }) => {
    return (
        <Wrapper className="mt-1">
            <div className="text-center">
                {count && count > 0 ? <Badge className="bg-danger ml-3">{count}</Badge> : null}
                <Link
                    className={`ml-4 mr-4  ${
                        active ? "text-theme" : "text-accent"
                    }`}
                    to={path}
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
