import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import MatchList from "./MatchList";
import { Tabs } from "antd";
import AcceptedMatchList from "./AcceptedMatchList";

const { TabPane } = Tabs;

function callback(key) {
    console.log(key);
};

export default function Match() {
    return (
        <Layout page={"match"}>
            <div className="container mt-3">
                <Tabs defaultActiveKey="1" onChange={callback}>
                    <TabPane tab="Suggested" key="1">
                        <MatchList />
                    </TabPane>
                    <TabPane tab="Accepted" key="2">
                        <AcceptedMatchList />
                    </TabPane>
                </Tabs>
            </div>
        </Layout>
    );
}
