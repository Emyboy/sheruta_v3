import moment from 'moment'
import React from 'react'
import { Link } from 'react-router-dom'


export const returnBlogURL = (data, clip) => {
	return `${clip ? `` : 'blog/'}${data?.title
		.toLocaleLowerCase()
		.replace(/[^\w\s]/gi, '')
		.replace(/\s/g, '-')
		.replace(' ', '')}/${data?.id}`
		
}


export default function EachBlog({ data }) {

	
	return (
		<div className="blog-item bottom-30">
			<a href="blog-details.html">
				{/* <img src={data?.image_url} alt="image" /> */}
				<div
					className="card"
					style={{
						height: '200px',
						backgroundImage: `url(${data?.image_url})`,
						backgroundRepeat: 'no-repeat',
						backgroundSize: 'cover',
						backgroundPosition: 'center',
					}}
				/>
			</a>

			<div className="blog-content">
				{data?.blog_categorie && (
					<span
						style={{ position: 'absolute', left: '30px', top: '20px' }}
						className="shadow"
					>
						<a>{data?.blog_categorie?.name}</a>
					</span>
				)}
				<h3>
					<Link
						to={returnBlogURL(data)}
					>
						{data?.title}
					</Link>
				</h3>
				<p className="text-grey-500">{data?.description}</p>
			</div>

			<div className="blog-bottom-content d-flex justify-content-between align-items-center">
				<div className="blog-author d-flex align-items-center">
					<img
						src={data?.author?.avatar_url}
						className="rounded-circle"
						alt="author"
					/>
					<span>
						<Link to={`/user/${data?.author?.username}`}>{data?.author?.first_name}</Link>
					</span>
				</div>

				<p>
					<i className="bx bx-calendar"></i>
					{moment(data?.created_at).fromNow()}
				</p>
			</div>
		</div>
		// <article
		// 	className="card w-100 shadow-xss rounded-xxl border-0 p-4 mb-3"
		// 	style={{ height: '400px' }}
		// >
		// 	<div className="card-body p-0 mb-2 rounded-3 overflow-hidden h-100">
		// 		<div
		// 			className="card"
		// 			style={{
		// 				height: '100%',
		// 				backgroundImage: `url(${data?.image_url})`,
		// 				backgroundRepeat: 'no-repeat',
		// 				backgroundSize: 'cover',
		// 				backgroundPosition: 'center',
		// 			}}
		// 		/>
		// 	</div>
		// 		<Link to={`/blog/category/${data?.blog_categorie?.slug}/${data?.blog_categorie?.id}`}>
		// 			<span className="badge badge-success mt-2 mb-2">
		// 				{data?.blog_categorie?.name}
		// 			</span>
		// 		</Link>
		// 	<Link
		// 		to={`/blog/${data?.blog_categorie?.slug}/${data?.slug}/${data?.id}`}
		// 		className="card-body p-0 me-lg-5"
		// 	>
		// 		<h1 className="font-xs fw-bold">{data?.title}</h1>
		// 		<p className="fw-500 text-grey-500 lh-26 font-xsss w-100 mb-2">
		// 			{data?.description}
		// 		</p>
		// 	</Link>
		// </article>
	)
}
