import React from "react";
import { GoVerified } from "react-icons/go";
import { IoClose } from "react-icons/io5";
import styled from "styled-components";

const Wrapper = styled.span`
    font-size: ${(p) => (p.size ? `${p.size}px` : "20px")};
    display: flex;
    justify-content: flex-start;
    align-self: center;
    color: ${p => p.is_verified ? "#00ba74": "gray"};
    span {
        margin-left: 5px;
        font-size: 11px;
        align-self: center;
    }
    svg {
        margin: 0 !important;
        align-self: center;
    }
`;

export default function VerifiedBadge({ user, size, className, without_text }) {
    return (
        <Wrapper
            size={size}
            className={className}
            is_verified={user?.is_verified}
        >
            {user?.is_verified ? <GoVerified /> : <IoClose />}{" "}
            {without_text ? null :
            <span>{user?.is_verified ? "Verified" : "Not Verified"}</span>
            }
        </Wrapper>
    );
}
