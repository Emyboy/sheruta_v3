import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Modal } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Global from '../../Global'
import { getUser } from '../../redux/strapi_actions/auth.actions'
import PersonalInfoService from '../../services/PersonalInfoService'
import UserService from '../../services/UserService'

export default function GetMoreInfoPopup() {
	const { user } = useSelector((state) => state.auth)
	const { personal_info } = useSelector((state) => state.view)
	const [budget, setBudget] = useState(user?.budget)
	const [phone_number, set_phone_number] = useState(user?.phone_number)
	const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const [show, setShow] = useState(false);

	const handleSubmit = async e => {
        e.preventDefault();
		setLoading(true)
		try {
			const update = await UserService.updateProfile({
				budget,
				phone_number,
			})
			setLoading(false)
			console.log(update.data)
            dispatch(getUser());
            setShow(false)
		} catch (error) {
            setShow(false)
			setLoading(false)
			console.log(error)
			return Promise.reject(error)
		}
	}

    useEffect(() => {
        if(user && !user?.user?.budget || !user?.user?.phone_number){
            setShow(true)
        }else {
            setShow(false)
        }
    },[user])

	if (user && personal_info) {
		return (
			<Modal show={show} size="lg" className="pt-5">
				<Modal.Body>
					<div className="text-center">
						<h1 className="fw-700">Sorry</h1>
						<p>These information are required moving forward</p>
					</div>
					<form onSubmit={handleSubmit}>
						<div className="row justify-content-center">
							{!user?.user.phone_number && (
								<div className="col-lg-6 mb-3">
									<div className="form-group">
										<label className="mont-font fw-600 font-xsss">
											Phone Number
										</label>
										<input
											required
											type="number"
											name="phone_number"
											className="form-control"
											onChange={(e) => set_phone_number(e.target.value)}
										/>
									</div>
								</div>
							)}

							{!user.budget && (
								<div className="col-lg-6 mb-3">
									<div className="form-group">
										<label className="mont-font fw-600 font-xsss">
											{personal_info.looking_for
												? `Budget ${
														Global.currency
												  } ${window.formatedPrice.format(budget)}`
												: `Room Cost ${
														Global.currency
												  } ${window.formatedPrice.format(budget || 0)}`}
										</label>
										<input
											required
											name="budget"
											type="number"
											className="form-control"
											placeholder='Ex. 250000'
											onChange={(e) => setBudget(e.target.value)}
										/>
									</div>
								</div>
							)}
						</div>
						<div className="col-lg-4 col-sm-12">
							<button
								className="w-100 btn bg-current text-center text-white font-xsss fw-600 p-3 w175 rounded-3 d-inline-block"
								disabled={loading}
							>
								{loading ? 'Loading...' : 'Save'}
							</button>
						</div>
					</form>
				</Modal.Body>
			</Modal>
		)
	} else {
		return null
	}
}
