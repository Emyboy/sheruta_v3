import React, { useState } from 'react'
import styled from 'styled-components'
import Global from '../../../Global'
import { FaTimes } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { showRobotMessage } from '../../../redux/strapi_actions/view.action'
import { useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import Cookies from 'js-cookie'
import { notifyEmy } from '../../../services/Sheruta'

const Wrapper = styled.div`
	.markup  p  a {
		color: 'red' !important;
	}
`

export default function RobotMessage() {
	const { robot_message, robot_action_text, robot_action_link, personal_info, app_details } =
		useSelector((state) => state.view)
	const { user } = useSelector((state) => state.auth)
	const dispatch = useDispatch();
    const [show, setShow] = useState(false);

	const handleClose = () => {
		dispatch(showRobotMessage(null, null))
	}

    let expires = 5;

    useEffect(() => {
        if(app_details && personal_info && !Cookies.get('shown_gen_msg')){
            if(app_details?.general_message && app_details?.marketing_mode){
                setTimeout(() => {
                    setShow(true)
                    // Cookies.set('shown_gen_msg', false, { expires })
                }, 3000);
            }
			// else {
            //     Cookies.set('shown_gen_msg', false, { expires })
            // }
        }
    },[app_details, personal_info])

    if(!show){
        return null;
    }

	if (personal_info && user) {
		return (
			<Wrapper
				className={`bg-theme-light p-3  border shadow animate__bounceInUp animate__animated`}
				style={{ position: 'fixed', bottom: '8vh', width: '100%', zIndex: 1908 }}
				onClick={() => {
					setTimeout(() => {
						setShow(false)
					}, 1000)
				}}
			>
				<span
					onClick={() => {
						setShow(false);
						Cookies.set('shown_gen_msg', true, { expires });
						notifyEmy({
							heading: "Closed the marketing popup",
							url: window.location.pathname,
						})
					}}
					class="btn-round-sm bg-accent shadow"
					style={{
						fontSize: '5px',
						position: 'absolute',
						right: '5px',
						top: '-3px',
						zIndex: 7,
					}}
				>
					<i class="ti ti-close text-white"></i>
				</span>
				<div className="d-flex pb-0 bor-0">
					<figure className="avatar me-3">
						<img
							style={{ width: '50px', maxWidth: '50px' }}
							// src="https://firebasestorage.googleapis.com/v0/b/sheruta-prod.appspot.com/o/DONT%20DELETE%2FLOGOS%2Fsheruta%20logo%20accect%20big.png?alt=media&token=caffc833-ce8b-40ed-be52-32d7e03bbdb7"
							src="https://static.generated.photos/vue-static/face-generator/landing/demo-previews/age.jpg"
							alt="image"
							className="shadow-sm rounded-circle "
							width="150"
							height={'150'}
						/>
					</figure>
					<h4 className="fw-700 text-grey-900 font-xsss mt-1">
						Anita from Sheruta
						<span className="markup d-block font-xsss fw-500 mt-2 lh-3 text-grey-600 scroll-bar" style={{ maxHeight: '65vh' }}>
							<ReactMarkdown>{app_details?.general_message}</ReactMarkdown>
						</span>
					</h4>
				</div>
			</Wrapper>
			// <Wrapper
			//     className={`bg-white rounded border border-info p-3 shadow link`}
			// >
			//     <FaTimes size={20} onClick={handleClose} />
			//     <img
			//         src={
			//             "https://firebasestorage.googleapis.com/v0/b/sheruta-prod.appspot.com/o/DONT%20DELETE%2FLOGOS%2Fsheruta%20logo%20accect%20big.png?alt=media&token=caffc833-ce8b-40ed-be52-32d7e03bbdb7"
			//         }
			//         width="60"
			//         alt="robot"
			//         className="border-gray"
			//         style={{ marginLeft: !Global.isMobile ? "20px" : "10px" }}
			//     />
			//     <h5>
			//         {robot_message}
			//         {robot_action_text && (
			//             <Link
			//                 to={robot_action_link}
			//                 className="text-theme"
			//                 onClick={handleClose}
			//             >
			//                 <b> {robot_action_text}</b>
			//             </Link>
			//         )}
			//     </h5>
			// </Wrapper>
		)
	} else {
		return null
	}
}
