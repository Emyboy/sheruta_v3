import axios from 'axios'
import React from 'react'
import ReactDOM from 'react-dom'
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu'
import { Link } from 'react-router-dom'

import styled from 'styled-components'
import requestUtils from '../../../../utils/request.utils'
// NOTE: embrace power of CSS flexbox!
// import "./arrowsOnBottomOrTop.css";
// import "./firstItemMargin.css";
// import EachRequest from '../../../../components/EachRequest/EachRequest'
const EachRequest = React.lazy(()=> import('../../../../components/EachRequest/EachRequest'))

const elemPrefix = 'test'
const getId = (index) => `${elemPrefix}${index}`

const getItems = () =>
	Array(20)
		.fill(0)
		.map((_, ind) => ({ id: getId(ind) }))

const Wrapper = styled.div`
	.wrapper > div {
		/* width */
		::-webkit-scrollbar {
			width: 10px;
			height: 5px;
		}

		/* Track */
		::-webkit-scrollbar-track {
			background: #f1f1f1;
		}

		/* Handle */
		::-webkit-scrollbar-thumb {
			border-radius: 20px;
			background: #00ba74;
			height: 1px;
			width: 1px;
		}

		/* Handle on hover */
		::-webkit-scrollbar-thumb:hover {
			background: #555;
		}
	}
`


function RecentRequests() {
	const [items] = React.useState(getItems)
	const [state, setState] = React.useState({
		list: [],
	})

	React.useEffect(() => {
		const dev = process.env.NODE_ENV === 'development'
		if (state?.list?.length === 0) {
			axios(
				process.env.REACT_APP_API_URL +
					`/property-requests/?is_searching=false&_limit=${'3'}&_start=0&_sort=created_at:DESC`
			)
				.then((res) => {
					setState({ ...state, list: res.data })
				})
				.catch((err) => {})
		}
	}, [state])

	return (
        <section className="section section-padding customer-review-area pt-5 mt-5 bg-color-light">
            <div className="container mb-5">
                <div className="row">
                    <div className="col-lg-8">
                        <div className="section-heading heading-left">
                            <h2 className="title">Recent Requests</h2>
                            <p>Don't be left out. Login and post your request and get matched with your potential flat mate.</p>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="review-site-logo">
                            <a href="#"><img src="assets/media/icon/google.png" alt="Google"/></a>
                        </div>
                    </div>
                </div>
                <div className="row">
                    {
                        state.list.map((val,i) => {
                            return <EachRequest data={val} key={`req-${i}`} />
                        })
                    }
                </div>
            </div>

            <ul className="shape-group-11 list-unstyled">
                <li className="shape shape-1"><img src="assets/media/others/line-6.png" alt="line"/></li>
                <li className="shape shape-2"><img src="assets/media/others/circle-3.png" alt="line"/></li>
            </ul>
        </section>


	)
		 {/* <div className="p-3 rounded-xxl container mb-3">
			<div className="d-flex align-items-center justify-content-between mb-3">
				<h4 className="fw-bold text-grey-700 mb-0">
					What the community is saying
				</h4>
				<Link to="/feeds" className="fw-bold text-theme">
					More {'>'}
				</Link>
			</div>
			<Wrapper>
				<ScrollMenu
					onWheel={onWheel}
				>
					{state.list.map((val) => (
						<div className="col-8" key={`req-${val?.id}`}>
							<EachRequest data={val} />
						</div>
					))}
				</ScrollMenu>
			</Wrapper>
		</div>  */}
}
export default RecentRequests

function onWheel(apiObj, ev) {
	const isThouchpad = Math.abs(ev.deltaX) !== 0 || Math.abs(ev.deltaY) < 15

	if (isThouchpad) {
		ev.stopPropagation()
		return
	}

	if (ev.deltaY < 0) {
		apiObj.scrollNext()
	} else if (ev.deltaY > 0) {
		apiObj.scrollPrev()
	}
}
