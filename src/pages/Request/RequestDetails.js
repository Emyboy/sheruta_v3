import { notification } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import PageLoader from '../../components/PageLoader';
import MetaTags from 'react-meta-tags';
import Global from '../../Global';
import Layout from '../../components/Layout/Layout';
import PageNotFound from '../../pages/PageNotFound'
import { Link } from 'react-router-dom';

const RequestDetails = (props) => {
    const { uid } = props.match.params;
    const { auth } = props;

    const [state, setState] = useState({
        loading: true,
        notFound: false
    })
    const [request, setRequest] = useState(null);



    function makeJobSchema(request) {
        // const desc = stripHTML(job.description)
        return JSON.stringify({
            "@context": process.env.REACT_APP_SITE_URL,
            "@type": "Article",
            "mainEntityOfPage": {
                "@type": "WebPage",
                "@id": process.env.REACT_APP_SITE_URL + `/request/${request.uuid}/${request.users_permissions_user.id}`
            },
            "headline": request.heading,
            "description": request.body,
            "image": [
                request.users_permissions_user.avatar_url
            ],
            "datePublished": request.published_at,
            "dateModified": request.updated_at,
            "author": {
                "@type": "Person",
                "name": request.users_permissions_user.first_name + " " + request.users_permissions_user.last_name
            },
            "publisher": {
                "@type": "Organization",
                "name": "Sheruta NG",
                "logo": {
                    "@type": "ImageObject",
                    "url": Global.LOGO_URL
                }
            }
        })
    }

    useEffect(() => {
        setState({ ...state, loading: true })

        axios(process.env.REACT_APP_API_URL + "/property-requests/?uuid=" + uid)
            .then(res => {
                console.log('RES --------', res)
                if (res.data.length === 0) {
                    setState({ ...state, notFound: true, loading: false })
                } else {
                    setRequest(res.data[0])
                    setState({ ...state, loading: false })
                }
            })
            .catch(err => {
                // console.log('ERROR ------', err)
                setState({ ...state, loading: false })
                notification.error({ message: 'Error fetching reqeust data' })
            })
    }, [])

    if (state.loading) {
        return <PageLoader />
    } else if (state.notFound) {
        return <PageNotFound />
    } else {
        return (
            <Layout>
                <section className='pt-3'>
                    <MetaTags>
                        <title>Request | {request.heading}</title>
                        <meta name="description" content={request.body} />
                        <meta property="og:title" content={'Request | ' + request.heading} />
                        <meta property="og:description" content={request.body} />
                        <meta name="keywords" content={`${request.category ? request.category.name : null}, ${request.service ? request.service.name : null}`} />
                        <script type="application/ld+json">
                            {makeJobSchema(request)}
                        </script>
                    </MetaTags>
                    <div className='d-flex justify-content-center mt-5'>
                        <div className='col-lg-6 col-md-12 col-sm-12 col-12'>
                            <div className="pt-4 pl-3 pr-3 blog-details single-post-item format-standard shadow bg-dark" style={{ borderRadius: 10 }}>
                                <div className=''>
                                    {
                                        auth.user ?
                                            <a href={`tel:${request.users_permissions_user.phone_number}`}><i style={{ fontSize: '25px' }} className='fa fa-phone text-theme'></i></a> :
                                            <Link to={`/login`}><i style={{ fontSize: '25px' }} className='fa fa-phone text-theme'></i></Link>
                                    }
                                </div>
                                <div className="posts-author">
                                    {
                                        request.users_permissions_user ?
                                            <>
                                                <span className="img"><img className="img-fluid" src={request.users_permissions_user.avatar_url} alt="" /></span>
                                                <h3 className="pa-name text-white">{`${request.users_permissions_user.first_name} ${request.users_permissions_user.last_name}`}</h3>
                                            </> : null
                                    }
                                    <div className='d-flex justify-content-center border-0'>
                                        {request.category ? <div className='badge badge-warning shadow'>{request.category.name}</div> : null}
                                        {request.service ? <div className='badge badge-success shadow ml-2'>{request.service.name}</div> : null}
                                    </div>
                                    <div className='d-flex'>
                                        <span className='text-white'><b>Budget:</b></span>
                                        <span className='ml-2 text-white'>₦ {window.formatedPrice.format(request.budget)}</span>
                                    </div>
                                    <div className='d-flex'>
                                        <span className='text-white'><b>Location:</b></span>
                                        <span className='ml-2 text-white'>{request.location}</span>
                                    </div>
                                    <hr />
                                    {
                                        request.heading ?
                                            <h1 className='text-white' style={{ fontSize: '20px' }}><b>{request.heading}</b></h1> : null
                                    }
                                    <p className="pa-text text-white" style={{ textAlign: 'start' }}>{request.body}</p>
                                </div>

                            </div>
                        </div>
                    </div>
                </section>
            </Layout>
        )
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(RequestDetails)
