import axios from 'axios'
import moment from 'moment'
import React from 'react'
import { useState } from 'react'
import { Spinner } from 'react-activity'
import { Link } from 'react-router-dom'
import VerifiedBadge from '../../components/VerifiedBadge/VerifiedBadge'
import { headers } from '../../redux/strapi_actions/contact.actions'

export default function EachMatch({ data, done }) {
	const [val, setVal] = useState(data)
	const [loading, setLoading] = useState(false)
	const _user = val?.users_permissions_user
	const [added, setAdded] = useState(false)
	const [remove, setRemove] = useState(false)

	const addUserToContact = async () => {
		try {
			setLoading(true)
			const res = await axios(
				process.env.REACT_APP_API_URL + `/contacts/add/${_user?.id}`,
				{
					method: 'POST',
					headers: headers(),
				}
			)
			// console.log(res.data)
			if (res.data) {
				setAdded(true)
				setTimeout(() => {
					setLoading(false)
					setRemove(true)
					if(done){
						done()
					}
				}, 1000)
			}
		} catch (error) {
			setLoading(false)
			return Promise.reject(error)
		}
	}

	if (!_user) {
		return null
	}

	if (remove) {
		return null
	}

	return (
		<div
			className="owl-item col-4 mb-3"
			style={{ minWidth: '360px', width: '380px' }}
		>
			<div
				className={`agents-item ${
					added && 'animate__backOutUp animate__animated'
				}`}
			>
				<div className="agents-image">
					<Link to={`/user/${_user?.username}`}>
						{/* <img
							src="https://us.123rf.com/450wm/luismolinero/luismolinero1909/luismolinero190917934/130592146-handsome-young-man-in-pink-shirt-over-isolated-blue-background-keeping-the-arms-crossed-in-frontal-p.jpg?ver=6"
							alt="image"
						/> */}
						<div
							className="card rounded shadow p-5"
							style={{
								backgroundImage: `url(${_user?.avatar_url})`,
								backgroundSize: 'cover',
								backgroundPosition: 'center',
								height: '200px',
							}}
						/>
						{!val?.looking_for && (
							<span
								className="badge badge-success font-xss"
								style={{
									position: 'absolute',
									left: '10px',
									top: '10px',
								}}
							>
								Has Room
							</span>
						)}
					</Link>

					<ul className="social">
						{val?.facebook && (
							<li>
								<a
									href={`https://web.facebook.com/${val?.facebook}`}
									target="_blank"
								>
									<i className="bx bxl-facebook"></i>
								</a>
							</li>
						)}
						{val?.linkedin && (
							<li>
								<a href={val?.linkedin} target="_blank">
									<i className="bx bxl-linkedin"></i>
								</a>
							</li>
						)}
						{val?.instagram && (
							<li>
								<a
									href={`https://www.instagram.com/${val.instagram}`}
									target="_blank"
								>
									<i className="bx bxl-instagram-alt"></i>
								</a>
							</li>
						)}
						{val?.tiktok && (
							<li>
								<a
									href={`https://www.tiktok.com/${val?.tiktok}`}
									target="_blank"
								>
									<i className="bx bxl-tiktok"></i>
								</a>
							</li>
						)}
					</ul>
				</div>

				<div className="agents-content">
					<span>{val?.location_keyword?.name} </span>
					<h3 className="mb-1">
						<Link
							to={`/user/${_user?.username}`}
							className="d-flex align-items-center"
						>
							{_user?.first_name?.split(' ')[0]}{' '}
							<VerifiedBadge user={_user} without_text className={'mb-0'} />
						</Link>
					</h3>
					<p className="text-muted">Seen {moment(val?.updated_at).fromNow()}</p>
					<hr className="my-2" />
					<div className="d-flex flex-column">
						<small className="font-xxxs mb-1">
							Gender:{' '}
							<span className="fw-bold text-black m-0 text-capitalize">
								{val?.gender}
							</span>
						</small>
						<small className="font-xxxs mb-1">
							Profession:{' '}
							<span className="fw-bold text-black m-0 text-capitalize">
								{val?.occupation}
							</span>
						</small>
						<small className="font-xxxs mb-1">
							Religion:{' '}
							<span className="fw-bold text-black m-0 text-capitalize">
								{val?.religion}
							</span>
						</small>
						<small className="font-xxxs mb-1">
							State Of Origin:{' '}
							<span className="fw-bold text-black m-0 text-capitalize">
								{val?.stateOfOrigin}
							</span>
						</small>
						<small className="font-xxxs mb-1">
							Work Industry:{' '}
							<span className="fw-bold text-black m-0 text-capitalize">
								{val?.work_industry?.name}
							</span>
						</small>
						<small className="font-xxxs my-3 text-center">
							<span className="link fw-bold text-black m-0 text-capitalize text-theme">
								Show More Details
							</span>
						</small>
					</div>
					{/* <ul className="rating-list">
						<li>
							<i className="bx bxs-star"></i>
						</li>
						<li>
							<i className="bx bxs-star"></i>
						</li>
						<li>
							<i className="bx bxs-star"></i>
						</li>
						<li>
							<i className="bx bxs-star"></i>
						</li>
						<li className="color-gray">
							<i className="bx bxs-star"></i>
						</li>
						<li>Average</li>
					</ul> */}

					{/* <div className="message-icon">
						<a href="contact.html" target="_blank">
							<i className="bx bx-envelope"></i>
						</a>
					</div> */}
					<span style={{ position: 'absolute', right: '30px', top: '7%' }}>
						<a
							className="border shadow-sm rounded-xl pt-2 pl-2 pr-2 bg-theme-light"
							href={`tel:${_user?.phone_number}`}
						>
							<i className="bx bx-phone font-md text-theme"></i>
						</a>
					</span>
				</div>
				<hr />
				<div className="agents-bottom-content- pb-2 d-flex justify-content-between align-items-center">
					{/* <p>
						<i className="bx bxs-phone"></i>
						<a href="tel:000123456789">+000 123 456 789</a>
					</p> */}

					<div className="agents-btn">
						<button
							className="text-danger fw-bold btn btn-lg font-xs"
							disabled={loading}
						>
							Decline <span></span>
						</button>
					</div>
					<div className="agents-btn">
						<button
							onClick={addUserToContact}
							disabled={loading}
							className="bg-accent text-white default-btn btn-sm px-4"
						>
							{loading ? <Spinner /> : 'Add To Contact +'} <span></span>
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}
