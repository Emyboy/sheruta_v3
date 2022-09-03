import React, { useCallback, useLayoutEffect, useState } from 'react'
import axios from 'axios'
import { Avatar } from 'antd'
import { Link } from 'react-router-dom';
import { formatPropertyURL } from '../../../pages/Properties/EachProperty';

export default function PropertyAds() {

    const [list, setList] = useState([]);

	const getRecentProperties = useCallback(async () => {
		try {
			const res = await axios(
				process.env.REACT_APP_API_URL + `/properties/?is_available=true&_limit=10&_sort=created_at:DESC`
			)
            setList(res.data)
		} catch (error) {
			return Promise.reject(error)
		}
	}, [])

	useLayoutEffect(() => {
		getRecentProperties()
	}, [getRecentProperties])

	return (
		<div className="scroll-bar mb-3">
			<div className="d-flex">
				{
                    list.map((val) => {
                        return <EachPropAds key={`prop-ads-${val?.id}`} data={val} />
                    })
                }
			</div>
		</div>
	)
}

const EachPropAds = ({ data }) => {
	return (
		<Link className="mr-3" to={formatPropertyURL(data)}>
			<div className="item">
				<div
					className="card w125 h200 d-block border-0 shadow-xss rounded-xxxl bg-gradiant-bottom overflow-hidden cursor-pointer mb-3 mt-3"
					style={{
						backgroundImage: `url(${data?.image_urls[0]})`,
						backgroundSize: 'cover',
						backgroundPosition: 'center',
					}}
				>
					<div className="card-body d-block p-3 w-100 position-absolute bottom-0 text-center">
						<a>
							{/* <figure className="avatar ms-auto me-auto mb-0 position-relative w50 z-index-1">
								<Avatar
									src={data?.agent_profile?.avatar_url}
									alt="image"
									className="float-right p-0 bg-white rounded-circle w-100 shadow-xss"
									style={{ opacity: 1 }}
                            
								/>
							</figure> */}
							<div className="clearfix"></div>
							<h4 className="fw-600 position-relative z-index-1 ls-1 font-xsss text-white mt-2 mb-1">
								N {window.formattedPrice.format(data?.price)}
							</h4>
						</a>
					</div>
				</div>
			</div>
		</Link>
	)
}
