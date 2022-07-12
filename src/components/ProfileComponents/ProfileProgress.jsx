import { Progress } from 'antd'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Global from '../../Global'

export default React.memo(function ProfileProgress() {
	const { personal_info } = useSelector((state) => state.view)
	const [progress, setProgress] = useState(100)

	useEffect(() => {
		if (personal_info) {
			console.log({
				habits: personal_info?.unique_habits?.length,
				state: personal_info?.state,
				location_keyword: personal_info?.location_keyword
			})
			if (!personal_info?.state && !personal_info?.location_keyword) {
				setProgress(progress - 25)
			}else if(personal_info?.unique_habits && personal_info?.unique_habits?.length === 0){
				console.log('SETTING PROGESS')
				setProgress(progress - 25)
			}else {
				setProgress(100)
			}
		}
	}, [personal_info]);

	useEffect(() => {
		if(progress < 50){
			setProgress(50)
		}
	},[progress])

	if (!personal_info || progress > 99) {
		return null
	}

	return (
		<div className="card w-100 shadow-xss rounded-xxl border-0 mb-3 mt-3 animate__animated  animate__shakeX">
			<div className="card-body p-3 border-0">
				<div className="row align-items-center">
					<div className="col-3">
						<div className="chart-container w50 h50">
							{/* <div
								className="chart position-relative"
								data-percent="78"
								data-bar-color="#a7d212"
							>
								<span className="percent fw-700 font-xsss" data-after="%">
									78
								</span>
								<canvas height="50" width="50"></canvas>
							</div> */}
							<Progress
								type="circle"
								percent={progress}
								width={60}
								strokeColor={'#00ba74'}
								size={10}
							/>
						</div>
					</div>
					<div className="col-8 ps-1">
						<h4 className="font-sss d-block fw-700 mt-2 mb-0">
							Complete Your Profile
							<span className="float-right mt-2 font-xsssss text-grey-500">
								<Link to="/" className="btn btn-sm bg-theme text-white">
									Let's Go
								</Link>
							</span>
						</h4>
						<p className="font-xssss fw-600 text-grey-500 lh-26 mb-0">
							Your profile is {progress > 100 ? 100 : progress}% complete
						</p>
					</div>
				</div>
			</div>
		</div>
	)
})
