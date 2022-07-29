import axios from 'axios'
import Cookies from 'js-cookie'
import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import Btn from '../../../components/Btn/Btn'
import { useSelector } from 'react-redux'
import { Modal } from 'antd'
import { notification } from 'antd'
import { notifyEmy } from '../../../services/Sheruta'
import AuthEditForm from '../../../components/AuthEditForm/AuthEditForm'
import moment from 'moment'

const NinInput = styled.input`
	width: 60%;
	text-align: center;
	font-size: 27px;
	border-radius: 10px;
	border: 1px solid greenyellow;
	height: 2em;
	@media only screen and (max-width: 600px) {
		width: 90%;
	}
`

export default function ValidIdCard(props) {
	// console.log('PROPS- --', props)
	const [nin, setNin] = useState('')
	const { user } = useSelector((state) => state.auth)
	const { personal_info } = useSelector(state => state.view);
	const [loading, setLoading] = useState(false)
	const [showUserData, setShowUserData] = useState(false)
	const [ninData, setNinData] = useState(null)
	const [showEdit, setShowEdit] = useState(false)
	const [showSkip, setShowSkip] = useState(false)
	const [showSkipWarning, setShowSkipWarning] = useState(false)

	const handleSubmit = () => {
		setLoading(true)
		axios(process.env.REACT_APP_API_URL + '/sheruta/verify-nin', {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${Cookies.get('token')}`,
			},
			data: {
				nin,
				firstname: user.user.first_name,
				lastname: user.user.last_name,
			},
		})
			.then((res) => {
				setNinData(res.data)
				setLoading(false)
				setShowUserData(true)
				notifyEmy({
					heading: 'Used Verify Me',
					log: { user: user.user, verify_me_data: res.data },
					status: 'success',
				})
				// console.log(res.data);
			})
			.catch((err) => {
				setShowSkip(true)
				// console.log({ ...err });
				notifyEmy({
					heading: 'Error verifying NIN in get started',
					log: {
						...err,
						nin,
						firstname: user.user.first_name,
						lastname: user.user.last_name,
					},
					status: 'error',
					url: window.location.pathname,
				})
				setLoading(false)
				notification.error({ message: 'Error, please try again ' })
				setTimeout(() => {
					notification.info({
						message: 'Please check your NIN properly',
					})
				}, 3000)
			})
	}

	const returnNINDataOfBirth = (date) => {
		const oldDate = date.split('-')
		return `${oldDate[2]}-${oldDate[1]}-${oldDate[0]}`
	}

	const next = () => {
		setLoading(true)
		const date = ninData.birthdate
		const formattedDate =
			date && moment(`${date[2]}-${date[1]}-${date[0]}`).fromNow()
		const data = {
			gender: ninData.gender && ninData.gender,
			occupation: ninData.profession && ninData.profession.toLowerCase(),
			date_of_birth:
				ninData.birthdate && returnNINDataOfBirth(ninData.birthdate),
			middle_name: ninData.middlename && ninData.middlename.toLowerCase(),
			lgaOfOrigin: ninData.lgaOfOrigin && ninData.lgaOfOrigin.toLowerCase(),
			nspokenlang: ninData.nspokenlang && ninData.nspokenlang.toLowerCase(),
			ospokenlang: ninData.ospokenlang && ninData.ospokenlang.toLowerCase(),
			photo: ninData.photo && ninData.photo,
			nin: ninData.nin && ninData.nin,
			// religion: ninData.religion && ninData.religion.toLowerCase(),
			stateOfOrigin:
				ninData.stateOfOrigin && ninData.stateOfOrigin.toLowerCase(),
			last_name_match:
				user.user.last_name.toLowerCase() === ninData.lastname.toLowerCase(),
			age: date && parseInt(formattedDate),
			last_name: ninData.lastname,
		}

		axios(
			process.env.REACT_APP_API_URL + `/personal-infos/${personal_info.id}`,
			{
				method: 'PUT',
				headers: {
					Authorization: `Bearer ${Cookies.get('token')}`,
				},
				data,
			}
		)
			.then((res) => {
				// console.log("RES ----", res);
				notifyEmy({
					heading:
						'Is done with the NIN verification and moved on to next step',
					log: {
						date_form_nin: date,
						formated_date: formattedDate,
						what_was_sent: data,
						the_response: res.data,
					},
					status: 'success',
				})
				props.setStep(props.step + 1)
				setLoading(false)
			})
			.catch((err) => {
				notification.error({ message: 'Error saving data' })
				notifyEmy({
					heading: 'had issues saving data from NIN to DB',
					log: { response: err.response, ...err, ...data },
					status: 'error',
					url: window.location.pathname,
				})
				setLoading(false)
			})
	}

	useEffect(() => {
		if (
			ninData &&
			ninData.lastname.toLowerCase() !== user.user.last_name.toLowerCase()
		) {
			setNinData({ ...ninData, last_name_match: true })
		}
	}, [user])

	return (
		<div>
			<Modal
				visible={showSkipWarning}
				onCancel={() => setShowSkipWarning(!showSkipWarning)}
				closable={false}
				footer={null}
			>
				<div className="text-center">
					<h2 className="fw-bold mb-4">Your NIN is required to get verified</h2>
					<h4>Do you wish to skip?</h4>
					<div className="d-flex mt-5">
						<button
							onClick={() => props.setStep(props.step + 1)}
							className="w-50 btn bg-theme fw-bold text-white"
						>
							Yes
						</button>
						<button
							className="w-50 btn btn-danger fw-bold"
							onClick={() => setShowSkipWarning(false)}
						>
							No
						</button>
					</div>
				</div>
			</Modal>
			<Modal
				visible={showEdit}
				onCancel={() => setShowEdit(!showEdit)}
				closable
				footer={null}
			>
				<h3>Edit Profile</h3>
				<hr />
				<AuthEditForm />
			</Modal>
			<div className="sec-heading text-center mt-3">
				<h2 className="animated animate__bounceIn fw-bold">
					National Identification Number
				</h2>
				<p>Identity verification for security reasons.</p>
				{showSkip && (
					<h6
						className="fw-700 text-theme link"
						onClick={() => setShowSkipWarning(true)}
					>
						SKIP
					</h6>
				)}
			</div>
			<Modal
				visible={showUserData && ninData}
				closable={true}
				onCancel={() => setShowUserData(false)}
				footer={null}
			>
				{ninData && (
					<div>
						<h2 className="text-center fw-bold">Please Verify This Is You</h2>
						<div>
							<div className="row justify-content-center text-center">
								<div>
									<img
										src={user.user.avatar_url}
										width="150"
										className="rounded mt-4"
									/>
									<h3 className="mt-3 fw-700">
										<b className="text-muted">Name: </b>
										{ninData.title +
											' ' +
											ninData.firstname +
											' ' +
											ninData.middlename +
											' ' +
											ninData.lastname}
									</h3>
									<h3 className="mt-3 fw-700">
										<b className="text-muted">Date Of Birth: </b>
										{ninData.birthdate}
									</h3>
									<h3 className="mt-3 fw-700">
										<b className="text-muted">Religion: </b>
										{ninData.religion}
									</h3>
									<h3 className="mt-3 fw-700">
										<b className="text-muted">Native Language: </b>
										{ninData.nspokenlang}
									</h3>
									<h3 className="mt-3 mb-4 fw-700">
										<b className="text-muted">State Of Origin: </b>
										{ninData.stateOfOrigin}
									</h3>
								</div>
							</div>
							{ninData.lastname.toLowerCase() !==
							user.user.last_name.toLowerCase() ? (
								<div className="alert alert-danger">
									<span className="lead">
										<b>
											The name on your NIN doesn't match the name you gave us.
										</b>
									</span>
									<hr />
									<p className="d-flex justify-content-between align-items-center">
										<b>Continue ? </b>
										<b>OR </b>
										<Btn
											text="Edit Profile"
											className="btn-sm"
											onClick={() => setShowEdit(!showEdit)}
										/>
									</p>
								</div>
							) : null}
						</div>
						<hr />
						<div className="d-flex justify-content-between">
							<Btn text="Yes" onClick={next} loading={loading} />
							<Btn
								text="No"
								danger
								onClick={() => setShowUserData(false)}
								disabled={loading}
							/>
						</div>
					</div>
				)}
			</Modal>
			<div className="container">
				{/* {process.env.NODE_ENV === "development" ? (
                    <ul>
                        <li>
                            <h6>21202384433</h6>
                        </li>
                        <li>
                            <h6>38010034757</h6>
                        </li>
                    </ul>
                ) : null} */}
				<div className="d-flex justify-content-center mb-5 mt-5">
					<NinInput
						placeholder="Ex. 10000000001"
						type="number"
						className="form-control"
						onChange={(e) => setNin(e.target.value)}
						autoFocus
						disabled={loading}
					/>
				</div>
				<div className="text-center">
					<b className={`${nin.length > 11 ? 'text-danger' : ''}`}>
						{11 - nin.length}
					</b>
					<br />
					{nin.length > 11 ? (
						<small className="text-danger">
							Invalid Identity Length, should be 11 characters
						</small>
					) : null}
				</div>
			</div>
			<hr />
			<div className="text-center">
				<Btn
					className="mb-4 w-50"
					text="Finish"
					disabled={nin.length < 11 || nin.length > 11}
					onClick={handleSubmit}
					loading={loading}
				/>
			</div>
		</div>
	)
}
// import { notification } from "antd";
// import React, { useEffect, useState } from "react";
// import { connect } from "react-redux";
// import Btn from "../../../components/Btn/Btn";
// import { storage } from "../../../Firebase";
// import { compressImage } from "../../../services/Sheruta";
// import Compressor from "compressorjs";
// import { ProgressBar } from "react-bootstrap";
// import axios from "axios";

// const ValidIdCard = (props) => {
//   const [frontImage, setFrontImage] = useState(null);
//   const [backImage, setBackImage] = useState(null);
//   const [uploading, setUploading] = useState(false);
//   const [frontImageURL, setFrontImageURL] = useState(null);
//   const [backImageURL, setBackImageURL] = useState(null);
//   const [progress, setProgress] = useState(0);
//   const { user, jwt } = props.auth.user;

//   const upload = (image) => {
//     if (image === 1) {
//       document.getElementById("1").click();
//     }
//     if (image === 2) {
//       document.getElementById("2").click();
//     }
//   };

//   async function handleSelected(e, img) {
//     const file = e.target.files[0];
//     if (img === 1) {
//       new Compressor(file, {
//         quality: 0.2,
//         success: (compressedResult) => {
//           setFrontImage(compressedResult);
//         },
//       });
//     } else {
//       new Compressor(file, {
//         quality: 0.2,
//         success: (compressedResult) => {
//           setBackImage(compressedResult);
//         },
//       });
//     }
//   }

//   const sendToDb = () => {
//     axios(process.env.REACT_APP_API_URL + "/personal-infos/" + props.info.id, {
//       method: "PUT",
//       headers: {
//         Authorization: `Bearer ${props.auth.user.jwt}`,
//       },
//       data: {
//         id_back_img_url: backImageURL,
//         id_front_img_url: frontImageURL,
//       },
//     })
//       .then((res) => {
//         console.log('RES --', res)
//         props.setStep(props.step + 1);
//       })
//       .catch((err) => {
//         notification.error({ message: "Error uploading images" });
//       });
//   };

//   useEffect(() => {
//     if (frontImageURL && backImageURL) {
//       sendToDb(frontImageURL, backImageURL)
//     }
//   }, [frontImageURL, backImageURL])

//   const handleImageUpload = () => {
//     setUploading(true);

//     [frontImage, backImage].forEach((file, i) => {
//       var uploadTask = storage
//         .child(`images/id_card/${user.id}/image_${i}`)
//         .put(file);
//       uploadTask.on(
//         "state_changed",
//         (snapshot) => {
//           console.log(
//             "PROGRESS ---",
//             (snapshot.bytesTransferred / snapshot.totalBytes) * 100
//           );
//           var _progress =
//             (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//           setProgress(_progress);
//           // console.log("Upload is " + progress + "% done");
//         },
//         (error) => {
//           // Handle unsuccessful uploads
//           setUploading(false);
//           notification.error({ message: "Upload Error" });
//         },
//         () => {
//           // Handle successful uploads on complete
//           // For instance, get the download URL: https://firebasestorage.googleapis.com/...
//           uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
//             console.log({
//               downloadURL,
//               i
//             })
//             if (i === 1) {
//               setFrontImageURL(downloadURL);
//             } else {
//               setBackImageURL(downloadURL);
//               setUploading(false);
//               // sendToDb();
//             }
//           });
//         }
//       );
//     });
//   };
//   return (
//     <div>
//       <div className="sec-heading center">
//         <h2 className="animated animate__bounceIn">Upload valid ID Card</h2>
//         <p>Take a picture of the font and back side of your ID card</p>
//       </div>
//       <div className="row justify-content-center mb-5 mt-5">
//         <div className="col-md-4 col-11 mb-4">
//           {frontImage ? (
//             <div className="text-center">
//               <img
//                 className="rounded"
//                 width="100%"
//                 height="150px"
//                 style={{ height: '200px'}}
//                 src={URL.createObjectURL(frontImage)}
//               />
//               <button
//                 className="btn text-danger btn-sm"
//                 disabled={uploading}
//                 onClick={() => setFrontImage(null)}
//               >
//                 Remove <i className="ti-trash"></i>
//               </button>
//             </div>
//           ) : (
//             <>
//               <button
//                 className="btn btn-lg text-theme w-100 rounded"
//                 style={{ height: "150px" }}
//                 id="plus"
//                 onClick={() => upload(1)}
//               >
//                 Front Image +
//               </button>
//               <input
//                 id="1"
//                 hidden
//                 type="file"
//                 accept="image/*"
//                 onChange={(e) => handleSelected(e, 1)}
//               />
//             </>
//           )}
//         </div>
//         <div className="col-md-4 col-11 mb-4">
//           {backImage ? (
//             <div className="text-center">
//               <img
//                 className="rounded"
//                 width="100%"
//                 height="150px"
//                 style={{ height: '200px'}}
//                 src={URL.createObjectURL(backImage)}
//               />
//               <button
//                 className="btn text-danger btn-sm"
//                 disabled={uploading}
//                 onClick={() => setBackImage(null)}
//               >
//                 Remove <i className="ti-trash"></i>
//               </button>
//             </div>
//           ) : (
//             <>
//               <button
//                 className="btn btn-lg text-theme w-100 rounded"
//                 style={{ height: "150px" }}
//                 id="plus"
//                 onClick={() => upload(2)}
//               >
//                 Back Image +
//               </button>
//               <input
//                 id="2"
//                 hidden
//                 type="file"
//                 accept="image/*"
//                 onChange={(e) => handleSelected(e, 2)}
//               />
//             </>
//           )}
//         </div>
//       </div>
//       <hr />
//       <div className="text-center">
//         {progress > 0 ? <ProgressBar now={progress} variant="success" /> : null}
//         <Btn
//           className="mb-4 w-50"
//           text="Finish"
//           disabled={!frontImage || !backImage}
//           loading={uploading}
//           onClick={handleImageUpload}
//         />
//       </div>
//     </div>
//   );
// };

// const mapStateToProps = (state) => ({
//   auth: state.auth,
// });

// const mapDispatchToProps = {};

// export default connect(mapStateToProps, mapDispatchToProps)(ValidIdCard);
