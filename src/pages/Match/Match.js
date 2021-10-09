import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import MatchList from "./MatchList";
import { Tabs } from "antd";
import AcceptedMatchList from "./AcceptedMatchList";
import { useDispatch, useSelector } from "react-redux";
import { getAllSuggestionsByStatus } from "../../redux/strapi_actions/alice.actions";

const { TabPane } = Tabs;

export default function Match() {
    const dispatch = useDispatch();
    function callback(key) {
        dispatch(getAllSuggestionsByStatus("accepted"));
    }
    const { accepted_suggestions, user_suggestions } = useSelector(
        (state) => state.alice,
    );

    useEffect(() => {
        dispatch(getAllSuggestionsByStatus('accepted'))
    }, [user_suggestions]);
    return (
        <Layout page={"match"}>
            <div className="container mt-3">
                <Tabs defaultActiveKey="1" onChange={callback}>
                    <TabPane
                        tab={`Suggested (${user_suggestions.length})`}
                        key="1"
                    >
                        <MatchList list={user_suggestions} />
                    </TabPane>
                    <TabPane
                        tab={`Accepted (${accepted_suggestions.length})`}
                        key="2"
                    >
                        <AcceptedMatchList list={accepted_suggestions} />
                    </TabPane>
                </Tabs>
            </div>
        </Layout>
    );
}
