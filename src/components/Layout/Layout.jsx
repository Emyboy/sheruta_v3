import React, { useState } from 'react';
import './Layout.css';
import logo from '../../assets/img/logo.png';

const FooterNav = ({
    text,
    icon,
    path
}) => {
    return <div className='ml-4 mr-4 text-center'>
        <i className={icon}></i><br />
        <small>{text}</small>
    </div>
}

export default function SideNav({
    children
}) {

    const [showNav, setShowNav] = useState(false)

    return (
        <>
            <nav className='fixed-top w-100 bd-navbar border-1 bg-white pl-4 pr-4 pt-2 pb-2 border'>
                <div className='row justify-content-between'>
                    <button className='icon-btn btn border' onClick={() => { setShowNav(!showNav) }}><i className='ti-menu'></i></button>
                    <img width='150' height='40' className='mt-1' src={logo} alt='sheruta.ng' />
                    <button className='icon-btn btn border'><i className='ti-search'></i></button>
                </div>
            </nav>

            <aside>
                <div id="mySidenav" className="sidenav" style={{ width: showNav ? '300px' : '0px' }}>
                    <a href="#navigator" className="closebtn" onClick={() => { setShowNav(false) }}>&times;</a>
                    <a className='border-bottom mt-5' href="/">Home</a>
                    <a className='border-bottom' href="/requests">Request</a>
                    <a className='border-bottom' href="/about">About Us</a>
                    <a className='border-bottom' href="/contact">Contact Us</a>
                </div>

            </aside>


            <div className='pt-5 mt-3'>
                {children}
            </div>


            <nav className='fixed-bottom bg-white border'>
                <div className='row justify-content-center mt-1'>
                    <FooterNav 
                        icon='ti-home'
                        text='Home'
                        path='/'
                    />
                    <FooterNav 
                        icon='ti-search'
                        text='Search'
                        path='/search'
                    />
                    <FooterNav 
                        icon='ti-user'
                        text='Login'
                        path='/login'
                    />
                </div>
            </nav>
        </>
    )
}
