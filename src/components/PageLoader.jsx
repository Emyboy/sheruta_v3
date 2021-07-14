import React from 'react';
import Icon from '../assets/img/logo.png';
import { Spinner } from 'react-activity';

const PageLoader = () => {
    return (

        <div id="preloader" >
            <div style={{
                // position: 'absolute',
                // top: '40%',
                // left: '40vw'
                marginTop: '40vh'
            }}>
                <div className="text-center">
                    <img style={{ width: '150px' }} src={Icon} alt='loading-gif' /><br />
                    {/* <small className='mt-3'>Loading...</small> */}
                        <Spinner size={10} color={'green'} />
                </div>
            </div>
        </div>
    )
}
export default PageLoader;