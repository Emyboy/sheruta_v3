import React, { useCallback, useEffect, useState } from 'react'
import PropertiesServices from '../../../../services/PropertiesServices'

export default function JoinPaddyPropertyDetails({ data }) {
	const [_data, setData] = useState(null)

	const getPropsDetails = useCallback(async () => {
		try {
			const res = await PropertiesServices.getPropertyByUidAndID(
				data?.uid,
				data?.id
			)
			console.log(' RES --', res.data[0])
            setData(res?.data[0])
		} catch (error) {
            console.log('ERROR --', error);
            return Promise.reject(error);
        }
	}, [])

	useEffect(() => {
		getPropsDetails()
	}, [getPropsDetails])

	return (
		<div>
			<div className="card d-block border-0 shadow-xss bg-pink">
               <div className='mb-3 rounded' style={{ 
                   backgroundImage: `url(${data?.image_urls[0]})`,
                   backgroundSize: 'cover',
                   backgroundPosition: 'center',
                   width: '100%',
                   height: "150px"
               }} />
               <div className='p-3'>

				{_data && (
					<div className="d-flex">
						<span className="font-xsssss fw-700 ps-3 pe-3 lh-32 text-uppercase rounded-3 ls-2 bg-accent d-inline-block text-white ">
							{_data?.service && _data?.service?.name}
						</span>
						<span className="font-xsssss fw-700 ps-3 pe-3 lh-32 text-uppercase rounded-3 ls-2 bg-theme ml-2 d-inline-block text-white ">
							{_data?.categorie && _data?.categorie?.name}
						</span>
					</div>
				)}
				<h2 className="fw-700 font-lg mt-3 mb-2">{data.name}</h2>
				<p className="font-xsss fw-500 text-grey-500 lh-30 mt-3">
					{data?.description}
				</p>

				<div className="clearfix"></div>
				{/* <div className="star d-block w-100 text-left mt-2">
					<img src="images/star.png" alt="star" className="w15 float-left" />
					<img src="images/star.png" alt="star" className="w15 float-left" />
					<img src="images/star.png" alt="star" className="w15 float-left" />
					<img src="images/star.png" alt="star" className="w15 float-left" />
					<img
						src="images/star-disable.png"
						alt="star"
						className="w15 float-left me-2"
					/>
				</div> */}
				<p className="review-link font-xssss fw-600 text-grey-500 lh-3 mb-0">
					(456 ratings ) 2 customer review
				</p>
				<div className="clearfix"></div>
				<h5 className="mt-4 mb-4 d-inline-block font-xssss fw-600 text-grey-500 me-2">
					<i className="btn-round-sm bg-greylight ti-ruler-pencil text-grey-500 me-1"></i>{' '}
					200 sq
				</h5>
				<h5 className="mt-4 mb-4 d-inline-block font-xssss fw-600 text-grey-500 me-2">
					<i className="btn-round-sm bg-greylight ti-rss-alt text-grey-500 me-1"></i>{' '}
					WiFi
				</h5>
				<h5 className="mt-4 mb-4 d-inline-block font-xssss fw-600 text-grey-500">
					<i className="btn-round-sm bg-greylight ti-credit-card text-grey-500 me-1"></i>{' '}
					Card
				</h5>
				<div className="clearfix"></div>

				<a
					href="#"
					className="btn-round-lg ms-3 d-inline-block rounded-3 bg-greylight"
				>
					<i className="feather-share-2 font-sm text-grey-700"></i>
				</a>
				<a
					href="#"
					className="btn-round-lg ms-2 d-inline-block rounded-3 bg-danger"
				>
					<i className="feather-bookmark font-sm text-white"></i>{' '}
				</a>
				<a
					href="#"
					className="bg-accent border-0 text-white fw-600 text-uppercase font-xssss float-left rounded-3 d-inline-block mt-0 p-2 lh-34 text-center ls-3 w200"
				>
					Book Inspection
				</a>
               </div>
			</div>
		</div>
	)
}
