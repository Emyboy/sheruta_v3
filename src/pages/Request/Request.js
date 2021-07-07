import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import MetaTags from 'react-meta-tags';
import SelectionCard from '../../components/SelectionCard/SelectionCard';
import Btn from '../../components/Btn/Btn';
import Layout from '../../components/Layout/Layout'

export const Request = (props) => {
    localStorage.setItem('after_login', '/requests');

    const { view } = props;

    const [state, setState] = useState({
        selectedQuery: null,
        disabledBtn: true,
        selectedCategory: null,
        selectedService: null,
        display: 'query',
        heading: 'How Can We Help You?',
        nextPage: null,
        done: false
    });

    useEffect(() => {
        switch (state.display) {
            case 'query':
                setState({ ...state, heading: 'How Can We Help You?' })
                break;
            case 'service':
                setState({ ...state, heading: 'What type of service?' })
                break;
            case 'category':
                setState({ ...state, heading: 'What type of property?' })
                break;

            default:
                break;
        }
    }, [state.display, state]);

    useEffect(() => {
        if (state.selectedQuery) {
            setState({ ...state, disabledBtn: false, nextPage: 'service' });
        }
        if (state.selectedService) {
            setState({ ...state, disabledBtn: false, nextPage: 'category' });
        }
    }, [state.selectedQuery, state.selectedService, state.selectedCategory, state])

    useEffect(() => {
        if (state.selectedCategory) {
            setState({ ...state, done: true })
        }
    }, [state.selectedCategory, state]);

    return (
        <Layout>
            <MetaTags>
                <title>Requests | Sheruta NG</title>
                <meta name="description" content={"Make apartment requests so everyone can see it"} />
                <meta property="og:title" content={'Requests | Sheruta NG'} />
                <meta property="og:description" content={'Make apartment requests so everyone can see it'} />
            </MetaTags>
            <div className='container bg-white pt-5 pb-5 mt-4 mb-5 rounded shadow border'>
                <div className='text-center'>
                    <h2><b className='text-muted'>{state.heading}</b></h2>
                </div>
                <hr />
                {
                    state.display === 'query' ? <div className='row justify-content-center'>
                        <SelectionCard
                            heading='I currently have'
                            subHeading="I have an available property for Share or For Rent etc"
                            onSelect={() => setState({ ...state, selectedQuery: 'have' })}
                            isSelected={state.selectedQuery === 'have'}
                        />
                        <SelectionCard
                            heading="I am looking for"
                            subHeading="I'm looking for an available property for Share or For Rent etc"
                            onSelect={() => setState({ ...state, selectedQuery: 'search' })}
                            isSelected={state.selectedQuery === 'search'}
                        />
                    </div> : null
                }
                {
                    state.display === 'service' ? <div className='row justify-content-center'>
                        {
                            view.services.map((val, i) => {
                                return <SelectionCard
                                    key={i}
                                    heading={val.name}
                                    isSelected={state.selectedService === val}
                                    onSelect={() => setState({ ...state, selectedService: val })}
                                />
                            })
                        }
                    </div> : null
                }
                {
                    state.display === 'category' ? <div className='row justify-content-center'>
                        {
                            view.categories.map((val, i) => {
                                return <SelectionCard
                                    key={i}
                                    heading={val.name}
                                    isSelected={state.selectedCategory === val}
                                    onSelect={() => setState({ ...state, selectedCategory: val })}
                                />
                            })
                        }
                    </div> : null
                }
                <hr />
                {
                    state.done ? <Link to={
                        `/requests/create/${state.selectedService.id}/${state.selectedCategory.id}/${state.selectedQuery === "search"}`
                    }>
                        <Btn
                            text='Finish'
                            onClick={() => { }}
                        />
                    </Link> : <Btn
                        text='Next'
                        disabled={state.disabledBtn}
                        onClick={() => {
                            setState({ ...state, display: state.nextPage, disabledBtn: true });
                        }}
                    />
                }
                
                {/* <Link to='/requests/create'>
                    <div className='border text-center rounded mt-3 agency agency-list'>
                        <div className='card-body'>
                            <h5>Create Request</h5>
                        </div>
                    </div>
                </Link>
                <Link to='/requests/all'>
                    <div className='border text-center rounded mt-3 agency agency-list'>
                        <div className='card-body'>
                            <h5>View All Requests</h5>
                        </div>
                    </div>
                </Link> */}
            </div>
        </Layout>
    )
}

const mapStateToProps = (state) => ({
    view: state.view
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(Request)
