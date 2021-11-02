import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import EachBlog from './EachBlog';

export default function Blog() {
    const [list, setList] = useState([])
    useEffect(() => {
        axios(process.env.REACT_APP_API_URL+`/blogs`)
            .then(res => {
                setList(res.data);
            })
            .catch(err => {

            })
    },[])
    
    return (
        <Layout>
            <section>
                <div className="container">
                    <div className="row">
                        <div className="col-xl-6">
                            <div className="breadcrumb_content style2">
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item">
                                        <a href="#">Home</a>
                                    </li>
                                    <li
                                        className="breadcrumb-item active text-thm"
                                        aria-current="page"
                                    >
                                        Blog
                                    </li>
                                </ol>
                                <h2 className="breadcrumb_title">Blog</h2>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="row">
                                {
                                    list.map((val,i) => {
                                        return <EachBlog data={val} key={i+" post"} />
                                        
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    );
}
