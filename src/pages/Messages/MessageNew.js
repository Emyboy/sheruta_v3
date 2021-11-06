import React from "react";
import Layout from "../../components/Layout/Layout";
import { Spinner } from "react-activity";

export default function MessageNew() {
    return (
        <Layout>
            <section class="error-wrap mt-4">
                <div
                    class="container"
                    style={{ paddingTop: "10vh", height: "50vh" }}
                >
                    <div class="row justify-content-center">
                        <div class="col-lg-6 col-md-10 text-center">
                            <h4>Creating a conversation</h4>
                            <h6 className="mt-2">Please Wait...</h6>
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    );
}
