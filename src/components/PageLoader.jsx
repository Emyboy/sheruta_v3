import React from 'react'
import Icon from '../assets/img/logo.png'
import { Dots } from 'react-activity'

const PageLoader = () => {
	return (
		<div id="preloader" className="" style={{ overflow: 'hidden' }}>
			<div
				style={{
					// position: 'absolute',
					// top: '40%',
					// left: '40vw'
					height: '50vh',
					marginTop: '40vh',
				}}
			>
				<div className="text-center">
					<img style={{ width: '150px' }} src={Icon} alt="loading-gif" />
					<br />
					{/* <small className='mt-3'>Loading...</small> */}
					<div className="row justify-content-center mt-3">
						<Dots size={10} color={'#00ba74'} />
					</div>
				</div>
			</div>
		</div>
	)
}
export default PageLoader
