import React from 'react'
import { Alert } from 'react-bootstrap';
import { BsFillCalendarXFill } from 'react-icons/bs'

export default function InspectionDate({ data }) {
  return (
		<div className="container-fluid pt-3 pb-3">
			{data?.guests?.length + 1 < data?.property?.bedroom && (
				<Alert variant="info" className="text-center">
					<Alert.Heading className="fw-bold mb-4">
						Sorry can't book inspection now.
					</Alert.Heading>
					<BsFillCalendarXFill size={100} className="mb-3" />
					<hr />
					<p className="mb-0">
						Not enough members to book an inspection for the{' '}
						<strong>{data?.property?.bedroom}</strong> bedroom flat.
					</p>
				</Alert>
			)}
		</div>
	)
}
