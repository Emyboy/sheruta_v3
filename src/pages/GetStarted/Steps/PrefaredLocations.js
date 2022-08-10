import React from 'react'
import { connect, useSelector } from 'react-redux'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete'
import Btn from '../../../components/Btn/Btn'
import { AiFillCloseCircle } from 'react-icons/ai'
import axios from 'axios'
import { notification } from 'antd'
import Cookies from 'js-cookie'
import Global from '../../../Global'

export const PrefaredLocations = (props) => {
	const { setStep, step, standAlone, done, max, heading } = props
	const auth = useSelector(state => state.auth);
	const [maxNumber] = React.useState(max || 3);
	const [mainHeading] = React.useState(heading || 'Preferred location(s)?')
	const [data, setData] = React.useState({
		location: null,
		google_location: null,
	})

	const [locaitons, setLocations] = React.useState([])
	const [loading, setLoading] = React.useState(false)

	const handleAddLocation = () => {
		setLoading(true)
		axios(process.env.REACT_APP_API_URL + '/user-preferred-locations', {
			method: 'POST',
			headers: {
				authorization: `Bearer ${auth.user.jwt}`,
			},
			data: {
				...data,
				users_permissions_user: auth.user.user.id,
				personal_info: props.hasInfo?.id || null,
			},
		})
			.then((res) => {
				setLoading(false)
				setLocations([...locaitons, res.data])
			})
			.catch((err) => {
				setLoading(false)
				notification.error({ message: 'Error adding location' })
			})
	}

	const removeAddressFromList = (id) => {
		axios(process.env.REACT_APP_API_URL + '/user-preferred-locations/' + id, {
			method: 'DELETE',
			headers: {
				authorization: `Bearer ${auth.user.jwt}`,
			},
		})
			.then((res) => {
				setLocations([...locaitons.filter((x) => x.id !== res.data.id)])
			})
			.catch((err) => {
				notification.error({ message: 'Error deleting location' })
			})
	}

	React.useEffect(() => {
		axios(
			process.env.REACT_APP_API_URL +
				'/user-preferred-locations' +
				'/?users_permissions_user=' +
				auth.user.user.id,
			{
				headers: {
					Authorization: `Bearer ${Cookies.get('token')}`,
				},
			}
		)
			.then((res) => {
				setLocations(res.data)
			})
			.catch((err) => {
				// notification.error({ message: 'Error fetching your location' })
				console.log({ ...err })
			})
	}, [])

	React.useEffect(() => {
		if (locaitons.length > 0 && done) {
			done(locaitons)
		}else if(done) {
			done(null)
		}
	}, [locaitons])

	return (
		<div>
			<div className="sec-heading text-center mb-4">
				<h2 className="animated animate__bounceIn h1 fw-700">
					{mainHeading}
				</h2>
				<p>
					Add <b>{maxNumber}</b> locations of your choice
				</p>
			</div>
			<div className="container">
				{locaitons.map((val, i) => {
					return (
						<div className="card shadow border border-success mb-2" key={i}>
							<div className="pl-2 d-flex justify-content-between">
								<p className="mb-0" style={{ fontSize: '20px' }}>
									{val.location.slice(0, Global.isMobile ? 20 : 40)}...
								</p>
								<button
									className="btn btn-sm text-danger"
									onClick={() => removeAddressFromList(val.id)}
								>
									<AiFillCloseCircle size={25} />
								</button>
							</div>
						</div>
					)
				})}
				<hr />
				<div className="">
					<div className="form-group text-center pt-3">
						{locaitons.length < maxNumber ? (
							<>
								<label>Location</label>
								<GooglePlacesAutocomplete
									data-cy="google-places"
									apiKey={process.env.REACT_APP_GOOGLE_PLACES_API_KEY}
									apiOptions={{ language: 'en', region: 'ng' }}
									selectProps={{
										// props.state.location,
										className: 'border',
										onChange: (e) => {
											setData({
												...data,
												google_location: e,
												location: e.label,
											})
										},
										placeholder: 'Type in any location here.',
									}}
									autocompletionRequest={{
										componentRestrictions: {
											country: ['ng'],
										},
									}}
								/>
								<button
									disabled={!data.location || loading}
									className="btn w-50 text-success mt-3"
									onClick={handleAddLocation}
								>
									{loading ? 'Loading...' : 'Add +'}
								</button>
							</>
						): <small className='text-danger'>You have reach maximum of 3</small>}
						<br />
						<hr />
						{!standAlone && (
							<Btn
								text="I'm done"
								className="mt-3"
								disabled={locaitons.length === 0 || loading}
								style={{ backgroundColor: null }}
								onClick={() => setStep(step + 1)}
							/>
						)}
					</div>
				</div>
			</div>
		</div>
	)
}

const mapStateToProps = (state) => ({
	auth: state.auth,
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(PrefaredLocations)
