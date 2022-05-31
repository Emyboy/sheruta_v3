import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import axios from 'axios'
import PageNotFound from '../PageNotFound'
import PageLoader from '../../components/PageLoader'
import styled from 'styled-components'
import renderHTML from 'react-render-html'
import moment from 'moment'
import { useSelector } from 'react-redux'

const Body = styled.div`
	a {
		color: #00ba74;
		font-weight: bold;
	}
	img {
		border-radius: 10px;
		width: 100%;
	}
	p,
	li,
	pre {
		font-size: 19px;
	}
	h1,
	h2,
	h3,
	h4,
	h5,
	h6 {
		font-weight: 700 !important;
	}
	h3,
	h4,
	h2 {
		font-size: 25px;
	}
`

export default function BlogDetails(props) {
	const { id } = props.match.params
	const [data, setData] = useState(null)
	const [notFound, setNotFound] = useState(false)
	const { user } = useSelector((state) => state.auth)

	useEffect(() => {
		axios(process.env.REACT_APP_API_URL + `/blogs/?id=${id}`)
			.then((res) => {
				if (res.data.length === 0) {
					setNotFound(true)
					return
				}
				setData(res.data[0])
			})
			.catch((err) => {
				setNotFound(true)
			})
	}, [])

	if (notFound) {
		return <PageNotFound />
	}
	if (data) {
		console.log(data)
		return (
			<Layout>
				<div
					className="container"
					style={{
						paddingTop: user ? '' : '15vh',
						paddingBottom: user ? '' : '15vh',
					}}
				>
					<div className="card w-100 shadow-xss rounded-xxl border-0 p-4 mb-0">
						<div className="card-body p-0 d-flex">
							<figure className="avatar me-3">
								<img
									src={data?.author?.avatar_url}
									alt="image"
									className="shadow-sm rounded-circle w45"
								/>
							</figure>
							<h4 className="fw-700 text-grey-900 font-xssss mt-1">
								{data?.author?.first_name} {data?.author?.last_name}
								<span className="d-block font-xssss fw-500 mt-1 lh-3 text-grey-500">
									{moment(data?.created_at).fromNow()}
								</span>
							</h4>
						</div>
						<div className="card-body d-block p-0 mb-3">
							<div className="row ps-2 pe-2">
								<div className="col-sm-12 p-1">
									<img
										src={data?.image_url}
										className="rounded-3 w-100"
										alt="image"
										style={{ borderRadius: '10px' }}
									/>
								</div>
							</div>
						</div>
						<h1 className="fw-bold font-xxl">{data?.title}</h1>
						<div className="card-body p-0 me-lg-5">
							<Body className="fw-500 text-grey-500 lh-26 font-xssss w-100 mb-2">
								{renderHTML(data?.body)}
							</Body>
						</div>

						<div className="card-body d-flex p-0">
							{/* <a
							href="#"
							className="emoji-bttn d-flex align-items-center fw-600 text-grey-900 text-dark lh-26 font-xssss me-2"
						>
							<i className="feather-thumbs-up text-white bg-primary-gradiant me-1 btn-round-xs font-xss"></i>{' '}
							<i className="feather-heart text-white bg-red-gradiant me-2 btn-round-xs font-xss"></i>
							2.8K Like
						</a>
						
						<a
							href="#"
							className="d-flex align-items-center fw-600 text-grey-900 text-dark lh-26 font-xssss"
						>
							<i className="feather-message-circle text-dark text-grey-900 btn-round-sm font-lg"></i>
							<span className="d-none-xss">22 Comment</span>
						</a> */}

							{/* <a
							href="#"
							className="ms-auto d-flex align-items-center fw-600 text-grey-900 text-dark lh-26 font-xssss"
						>
							<i className="feather-share-2 text-grey-900 text-dark btn-round-sm font-lg"></i>
							<span className="d-none-xs">Share</span>
						</a> */}
						</div>
					</div>
				</div>
			</Layout>
		)
	} else {
		return <PageLoader />
	}
}
