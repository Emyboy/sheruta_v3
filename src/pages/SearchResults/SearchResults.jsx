import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Spinner } from 'react-activity';
import axios from 'axios';
import HorizontalProductCard from '../../components/PropertyCard/HorizontalPropertyCard';
import { notification } from 'antd';
import Layout from '../../components/Layout/Layout';
// import SearchBox from '../pages/Home/SearchBox';

const SearchResults = (props) => {
    console.log('PARAMS ---', props.match.params)
    const [state, setState] = useState({
        loading: true,
        results: []
    })
    const { category, bedroom, location } = props.match.params;

    const getSearchResults = () => {
        axios(process.env.REACT_APP_API_URL + `/properties/search/${category}/${location}/${bedroom}`)
            .then(res => {
                console.log('search result ---', res)
                setState({
                    loading: false,
                    results: res.data
                })
            })
            .catch(err => {
                // notification.error({ message: 'Application Error' })
            })
    }

    useEffect(() => {
        getSearchResults();
    }, []);

    return (
        <Layout page='search'>
            <div>
                {/* <div className='bg-white border shadow'>
                <SearchBox />
            </div> */}
                <section className='pt-2'>

                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12 col-sm-12 list-layout">
                                <div className="row">
                                    <div className="col-lg-12 col-md-12">
                                        <div className="filter-fl">
                                            <h4>Results: <span className="theme-cl">{state.results.length}</span></h4>
                                            {/* <div className="btn-group custom-drop bg-white">
                                            <button type="button" className="btn btn-order-by-filt" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                <span>Short By</span><i className="ti-angle-down"></i>
                                            </button>
                                            <div className="dropdown-menu pull-right animated flipInX">
                                                <a href="#">Latest</a>
                                                <a href="#">Most View</a>
                                                <a href="#">Most Popular</a>
                                            </div>
                                        </div> */}
                                        </div>
                                    </div>

                                    {
                                        state.results.map((data, i) => {
                                            return <HorizontalProductCard val={data} key={i} />
                                        })
                                    }




                                </div>
                            </div>
                        </div>
                    </div>
                </section>

            </div>
        </Layout>
    )
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(SearchResults)
