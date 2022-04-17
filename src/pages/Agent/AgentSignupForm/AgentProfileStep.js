import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete'
import Select from 'react-select'
import CurrencyInput from 'react-currency-input-field'

const ImgPreview = ({ file, onRemove }) => {
	if (!file) {
		return null
	}
	return (
		<>
			<label
				className="rounded-3 text-center bg-white btn-tertiary js-labelFile p-4 w-100 border-dashed h150"
				style={{
					backgroundImage: `url(${URL.createObjectURL(file)})`,
					backgroundPosition: 'center',
					backgroundSize: 'cover',
				}}
			></label>
			<div>
				<button
					className="btn btn-danger btn-sm shadow fw-700"
					onClick={onRemove}
					type="button"
				>
					Remove
				</button>
			</div>
		</>
	)
}

function AgentProfileStep({ done, data }) {
	const { user } = useSelector((state) => state.auth)
	const { states } = useSelector((state) => state.view)
	const [name, setName] = useState(data?.name || null)
	const [officeLocation, setOfficeLocation] = useState(
		data?.officeLocation || null
	)
	const [state, _setState] = useState(data?.state || null)
	const [idFront, setIDFront] = useState(data?.idFront || null)
	const [idBack, setIDBack] = useState(data?.idBack || null)
	const [inspection_fee, set_inspection_fee] = useState(
		data?.inspection_fee || null
	)

	const _data = {
		state,
		name,
		idFront,
		idBack,
		officeLocation,
		inspection_fee
	}
	useEffect(() => {
		// console.log('DATA --', data)
		if (name && state && idFront && idBack && officeLocation) {
			if (done) {
				done(_data)
			}
		}
		done(_data)
	})

	useEffect(() => {
		if (done) {
			done(data)
		}
	}, [data])

	return (
		<div>
			<form action="#">
				<div className="row">
					<div className="col-lg-12 mb-3">
						<div className="form-group">
							<label className="mont-font fw-600 font-xsss">Company Name</label>
							<input
								type="text"
								className="form-control"
								placeholder="Ex. Sheruta Housing LTD."
								onChange={(e) => setName(e.target.value)}
								defaultValue={data?.name}
								maxLength={80}
							/>
						</div>
					</div>
					<div className="col-lg-6 mb-3">
						<div className="form-group">
							<label className="mont-font fw-600 font-xsss">
								Inspection Fee
							</label>
							<div className="input-group mb-3">
								<span className="input-group-text" id="inspection_fee">
									₦
								</span>
								<CurrencyInput
									id="inspection_fee"
									name="inspection_fee"
									placeholder="Ex. 4,500"
									className="form-control"
									defaultValue={inspection_fee}
									decimalsLimit={2}
									onValueChange={(val) => set_inspection_fee(val)}
								/>
							</div>
							{/* <input
								type="number"
								className="form-control"
								placeholder="EX. 4,000"
								onChange={(e) => set_inspection_fee(e.target.value)}
								defaultValue={data?.inspection_fee}
							/> */}
						</div>
					</div>
					<div className="col-lg-6 mb-3">
						<div className="form-group">
							<label className="mont-font fw-600 font-xsss">
								Office Location
							</label>
							<GooglePlacesAutocomplete
								apiKey={process.env.REACT_APP_GOOGLE_PLACES_API_KEY}
								apiOptions={{
									language: 'en',
									region: 'ng',
								}}
								selectProps={{
									// props.state.location,
									className: 'border',
									onChange: (e) => {
										setOfficeLocation(e)
									},
									placeholder: officeLocation
										? officeLocation?.label.slice(0, 40)
										: 'Eg: Yaba, Lekki, Surulere',
								}}
								autocompletionRequest={{
									componentRestrictions: {
										country: ['ng'],
									},
								}}
							/>
						</div>
					</div>
				</div>

				<div className="row">
					<div className="col-lg-6 mb-3 ">
						<div className="card mt-3 border-0">
							<div className="card-body d-flex justify-content-between align-items-end p-0">
								<div className="form-group mb-0 w-100">
									<label>ID Card Image (front)</label>
									<input
										type="file"
										name="file"
										id="file"
										className="input-file"
										onChange={(e) => setIDFront(e.target.files[0])}
										accept="image/*"
									/>
									{idFront ? (
										<ImgPreview
											onRemove={() => setIDFront(null)}
											file={idFront || data?.idFront}
										/>
									) : (
										<label
											for="file"
											className="rounded-3 text-center bg-white btn-tertiary js-labelFile p-4 w-100 border-dashed h150"
										>
											<i className="ti-cloud-down large-icon me-3 d-block"></i>
											<span className="js-fileName">
												Drag and drop or click to replace
											</span>
										</label>
									)}
								</div>
							</div>
						</div>
					</div>
					<div className="col-lg-6 mb-3 ">
						<div className="card mt-3 border-0">
							<div className="card-body d-flex justify-content-between align-items-end p-0">
								<div className="form-group mb-0 w-100">
									<label>ID Card Image (back)</label>
									<input
										type="file"
										name="file2"
										id="file2"
										className="input-file"
										onChange={(e) => setIDBack(e.target.files[0])}
										accept="image/*"
									/>
									{idBack ? (
										<ImgPreview
											onRemove={() => setIDBack(null)}
											file={idBack || data?.idBack}
										/>
									) : (
										<label
											for="file2"
											className="rounded-3 text-center bg-white btn-tertiary js-labelFile p-4 w-100 border-dashed h150"
										>
											<i className="ti-cloud-down large-icon me-3 d-block"></i>
											<span className="js-fileName">
												Drag and drop or click to replace
											</span>
										</label>
									)}
								</div>
							</div>
						</div>
					</div>

					{/* <div className="col-lg-12 mb-3">
						<label className="mont-font fw-600 font-xsss">Description</label>
						<textarea
							className="form-control mb-0 p-3 h100 bg-greylight lh-16"
							rows="5"
							placeholder="Write your message..."
							spellcheck="false"
						></textarea>
					</div> */}
				</div>
			</form>
		</div>
	)
}

function areEqual(prevProps, nextProps) {
	if (prevProps === nextProps) {
		return false
	}
	return true
}

export default React.memo(AgentProfileStep, areEqual)
