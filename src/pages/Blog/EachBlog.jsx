import React from 'react'
import { Link } from 'react-router-dom'

export default function EachBlog({ data }) {
	return (
		<article
			className="card w-100 shadow-xss rounded-xxl border-0 p-4 mb-3"
			style={{ height: '400px' }}
		>
			<div className="card-body p-0 mb-2 rounded-3 overflow-hidden h-100">
				<div
					className="card"
					style={{
						height: '100%',
						backgroundImage: `url(${data?.image_url})`,
						backgroundRepeat: 'no-repeat',
						backgroundSize: 'cover',
						backgroundPosition: 'center',
					}}
				/>
			</div>
				<Link to={`/blog/category/${data?.blog_categorie?.slug}/${data?.blog_categorie?.id}`}>
					<span className="badge badge-success mt-2 mb-2">
						{data?.blog_categorie?.name}
					</span>
				</Link>
			<Link
				to={`/blog/${data?.blog_categorie?.slug}/${data?.slug}/${data?.id}`}
				className="card-body p-0 me-lg-5"
			>
				<h1 className="font-xs fw-bold">{data?.title}</h1>
				<p className="fw-500 text-grey-500 lh-26 font-xsss w-100 mb-2">
					{data?.description}
				</p>
			</Link>
		</article>
	)
}
