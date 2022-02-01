import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Carousel } from 'react-bootstrap'
import EachRequest from '../../../components/EachRequest/EachRequest'

export default function ControlledCarousel() {
	const [index, setIndex] = useState(0)
	const [state, setState] = useState({
		properties: [],
		list: [],
	})

	useEffect(() => {
		const dev = process.env.NODE_ENV === 'development'
		if (state.list.length === 0) {
			axios(
				process.env.REACT_APP_API_URL +
					`/property-requests/?_limit=${'10'}&_start=0&_sort=created_at:DESC`
			)
				.then((res) => {
					setState({ ...state, list: res.data })
				})
				.catch((err) => {})
		}
	}, [state])

	const handleSelect = (selectedIndex, e) => {
		setIndex(selectedIndex)
	}

	return (
		<div
			className="container card bg-dark rounded-xxl shadow pt-4 pb-5"
			style={{ marginTop: '100px', marginBottom: '100px' }}
		>
			<div className="text-center">
				<h4 className="display-5 mb-5 text-light fs-xxl">
					What the community is saying
				</h4>
			</div>

			<Carousel activeIndex={index} onSelect={handleSelect}>
				{state.list.map((val, i) => {
					if (!val.users_permissions_user?.deactivated) {
						return (
							<Carousel.Item key={i}>
								<div className="row justify-content-center">
									<div className="col-lg-6 col-md-12 pb-4">
										<EachRequest key={i} data={val} />
									</div>
								</div>
							</Carousel.Item>
						)
					}
				})}
			</Carousel>
		</div>
	)
}
