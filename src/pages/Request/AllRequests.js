import axios from 'axios';
import React from 'react'
import { connect } from 'react-redux';
import EachRequest from '../../components/EachRequest/EachRequest'
import Sticky from 'react-sticky-el';
import { notification } from 'antd';
import { Spinner } from 'react-activity';
import Layout from '../../components/Layout/Layout'

const AllRequests = (props) => {

    const { view } = props;

    const [state, setState] = React.useState({
        list: [],
        selectedCategory: null,
        loading: true
    });


    React.useEffect(() => {
        if (!state.selectedCategory) {
            axios(process.env.REACT_APP_API_URL + '/property-requests/recent/100')
                .then(res => {
                    setState({ ...state, list: res.data, loading: false })
                })
                .catch(err => {
                    setState({ ...state, loading: false })
                    notification.error({ message: 'Error, Please try again' })
                })
        } else {
            setState({ ...state, loading: true, })
            axios(process.env.REACT_APP_API_URL + '/property-requests/?category=' + state.selectedCategory)
                .then(res => {
                    setState({ ...state, list: res.data, loading: false })
                })
                .catch(err => {
                    setState({ ...state, loading: false })
                    notification.error({ message: 'Error, Please try again' })
                })
        }
    }, [state.selectedCategory, state]);

    return (
        <Layout>
            <Sticky stickyStyle={{ zIndex: 100 }}>
                <div className='card shadow border w-100 pb-1'>
                    <span><b style={{ fontSize: '20px' }}>Filter:</b></span>
                    <div className='row'>
                    </div>
                    <div className="scrollmenu">
                        <div
                            onClick={() => setState({ ...state, selectedCategory: null })}
                            className={`nearby_place_rate good border mr-2 p-2 rounded ml-3 ${!state.selectedCategory ? 'bg-info' : ''} text-dark`}>
                            <b>All</b>
                        </div>
                        {
                            view.categories.map((val, i) => {
                                return <div
                                    onClick={() => setState({ ...state, selectedCategory: val.id })}
                                    key={i}
                                    className={`nearby_place_rate good border mr-2 p-2 rounded ml-3 link ${state.selectedCategory === val.id ? 'bg-info' : ''} text-dark`}>
                                    <b>{val.name}</b>
                                </div>
                            })
                        }
                    </div>
                </div>
            </Sticky>
            <section>
                <div className='container-fluid'>
                    <div className="row">
                        <div className="col-lg-12 col-md-12">
                            <div className="sec-heading center">
                                <h1>All Requests</h1>
                                {/* <p>Find new & featured property for you.</p> */}
                            </div>
                        </div>
                    </div>
                    <hr />
                </div>
                <div className="format-standard">

                    {
                        state.loading ? <div className='text-center pt-3'>
                            <Spinner />
                        </div>
                            :
                            <div className="comment-area">
                                <div className="all-comments">
                                    <div className="comment-list container-fluid ">
                                        <div className='row justify-content-center'>
                                            {
                                                state.list.length === 0 ? <h5>No Request Found</h5> :
                                                    <>
                                                        {
                                                            state.list.map((val, i) => {
                                                                return <div className='col-lg-3 col-md-4 col-sm-4'>
                                                                    <EachRequest key={i} data={val} />
                                                                </div>
                                                            })
                                                        }
                                                    </>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                    }


                </div>
            </section>
        </Layout>
    )
}

const mapStateToProps = (state) => ({
    view: state.view
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(AllRequests)
