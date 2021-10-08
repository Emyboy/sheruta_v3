import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import EachMatchCard from "./EachMatchCard";
import { Carousel } from "react-bootstrap";
import styled from "styled-components";
import Alice from "../../utils/Alice";
import { useDispatch, useSelector } from "react-redux";
import { getAllMySuggestion } from "../../redux/strapi_actions/alice.actions";

const NavBtn = styled.button`
    background-color: white;
    color: black;
    padding-left: 8px;
    padding-right: 8px;
    border-radius: 5px;
    font-weight: bold;
    margin-top: 20vh;
`;

export default function Match() {
    const [list, setList] = useState([]);
    const { user_suggestions } = useSelector((state) => state.alice);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllMySuggestion());
    }, []);
    return (
        <Layout page={"match"}>
            <div className="container pt-2 pb-5">
                <Carousel
                    indicators={false}
                    interval={40000}
                    className="pb-3 p-3"
                    nextIcon={
                        <NavBtn className="shadow border-gray">Next</NavBtn>
                    }
                    prevIcon={
                        <NavBtn className="shadow border-gray">Prev</NavBtn>
                    }
                >
                    {user_suggestions.map((val, i) => {
                        return (
                            <Carousel.Item key={i}>
                                <EachMatchCard data={val} />
                            </Carousel.Item>
                        );
                    })}
                </Carousel>
            </div>
        </Layout>
    );
}
