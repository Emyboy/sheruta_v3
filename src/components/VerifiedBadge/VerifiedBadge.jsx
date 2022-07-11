import React from "react";
import { GoVerified } from "react-icons/go";
import img from './img/verified.png';
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
`;

export default function VerifiedBadge({ user, size, className, without_text, style, verified }) {
    return (
			<Wrapper
				size={size}
				className={className}
				is_verified={verified || user?.is_verified}
				style={style}
			>
				{user?.is_verified && <img src={img} alt="verified" style={{ width: `${size + 5}px`, height: `${size + 5}px` }} />}
				{without_text ? null : (
					<span>{user?.is_verified ? 'Verified' : 'Not Verified'}</span>
				)}
			</Wrapper>
		)
}
