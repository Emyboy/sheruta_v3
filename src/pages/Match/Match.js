import React from "react";
import Layout from "../../components/Layout/Layout";
import EachMatchCard from "./EachMatchCard";
import { Carousel } from "react-bootstrap";
import styled from "styled-components";

const NavBtn = styled.button`
    background-color: white;
    color: black;
    padding-left: 8px;
    padding-right: 8px;
    border-radius: 5px;
    font-weight: bold;
    margin-top: 70vh;
`;

export default function Match() {
    return (
        <Layout page={'match'}>
            <div className="container pt-2 pb-5">
                <Carousel
                    indicators={false}
                    interval={10000}
                    className="pb-3 p-3"
                    nextIcon={
                        <NavBtn className="shadow border-gray">Next</NavBtn>
                    }
                    prevIcon={
                        <NavBtn className="shadow border-gray">Prev</NavBtn>
                    }
                >
                    <Carousel.Item>
                        <EachMatchCard />
                    </Carousel.Item>
                    <Carousel.Item>
                        <EachMatchCard />
                    </Carousel.Item>
                    <Carousel.Item>
                        <EachMatchCard />
                    </Carousel.Item>
                </Carousel>
            </div>
        </Layout>
    );
}
