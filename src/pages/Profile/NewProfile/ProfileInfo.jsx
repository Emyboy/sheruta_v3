import React from 'react'
import { GrLocation } from 'react-icons/gr'
import Global from '../../../Global'

export default function ProfileInfo({ info, data }) {
	return (
		<section>
			<div className="mb-4 border-bottom">
				<div className="row pb-2">
					<EachInfoSet
						heading={'preferred Location'}
						sub_heading={`${info?.location_keyword?.name}, ${info?.state?.name}`}
					/>
					<EachInfoSet
						heading={info?.looking_for ? 'Budget' : 'Rent'}
						sub_heading={`N${data?.budget}`}
					/>
					<EachInfoSet
						heading={'Wants Ages'}
						sub_heading={info?.looking_for_age_range}
					/>
				</div>
			</div>
			<div className="mb-4 border-bottom">
				<div className="row pb-2">
					<EachInfoSet
						heading={'Employment Status'}
						sub_heading={info?.employment_status}
					/>
					<EachInfoSet heading={'Stay Duration'} sub_heading={'not stated'} />
					<EachInfoSet heading={'Religion'} sub_heading={info?.religion} />
				</div>
			</div>
			<div className="mb-4 border-bottom">
				<div className="row pb-2">
					<EachInfoSet
						heading={'Stay Of Origin'}
						sub_heading={info?.lgaOfOrigin}
					/>
					<EachInfoSet
						heading={info?.looking_for ? 'Looking For' : 'Has'}
						sub_heading="Room"
					/>
					<EachInfoSet
						heading={'Work Industry'}
						sub_heading={info?.work_industry?.name}
					/>
				</div>
			</div>
		</section>
	)
}

const EachInfoSet = ({ icon, heading, sub_heading }) => {
	const className = Global.isMobile ? 'col-6 mb-4' : 'col-4'

	return (
		<div className={`${className}`}>
			<h4 className="fw-bold text-grey-600">
				{icon} {heading}
			</h4>
			<p className="text-black">{sub_heading}</p>
		</div>
	)
}
