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
        disabledBtn: true,
        heading: 'How Can We Help You?',
        nextPage: null,
        done: false
    });

    const [display, setDisplay] = useState('query');
    const [selectedQuery, setSelectedQuery] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedService, setSelectedServices] = useState(null);

    useEffect(() => {
        if (selectedService) {
            setState({ ...state, disabledBtn: false, nextPage: 'category' });
        }
        
    }, [selectedService]);

    useEffect(() => {
        if (selectedCategory) {
            setState({ ...state, done: true })
        }
    },[selectedCategory])

    useEffect(() => {
        if (selectedQuery) {
            setState({ ...state, disabledBtn: false, nextPage: 'service' });
        }
    }, [selectedQuery]);

    useEffect(() => {
        switch (display) {
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
    }, [display])

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
            <div className='container bg-white pt-5 pb-5 mt-4 mb-5 rounded shadow border'>
                <div className='text-center'>
                    <h2><b className='text-muted'>{state.heading}</b></h2>
                </div>
                <hr />
                {
                    display === 'query' ? <div className='row justify-content-center'>
                        <SelectionCard
                            heading='I currently have'
                            subHeading="I have an available property for Share or For Rent etc"
                            onSelect={() => setSelectedQuery('have')}
                            isSelected={selectedQuery === 'have'}
                        />
                        <SelectionCard
                            heading="I am looking for"
                            subHeading="I'm looking for an available property for Share or For Rent etc"
                            onSelect={() => setSelectedQuery('search')}
                            isSelected={selectedQuery === 'search'}
                        />
                    </div> : null
                }
                {
                    display === 'service' ? <div className='row justify-content-center'>
                        {
                            view.services.map((val, i) => {
                                return <SelectionCard
                                    key={i}
                                    heading={val.name}
                                    isSelected={selectedService === val}
                                    onSelect={() => setSelectedServices(val)}
                                />
                            })
                        }
                    </div> : null
                }
                {
                    display === 'category' ? <div className='row justify-content-center'>
                        {
                            view.categories.map((val, i) => {
                                return <SelectionCard
                                    key={i}
                                    heading={val.name}
                                    isSelected={selectedCategory === val}
                                    onSelect={() => setSelectedCategory(val)}
                                />
                            })
                        }
                    </div> : null
                }
                <hr />
                {
                    state.done ? <Link to={
                        `/requests/create/${selectedService.id}/${selectedCategory.id}/${selectedQuery === "search"}`
                    }>
                        <Btn
                            text='Finish'
                            onClick={() => { }}
                        />
                    </Link> : <Btn
                        text='Next'
                        disabled={state.disabledBtn}
                        onClick={() => {
                            setState({ ...state, disabledBtn: true });
                            setDisplay(state.nextPage)
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
