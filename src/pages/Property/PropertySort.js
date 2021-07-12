import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import Layout from '../../components/Layout/Layout';
import HorizontalProductCard from '../../components/PropertyCard/HorizontalPropertyCard';
import HorizontalProductCardSM from '../../components/PropertyCard/PropertyCardSM';
import Global from '../../Global';

const All = (props) => {

    const [state, setState] = useState({
        properties: []
    });

    useEffect(() => {
        axios(process.env.REACT_APP_API_URL + '/properties')
            .then(res => {
                setState({ ...state, properties: res.data })
            })
            .catch(err => {
            })
    }, []);
    return (
        <Layout>
            {/* <Sticky stickyStyle={{ zIndex: 100 }}>
                <nav className="shadow p-2 bg-white" >
                    <h4>Hi there</h4>
                </nav>
            </Sticky> */}

            <section>
                {

                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12 col-sm-12 list-layout">
                                <div className="row">
                                    {
                                        state.properties.map((data, i) => {
                                            return Global.isMobile ? <HorizontalProductCardSM val={data} key={i} />: <HorizontalProductCard val={data} key={i} />
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                    </div>

                }
            </section>

        </Layout>
    )
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(All)
