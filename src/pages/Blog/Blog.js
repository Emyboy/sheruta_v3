import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useP, useParams } from 'react-router'
import Layout from '../../components/Layout/Layout'
import EachBlog from './EachBlog'

export default function Blog() {
	const [list, setList] = useState([]);
	const { user } = useSelector(state => state.auth);
	const { category_id } = useParams()

	const getBlogs = async () => {
		axios(
			process.env.REACT_APP_API_URL + `/blogs/?&_start=0&_sort=created_at:DESC`
		)
			.then((res) => {
				setList(res.data)
			})
			.catch((err) => {
				return Promise.reject(err)
			})
	}

	useEffect(() => {
		if (!category_id){
			getBlogs()
		} 
	}, [category_id])

	useEffect(() => {
		axios(
			process.env.REACT_APP_API_URL +
				`/blogs/?blog_categorie=${category_id}&_start=0&_sort=created_at:DESC`
		)
			.then((res) => {
				setList(res.data)
			})
			.catch((err) => {
				return Promise.reject(err)
			})
	}, [category_id])

	return (
		<Layout>
			<section
				style={{ paddingTop: !user ? '5vh' : '5vh' }}
				className="blog-area-without-color ptb-100"
			>
				<div className="container">
					<div className="section-title pb-4">
						<h3>Articles and Blogs</h3>
						<p>
							Stay upto date on your recent blog posts
						</p>
					</div>
					<div className="row">
						<div className="col-lg-12">
							<div className="row">
								{list.map((val, i) => {
									return (
										<div className={`col-lg-${user ? "5":"4"} col-md-6`} key={i + ' post'}>
											<EachBlog data={val} />
										</div>
									)
								})}
							</div>
						</div>
					</div>
				</div>
			</section>
		</Layout>
	)
}
