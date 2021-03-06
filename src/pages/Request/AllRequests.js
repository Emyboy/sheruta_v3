import axios from 'axios'
import React from 'react'
import { connect, useSelector } from 'react-redux'
import EachRequest from '../../components/EachRequest/EachRequest'
import Sticky from 'react-sticky-el'
import { notification } from 'antd'
import { Spinner } from 'react-activity'
import Layout from '../../components/Layout/Layout'
import Heading from '../../components/Heading/Heading'

const AllRequests = (props) => {
	const { view } = props
	const { user } = useSelector((state) => state.auth)

	const [state, setState] = React.useState({
		list: [],
		selectedCategory: null,
		loading: true,
	})

	React.useEffect(() => {
		if (!state.selectedCategory) {
			axios(process.env.REACT_APP_API_URL + '/property-requests/recent/100')
				.then((res) => {
					setState({ ...state, list: res.data, loading: false })
				})
				.catch((err) => {
					setState({ ...state, loading: false })
					notification.error({ message: 'Error, Please try again' })
				})
		} else {
			setState({ ...state, loading: true })
			axios(
				process.env.REACT_APP_API_URL +
					'/property-requests/?category=' +
					state.selectedCategory.id
			)
				.then((res) => {
					setState({ ...state, list: res.data, loading: false })
				})
				.catch((err) => {
					setState({ ...state, loading: false })
					notification.error({ message: 'Error, Please try again' })
				})
		}
	}, [state.selectedCategory])

	return (
		<Layout>
			<div style={{ paddingTop: !user ? '6vh' : '' }}>
				<Sticky stickyStyle={{ zIndex: 2, marginTop: '7vh' }}>
					<div className="navbar navbar-expand-lg navbar-light bg-light bg-white pt-4 border">
						<span>{/* <b style={{ fontSize: '20px' }}>Filter:</b> */}</span>
						<div className="row"></div>
						<div className="scrollmenu pt-4 pb-3">
							<div
								onClick={() => setState({ ...state, selectedCategory: null })}
								className={`nearby_place_rate good border text-accent mr-2 p-1 rounded ml-3 ${
									!state.selectedCategory ? 'bg-theme' : 'bg-white'
								} text-dark`}
							>
								<b>All</b>
							</div>
							{view.categories.map((val, i) => {
								return (
									<div
										onClick={() =>
											setState({ ...state, selectedCategory: val })
										}
										key={i}
										className={`nearby_place_rate good border text-accent mr-2 p-1 rounded ml-3 link ${
											state.selectedCategory?.id === val.id
												? 'bg-theme'
												: 'bg-white'
										} text-dark`}
									>
										<b>{val.name}</b>
									</div>
								)
							})}
						</div>
					</div>
				</Sticky>
				<section className="pt-1">
					<div className="container-fluid">
						<Heading
							heading={`${
								state.selectedCategory ? state.selectedCategory.name : 'All '
							} Requests`}
						/>
						<hr />
					</div>
					<div className="format-standard">
						{state.loading ? (
							<div className="text-center pt-3">
								<Spinner />
							</div>
						) : (
							<div className="comment-area">
								<div className="all-comments">
									<div className="comment-list container-fluid ">
										<div className="row justify-content-center">
											{state.list.length === 0 ? (
												<h5>No Request Found</h5>
											) : (
												<>
													{state.list.map((val, i) => {
														return (
															<div className="col-lg-4 col-md-6 col-sm-12">
																<EachRequest key={i} data={val} />
															</div>
														)
													})}
												</>
											)}
										</div>
									</div>
								</div>
							</div>
						)}
					</div>
				</section>
			</div>
		</Layout>
	)
}

const mapStateToProps = (state) => ({
	view: state.view,
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(AllRequests)
