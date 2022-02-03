import React, { useState, useEffect } from 'react'
import { connect, useSelector } from 'react-redux'
import MetaTags from 'react-meta-tags';
// import Layout from '../../components/Layout/Layout'
import LinkSelectCard from '../../components/LinkSelectCard/LinkSelectCard';
const Layout = React.lazy(() => import('../../components/Layout/Layout'))

export const Request = (props) => {
    localStorage.setItem('after_login', '/requests');
    const { user } = useSelector(state => state.auth);
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
            <div className='container card pt-5 pb-5 rounded shadow border' style={{ marginTop: !user ? '20vh':'10vh'}}>
                <div className='text-center'>
                    <h1 className='fw-700'>Requests Page</h1>
                </div>
                <hr />
                <div className='container-fluid'>
                    <div className='row justify-content-center'>
                        <div className="col-md-4 col-sm-12">
                            <LinkSelectCard to="/requests/create" isSelected heading="Create A Requests" onSelect={() => { }} />
                        </div>
                        <div className="col-md-4 col-sm-12">
                            <LinkSelectCard to="/feeds" isSelected heading="View All Requests" onSelect={() => { }} />
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
