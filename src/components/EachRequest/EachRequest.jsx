import React from 'react'
import Avatar from 'antd/lib/avatar/avatar'
import moment from 'moment'
import { Tag } from 'antd';
import { Link } from 'react-router-dom';
export default function EachRequest({
    data
}) {
    return (
        <article className='bg-white p-2 rounded border mb-3 '>
            <div className="comment-details pl-3">
                {
                    data.users_permissions_user ?
                        <div className="comment-meta row">
                            <div className="article_comments_thumb" style={{ width: '60px' }}>
                                <Avatar src={data.users_permissions_user.avatar_url} size={50}/>
                            </div>
                            <div className="comment-left-meta">
                                <h4 className="author-name mb-1" style={{ fontSize: '20px' }}>{data.users_permissions_user.first_name}</h4>
                                <div className="comment-date">{moment(data.created_at).fromNow()}</div>
                            </div>
                        </div> : null
                }
                <div className='container'>
                    <div className='mt-2 row'>
                        {
                            data.category ? <Tag color='volcano'>{data.category.name.toUpperCase()}</Tag> : null
                        }
                        {
                            data.service ? <Tag color='cyan'>{data.service.name.toUpperCase()}</Tag> : null
                        }
                    </div>
                </div>
                <div className="comment-text mt-1">
                    <p>{data.body.length > 90 ? data.body.slice(0, 90) + "..." : data.body}</p>
                </div>
                <hr className='mt-1 mb-1' />
                {
                    data.users_permissions_user ?
                        <div className='d-flex justify-content-between'>
                            <a href={`tel:${data.users_permissions_user.phone_number}`}>
                                <span className='badge badge-danger' style={{ fontSize: '15px' }}><i className='ti-mobile'></i> Call Me</span>
                            </a>
                            <Link to={`/request/${data.uuid}/${data.users_permissions_user.id}`} className='text-theme'>
                                View More Details
                            </Link>
                            </div>
                        : null
                }
            </div>

        </article>

    )
}
