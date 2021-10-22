import React from 'react';
import styled from 'styled-components';
import { FaPhone } from 'react-icons/fa';

const Wrapper = styled.a`
    border-radius: 20px;
    border: none;
    padding: 20px;
    padding-left: 30px;
    padding-right: 30px;
    display: flex;
    justify-content: center;
`;

export default function CallBtn({ phone_number}) {
    return <Wrapper href={`tel:${phone_number}`} className="main-btn bg-theme text-white">
        Call Me <FaPhone />
    </Wrapper>;
}
