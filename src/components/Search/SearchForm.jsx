import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import { Select, Spin } from 'antd';
import debounce from 'lodash/debounce';

import Select from 'react-select';
import { Redirect } from 'react-router';
import { notification } from 'antd';
import { Link } from 'react-router-dom';
import Btn from '../Btn/Btn';

export default function SearchBox() {
    const [state, setState] = useState({
        categories: [],
        services: [],
        showSearchResults: false
    });

    const [data, setData] = useState({
        places: [],
        selectedCategory: null,
        selectedBedroom: null,
        selectedKeyword: null
    });

    const getAllCategories = () => {
        axios(process.env.REACT_APP_API_URL + '/categories')
            .then(res => {
                setState({ ...state, categories: res.data })
            })
            .catch(err => {
            })
    }

    const getAllServices = () => {
        axios(process.env.REACT_APP_API_URL + '/services')
            .then(res => {
                setState({ ...state, services: res.data })
            })
            .catch(err => {
            })
    }

    useEffect(() => {
        if (state.categories.length === 0) {
            getAllCategories();
        }
        if (state.services.length === 0) {
            getAllServices();
        }
    }, [state])

    const searchAvailableLocatioins = (keyword) => {
        if (!keyword) {
            setData({
                ...data,
                places: [],
            })
        }
        axios(process.env.REACT_APP_API_URL + '/properties/search/keyword' + keyword)
            .then(res => {
                setData({
                    ...data,
                    places: res.data.rows
                })
            })
            .catch(err => {
            })
    }

    const handleSearch = () => {
        notification.error({ message: 'Feature Coming soon' })
        if (data.selectedKeyword) {
            setState({ ...state, showSearchResults: true })
        } else
            notification.error({ error: 'Please provide a location' })
    }

    const searchURL = () => {
        return `/search/${data.selectedCategory.value}/${data.selectedKeyword}/${data.selectedBedroom.value}`
    }


    useEffect(() => {
        if (data.selectedKeyword || data.selectedCategory || data.selectedBedroom) {
            setState({ ...state, showSearchResults: true })
        }
    }, [data])

    return (

        <div className="full-search-2 eclip-search italian-search hero-search-radius">
            <div className="hero-search-content">

                <div className="row">

                    <div className="col-lg-4 col-md-4 col-sm-12 small-padd">
                        <div className="form-group">
                            <div className="input-with-icon">
                                <input type="text" name='location' className="form-control b-r" placeholder="Location Eg. Lekki, Isolo" onChange={e => {
                                    setData({ ...data, selectedKeyword: e.target.value })
                                }} />
                                <i className="fa fa-map"></i>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-3 col-md-4 col-sm-12 small-padd">
                        <div className="form-group">
                            <div className="input-with-icon search-input">

                                <select style={{ height: '50px' }} className="form-control " onChange={e => setData({ ...data, selectedBedroom: e.target.value })} >
                                    <option value="" data-select2-id="4">Bedroom</option>
                                    {
                                        [1, 2, 3, 4, 5].map(val => {
                                            return <option value={val} key={val.id}>{val}</option>
                                        })
                                    }
                                </select>
                                <i className="fa fa-bath"></i>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-4 col-sm-12 small-padd">
                        <div className="form-group">
                            <div className="input-with-icon search-input">

                                <select style={{ height: '50px' }} className="form-control " onChange={e => setData({ ...data, selectedCategory: e.target.value })} >
                                    <option value="" data-select2-id="4">Type</option>
                                    {
                                        state.categories.map(val => {
                                            return <option value={val.id} key={val.id}>{val.name}</option>
                                        })
                                    }
                                </select>
                                <i className="fa fa-home"></i>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-2 col-md-2 col-sm-12 small-padd">
                        <div className="form-group">
                            {
                                state.showSearchResults ? <a href={`/search/${data.selectedCategory}/${data.selectedKeyword}/${data.selectedBedroom}`} className="btn btn-thm">Search</a> :
                                    // <button disabled className="btn search-btn btn-thm">Search</button>
                                    <Btn text="Search" onClick={() => {}} disabled/>
                            }
                        </div>
                    </div>

                </div>

            </div>
        </div>


    )
}
