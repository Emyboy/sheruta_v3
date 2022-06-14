import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useP, useParams } from 'react-router'
import Layout from '../../components/Layout/Layout'
import EachBlog from './EachBlog'

export default function Blog() {
	const [list, setList] = useState([]);
	const { user } = useSelector(state => state.view);
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
			<section style={{ paddingTop: !user ? '5vh' : '0' }}>
				<div className="container">
					<div className="row">
						<div className="col-xl-6">
							<div className="card w-100 shadow-xss rounded-xxl border-0 p-4 mb-3 p-2 breadcrumb_content style2">
								<h2 className="breadcrumb_title mb-0 fw-bold">Blog</h2>
							</div>
						</div>
					</div>
					<div className="row">
						<div className="col-lg-12">
							<div className="row">
								{list.map((val, i) => {
									return (
										<div className="col-xl-6 col-md-6" key={i + ' post'}>
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
