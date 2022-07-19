import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import axios from 'axios'
import PageNotFound from '../PageNotFound'
import PageLoader from '../../components/PageLoader'
import styled from 'styled-components'
import renderHTML from 'react-render-html'
import moment from 'moment'
import { useSelector } from 'react-redux'
import BlogRight from './BlogRight'
import Sticky from 'react-sticky-el'
import Global from '../../Global'
import { Link } from 'react-router-dom'

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
	}, [id])

	if (notFound) {
		return <PageNotFound />
	}
	if (data) {
		return (
			<Layout>
				<div
					className="container"
					style={{
						paddingTop: user ? '' : '15vh',
						paddingBottom: user ? '' : '15vh',
					}}
				>
					<div className="row">
						<div className="col-lg-8 col-md-12">
							<div className="blog-details-desc bg-white ">
								<div className="article-content">
									<div class="article-image">
										<img src={data?.image_url} className="w-100" alt="image" />
									</div>
									<ul class="entry-meta">
										<li>
											<img src={data?.author?.avatar_url} alt="image" />
											<Link to={`/user/${data?.author?.username}`}>
												<h4 className="fw-bold ml-2l">
													{data?.author?.first_name} {data?.author?.last_name}
												</h4>
											</Link>
										</li>
										<li>
											<i class="bx bx-calendar"></i>
											{moment(data?.created_at).fromNow()}
										</li>
									</ul>
									<h3>{data?.title}</h3>
									<>{renderHTML(data?.body)}</>
									<div class="article-footer">
										<div class="article-tags">
											<h3>Related Tags</h3>

											<ul class="tags">
												{data?.sub_categories?.map((val, i) => {
													return (
														<li key={`sub-cat-${i}`}>
															<a className='ml-1'>{val?.name}</a>
														</li>
													)
												})}
												
											</ul>
										</div>

										{/* <div class="article-share">
											<h3>Social Share</h3>

											<ul class="social">
												<li>
													<a href="https://www.facebook.com/" target="_blank">
														<i class="bx bxl-facebook"></i>
													</a>
												</li>
												<li>
													<a
														href="https://twitter.com/?lang=en"
														target="_blank"
													>
														<i class="bx bxl-twitter"></i>
													</a>
												</li>
												<li>
													<a href="https://www.instagram.com/" target="_blank">
														<i class="bx bxl-instagram"></i>
													</a>
												</li>
												<li>
													<a href="https://www.pinterest.com/" target="_blank">
														<i class="bx bxl-pinterest-alt"></i>
													</a>
												</li>
											</ul>
										</div> */}
									</div>
								</div>
							</div>
						</div>
						{!Global.isMobile && (
							<div className="col-lg-4 col-md-12">
								<Sticky stickyClassName="mt-4">
									<div className="widget-area">
										<BlogRight />
									</div>
								</Sticky>
							</div>
						)}
					</div>
				</div>
			</Layout>
		)
	} else {
		return <PageLoader />
	}
}
