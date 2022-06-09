import React from 'react'
import { CgUnavailable } from 'react-icons/cg'


export default function UnavailablePropertyError() {
  return (
		<div>
			<div className="row justify-content-center mt-5 mb-5 text-center">
				<div className="col-lg-6 col-sm-12">
					<CgUnavailable size={50} />
					<h3 className='text-grey-600 mt-3'>The property you're about to inspect is currently Unavailable</h3>
				</div>
			</div>
		</div>
	)
}
