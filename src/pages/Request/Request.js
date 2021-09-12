import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import MetaTags from 'react-meta-tags';
import SelectionCard from '../../components/SelectionCard/SelectionCard';
import Btn from '../../components/Btn/Btn';
import Layout from '../../components/Layout/Layout'
import LinkSelectCard from '../../components/LinkSelectCard/LinkSelectCard';

export const Request = (props) => {
    localStorage.setItem('after_login', '/requests');
    return (
        <Layout
            back
        >
            <MetaTags>
                <title>Requests | Sheruta NG</title>
                <meta name="description" content={"Make apartment requests so everyone can see it"} />
                <meta property="og:title" content={'Requests | Sheruta NG'} />
                <meta property="og:description" content={'Make apartment requests so everyone can see it'} />
            </MetaTags>
            <div className='container bg-white pt-5 pb-5 mt-4 rounded shadow border'>
                <div className='text-center'>
                    <h2><b className='text-muted'>Requests Page</b></h2>
                </div>
                <hr />
                <div className='container-fluid'>
                    <div className='row justify-content-center'>
                        <div className="col-md-4 col-sm-12">
                            <LinkSelectCard to="/requests/create" isSelected heading="Create A Requests" onSelect={() => { }} />
                        </div>
                        <div className="col-md-4 col-sm-12">
                            <LinkSelectCard to="/requests/all" isSelected heading="View All Requests" onSelect={() => { }} />
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )

}

const mapStateToProps = (state) => ({
    view: state.view,
    auth: state.auth
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(Request)
