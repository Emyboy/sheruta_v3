import axios from 'axios'
import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

const _state = JSON.parse(localStorage.getItem('state'));

const Eachval = ({
    val,
    auth
}) => {
    const [state, setState] = useState({
        length: false,
        confirmDelete: false,
    })

    const handleDelete = () => {
        setState({ ...state, loading: true })
        axios(process.env.REACT_APP_API_URL + '/property-requests/' + val.id, {
            method: 'DELETE',
            headers: {
                Authorization: 'Bearer ' + _state.auth.user.jwt
            },
        })
            .then(res => {
                setState({ ...state, loading: false })
            })
            .catch(err => {
                setState({ ...state, loading: false })
            })
    }

    return (
        <article
            className="w-100 border border-gray rounded"
            id={`request-${val.id}`}
        >
            {state.confirmDelete ? (
                <div className="m-2 single-comment bg-dark  card shadow p-4 text-center">
                    <h6 className="text-white">
                        Are you sure you want to delete?
                    </h6>
                    <div
                        className="btn-group"
                        style={{ alignSelf: "center" }}
                        role="group"
                        aria-label="Basic example"
                    >
                        <button
                            disabled={state.loading}
                            type="button"
                            className="btn btn-danger"
                            onClick={handleDelete}
                        >
                            {state.loading ? "Loading..." : "Delete"}
                        </button>
                        <button
                            disabled={state.loading}
                            type="button"
                            className="btn btn-info"
                            onClick={() =>
                                setState({ ...state, confirmDelete: false })
                            }
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            ) : (
                <article
                    className="m-2 single-comment bg-dark  card shadow"
                    style={{ borderRadius: "10px" }}
                >
                    <div className="comment-details p-2">
                        {/* <Link className='text-theme' to={`/request/${val.uuid}/${val.users_permissions_user.id}`}> */}
                        {val.users_permissions_user ? (
                            <div className="comment-meta row card-body pb-1 pt-1">
                                <div className="comment-author">
                                    <img
                                        style={{
                                            width: "50px",
                                            borderRadius: "50%",
                                        }}
                                        className="img-fluid mr-2"
                                        src={
                                            val.users_permissions_user
                                                .avatar_url
                                        }
                                        alt={
                                            val.users_permissions_user
                                                .first_name + " 's Avatar"
                                        }
                                        loading="lazy"
                                    />
                                </div>
                                <div className="comment-left-meta">
                                    <h4 className="author-name text-white mb-1">{`${val.users_permissions_user.first_name}`}</h4>
                                    <div className="comment-date text-white">
                                        {new Date(
                                            val.created_at,
                                        ).toDateString()}
                                    </div>
                                </div>
                            </div>
                        ) : null}
                        {/* </Link> */}
                        <div className="d-flex justify-content-start mt-2 ml-5">
                            {val.category ? (
                                <div className="badge badge-warning shadow">
                                    {val.category.name}
                                </div>
                            ) : null}
                            {val.service ? (
                                <div className="badge badge-success shadow ml-2">
                                    {val.service.name}
                                </div>
                            ) : null}
                        </div>
                        <hr className="mt-0" />
                        <Link
                            className="text-theme"
                            to={`/request/${val.uuid}/${val.users_permissions_user.id}`}
                        >
                            <h2 style={{ fontSize: 0, height: 0 }}>
                                {val.heading}
                            </h2>
                        </Link>
                        <div className="comment-text">
                            <p className="text-white mb-0">
                                {val.body.length > 90
                                    ? val.body.slice(0, 90) + "..."
                                    : val.body}
                            </p>
                        </div>
                        <hr className="text-gray mb-0 mt-2" />
                        <div className="d-flex">
                            <span className="text-white">
                                <b>Budget:</b>
                            </span>
                            <span className="ml-2 text-white">
                                ₦ {window.formatedPrice.format(val.budget)}
                            </span>
                        </div>
                        <div className="d-flex">
                            <span className="text-white">
                                <b>Location:</b>
                            </span>
                            <span className="ml-2 text-white">
                                {val.location}
                            </span>
                        </div>
                    </div>
                    <div className="card-footer d-flex justify-content-between">
                        <div>
                            <a
                                href={`tel:${val.users_permissions_user.phone_number}`}
                            >
                                <i className="fa fa-phone text-theme"></i>
                            </a>
                            {auth.user &&
                            auth.user.user.id ===
                                val.users_permissions_user.id ? (
                                <span>
                                    <i
                                        onClick={() =>
                                            setState({
                                                ...state,
                                                confirmDelete: true,
                                            })
                                        }
                                        className="fa fa-trash link text-theme ml-4"
                                    ></i>
                                </span>
                            ) : null}
                        </div>
                        <Link
                            className="text-theme"
                            to={`/request/${val.uuid}/${val.users_permissions_user.id}`}
                        >
                            View More Details
                        </Link>
                    </div>
                </article>
            )}
        </article>
    );
}

const mapStateToProps = (state) => ({
    auth: state.auth
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(Eachval)
