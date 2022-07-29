import React, { useState, useEffect } from 'react'
import { connect, useDispatch, useSelector } from 'react-redux'
import Btn from '../../../components/Btn/Btn'
import TextInput from '../../../components/TextInput/TextInput'
import { Accordion } from 'react-bootstrap'
import { Form, InputGroup, FormControl } from 'react-bootstrap'
import Select from 'react-select'
import axios from 'axios'
import { notification } from 'antd'
import { AiOutlineWarning } from 'react-icons/ai'
import { notifyEmy } from '../../../services/Sheruta'
import { getAuthPersonalInfo } from '../../../redux/strapi_actions/view.action'
import Cookies from 'js-cookie'

const PersonalInfoForm = (props) => {
	const [info, setInfo] = useState(props.info)
	const [loading, setLoading] = useState(false)
	const { personal_info } = useSelector((state) => state?.view)
	const dispatch = useDispatch()

	const [data, setData] = useState({
		...info,
		occupation: personal_info?.occupation,
		company_name: personal_info?.company_name,
		company_address: personal_info?.company_address,
		supervisor_name: personal_info?.supervisor_name,
		supervisor_number: personal_info?.supervisor_number,
		twitter: personal_info?.twitter,
		facebook: personal_info?.facebook,
		linkedin: personal_info?.linkedin,
		instagram: personal_info?.instagram,
		employment_status: personal_info?.employment_status,
		temperament: personal_info?.temperament,
		phone_number: personal_info?.phone_number,
		next_of_kin_address: personal_info?.next_of_kin_address,
		next_of_kin_name: personal_info?.next_of_kin_name,
		next_of_kin_phone: personal_info?.next_of_kin_phone,
		users_permissions_user: props.auth.user.user.id,
		work_industry: personal_info?.work_industry,
	})

	const handleSubmit = (e) => {
		e.preventDefault()
		console.log(info, data)
		if (!data.employment_status && !personal_info?.employment_status) {
			notification.error({ message: 'Please select your employment status' })
			return
		}
		if (!personal_info?.work_industry) {
			notification.error({ message: 'Please select your work industry' })
			return
		}
		if (!personal_info?.religion) {
			notification.error({ message: 'Please select your religion' })
			return
		}
		setLoading(true)
		axios(
			process.env.REACT_APP_API_URL +
				'/personal-infos' +
				`${props.info ? '/' + personal_info?.id : ''}`,
			{
				headers: {
					Authorization: `Bearer ${Cookies.get('token')}`,
				},
				method: 'PUT',
				data,
			}
		)
			.then((res) => {
				notification.success({ message: 'Updated Successfully' })
				setLoading(false)
				props.setStep(props.step + 1)
			})
			.catch((err) => {
				notifyEmy({
					heading: 'had error updating work and social info',
					log: { ...err },
					url: window.location.pathname,
					status: 'error',
				})
				setLoading(false)
				notification.error({ message: 'Error updating personal info' })
			})
	}

	useEffect(() => {
		setInfo(props.hasInfo)
		// console.log(props.info);
	}, [props.info])

	useEffect(() => {
		dispatch(getAuthPersonalInfo())
	}, [dispatch])

  if(!personal_info){
    return null
  }

	return (
		<form onSubmit={handleSubmit} className="mt-4 mb-5">
			<div>
				<h1 className="mb-4">Work Information</h1>
			</div>
			<div className="row">
				<div className="col-lg-6 col-md-6">
					<div className="form-group">
						<div className="input-with-icon">
							<TextInput
								label="Occupation"
								placeholder="EX. Doctor"
								name="occupation"
								required
								defaultValue={personal_info?.occupation}
								onChange={(e) =>
									setData({ ...data, occupation: e.target.value })
								}
							/>
						</div>
					</div>
				</div>
				<div className="col-lg-6 col-md-6">
					<div className="form-group">
						<div className="input-with-icon">
							<Form.Label>
								<b className="text-muted">Employment Status</b>
							</Form.Label>{' '}
							<span className="text-danger">Required *</span>
							<Select
								className="mt-2"
								value={{
									value:
										data.employment_status ||
										props.personal_info?.employment_status,
									label:
										data.employment_status ||
										props.personal_info?.employment_status,
								}}
								options={[
									{ value: 'employed', label: 'Employed' },
									{ value: 'unemployed', label: 'Unemployed' },
									{ value: 'self-employed', label: 'Self Employed' },
									{ value: 'student', label: 'Student' },
									{ value: 'corps-member', label: 'Corps Member' },
								]}
								onChange={(e) =>
									setData({ ...data, employment_status: e.value })
								}
							/>
						</div>
					</div>
				</div>
				<div className="col-lg-6 col-md-6">
					<div className="form-group">
						<div className="input-with-icon">
							<Form.Label>
								<b className="text-muted">Work Industry</b>
							</Form.Label>{' '}
							<span className="text-danger">Required *</span>
							<Select
								className="mt-2"
								value={{
									label: personal_info?.work_industry
										? props.view.work_industries.filter(
												(x) => x.id === personal_info?.work_industry
										  )[0]?.name
										: null,
									value: personal_info?.work_industry
										? props.view.work_industries.filter(
												(x) => x.id === personal_info?.work_industry
										  )[0]?.id
										: null,
								}}
								options={props.view.work_industries.map((val) => ({
									value: val.id,
									label: val.name,
								}))}
								onChange={(e) => {
									setInfo({ ...info, work_industry: e.value })
									setData({ ...data, work_industry: e.value })
								}}
							/>
						</div>
					</div>
				</div>
				{/* <div className="col-lg-6 col-md-6">
          <div className="form-group">
            <div className="input-with-icon">
              <TextInput
                test_id='company_name'
                label="Company Name"
                placeholder="EX. Shell"
                name="company_name"
                required
                defaultValue={personal_info?.company_name}
                onChange={(e) =>
                  setData({ ...data, company_name: e.target.value })
                }
              />
            </div>
          </div>
        </div> */}

				{/* <div className="col-lg-6 col-md-6">
          <div className="form-group">
            <div className="input-with-icon">
              <TextInput
                label="Company Address"
                placeholder="EX. No 1 Jane Doe Street"
                name="company_address"
                required
                defaultValue={personal_info?.company_address}
                onChange={(e) =>
                  setData({ ...data, company_address: e.target.value })
                }
              />
            </div>
          </div>
        </div> */}

				{/* <div className="col-lg-6 col-md-6">
          <div className="form-group">
            <div className="input-with-icon">
              <TextInput
                label="Supervisor's Name"
                placeholder="EX. John Doe"
                name="supervisor_name"
                defaultValue={personal_info?.supervisor_name}
                required
                onChange={(e) =>
                  setData({ ...data, supervisor_name: e.target.value })
                }
              />
            </div>
          </div>
        </div> */}

				<div className="col-lg-6 col-md-6">
					<div className="form-group">
						<div className="input-with-icon">
							<Form.Label>
								<b className="text-muted">Religion</b>
							</Form.Label>{' '}
							<span className="text-danger">Required *</span>
							<Select
								className="mt-2"
								value={{
									value: data.religion || props.personal_info?.religion,
									label: data.religion || props.personal_info?.religion,
								}}
								options={[
									{ value: 'christian', label: 'Christian' },
									{ value: 'muslim', label: 'Muslim' },
									{ value: 'others', label: 'Others' },
								]}
								onChange={(e) => {
									setData({ ...data, religion: e.value })
									setInfo({ ...info, religion: e.value })
								}}
							/>
						</div>
					</div>
				</div>

				<div className="col-lg-6 col-md-6">
					<div className="form-group">
						<div className="input-with-icon">
							<TextInput
								label="Supervisor Phone Number"
								placeholder="Ex. 08081234567"
								name="phone"
								defaultValue={personal_info?.supervisor_number}
								onChange={(e) =>
									setData({ ...data, supervisor_number: e.target.value })
								}
							/>
						</div>
					</div>
				</div>
			</div>
			<hr />
			<div>
				<h1 className="mb-4">Social Information</h1>
				<div className="row justify-content-center">
					<div className="p-0 alert alert-warning col-md-8 text-center rounded border border-warning">
						{/* <div>
              <AiOutlineWarning size={40} />
              <b className="display-7">Get Verified</b>
            </div> */}
						<p className="m-0">
							Increase your credibility, drop two active social media handles.
						</p>
					</div>
				</div>
			</div>
			<div className="row">
				<div className="col-lg-6 col-md-6">
					<div className="form-group">
						<div className="input-with-icon">
							<Form.Label htmlFor="basic-url">Facebook Username</Form.Label>
							<InputGroup className="mb-3">
								<InputGroup.Text
									id="basic-addon3"
									style={{ fontWeight: 'bold', alignSelf: 'center' }}
								>
									www.facebook.com/
								</InputGroup.Text>
								<FormControl
									id="basic-url"
									aria-describedby="basic-addon3"
									defaultValue={personal_info?.facebook}
									className="pl-1"
									onChange={(e) =>
										setData({ ...data, facebook: e.target.value })
									}
								/>
							</InputGroup>
						</div>
					</div>
				</div>
				<div className="col-lg-6 col-md-6">
					<div className="form-group">
						<div className="input-with-icon">
							<Form.Label htmlFor="basic-url">Instagram Username</Form.Label>
							<InputGroup className="mb-3">
								<InputGroup.Text
									id="basic-addon3"
									style={{ fontWeight: 'bold', alignSelf: 'center' }}
								>
									www.instagram.com/
								</InputGroup.Text>
								<FormControl
									id="basic-url"
									aria-describedby="basic-addon3"
									className="pl-1"
									defaultValue={personal_info?.instagram}
									onChange={(e) =>
										setData({ ...data, instagram: e.target.value })
									}
								/>
							</InputGroup>
						</div>
					</div>
				</div>

				<div className="col-lg-6 col-md-6">
					<div className="form-group">
						<div className="input-with-icon">
							<Form.Label htmlFor="basic-url">Twitter Username</Form.Label>
							<InputGroup className="mb-3">
								<InputGroup.Text
									id="basic-addon3"
									style={{ fontWeight: 'bold', alignSelf: 'center' }}
								>
									www.twitter.com/
								</InputGroup.Text>
								<FormControl
									id="basic-url"
									aria-describedby="basic-addon3"
									className="pl-1"
									defaultValue={personal_info?.twitter}
									onChange={(e) =>
										setData({ ...data, twitter: e.target.value })
									}
								/>
							</InputGroup>
						</div>
					</div>
				</div>

				<div className="col-lg-6 col-md-6">
					<div className="form-group">
						<div className="input-with-icon">
							<TextInput
								label="Linkedin URL"
								name="linkedin"
								placeholder="EX. linkedin.com/in/sheruta"
								defaultValue={personal_info?.linkedin}
								onChange={(e) => setData({ ...data, linkedin: e.target.value })}
							/>
						</div>
					</div>
				</div>
			</div>
			<hr />
			<div className="row justify-content-center w-100 mb-3">
				{/* <button type="submit" className="btn btn-md full-width pop-login">Sign Up</button> */}
				<Btn
					text="Submit"
					className="w-50"
					type="submit"
					loading={loading}
					test_id="submit-btn"
				/>
			</div>
		</form>
	)
}

const mapStateToProps = (state) => ({
	auth: state.auth,
	view: state.view,
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(PersonalInfoForm)
