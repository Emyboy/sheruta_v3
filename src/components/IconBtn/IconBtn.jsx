import React from 'react'
import './IconBtn.css';
import { Button } from 'antd';

export default function IconBtn({
    onClick,
    icon
}) {
    return (
            <Button
                className='icon-btn btn border btn-sm'
                
                shape="circle"
                onClick={onClick}>
                <i className={`${icon} text-dark`}></i>
            </Button>
    )
}
