import axios from 'axios'
import moment from 'moment'
import React, { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { returnBlogURL } from './EachBlog'

export default function BlogRight() {
	const [list, setList] = useState([])

	const getAllBlogs = useCallback(async () => {
		try {
			const res = await axios(
				process.env.REACT_APP_API_URL + `/blogs?&_start=0&_sort=created_at:DESC&_limit=6`
			)
			setList(res.data)
		} catch (error) {
			return Promise.reject(error)
		}
	}, [])

	useEffect(() => {
		getAllBlogs()
	}, [getAllBlogs])

	return (
		<div className="widget widget_fido_posts_thumb bg-white card rounded-xxxl border-0 shadow-sm">
			<h3 className="widget-title">Trending Post</h3>

			{
                list.map((val, i) => { 
                    return <EachSimilarBlog key={`similar-${i}`} data={val} />
                })
            }
		</div>
	)
}

const EachSimilarBlog = ({ data }) => {
	return (
		<article className="item">
			<Link to={`/blog/${data?.title?.toLowerCase()}/${data?.id}`} className="thumb">
				<span
					className="fullimage cover"
					style={{ backgroundImage: `url(${data?.image_url})` }}
					role="img"
				></span>
			</Link>

			<div className="info">
				<h4 className="title usmall">
					<Link to={`/blog/${data?.title?.toLowerCase()}/${data?.id}`}>{data?.title}</Link>
				</h4>

				<span>
					<i className="bx bx-calendar"></i> {moment(data?.create_at).fromNow()}
				</span>
			</div>
		</article>
	)
}
