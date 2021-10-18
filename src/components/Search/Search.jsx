import React from "react";
import "./Search.css";
import Select from "react-select";
import Btn from "../Btn/Btn";
import { connect } from "react-redux";
import SearchForm from "./SearchForm";

function Search({ show, view }) {
    if (show) {
        return (
            <div
                className={`pt-1 pr-4 pr-0 w-100 animated animate__delay-0s
                ${show ? "show" : "hide"}
                `}
                id="search"
            >
                <div className="container-fluid">
                    <div className="row justify-content-end">
                        <div className="col-lg-10 col-md-11 col-sm-12 mb-4 p-2">
                            <div className="card border-gray shadow  p-2 rounded tab-content home1_adsrchfrm">
                                <SearchForm />
                                {/* <div className='card-body'>
                                    <h5>Search</h5>
                                    <Select
                                        options={view.categories.map((val) => {
                                            return {value: val.id, label: val.name.toUpperCase()}
                                        })}
                                    />
                                    <Btn
                                        text='Search'
                                        className='mt-3'
                                     />
                                </div> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    } else return null;
}

const mapStateToProps = (state) => ({
    view: state.view,
});

export default connect(mapStateToProps)(Search);
