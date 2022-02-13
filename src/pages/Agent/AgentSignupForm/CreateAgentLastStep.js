import { notification } from 'antd'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { storage } from '../../../Firebase'
import AgentService from '../../../services/AgentService'
import firebase from 'firebase';
import { Dots } from 'react-activity'
import { Redirect } from 'react-router'

export default function CreateAgentLastStep({ data, changeStep }) {
	const [fontID, setFontID] = useState(null)
	const [backID, setBackID] = useState(null)
	const { user } = useSelector((state) => state.auth);
    const [done, setDone] = useState(false);

	const saveToDB = async () => {
		try {
			const newAgent = {
				users_permissions_user: user?.user?.id,
				id_image_front: fontID,
				id_image_back: backID,
				name: data?.name,
				state: data?.state,
				location: data?.officeLocation?.label,
				google_location: data?.officeLocation,
				country: process.env.REACT_APP_COUNTRY_ID,
				inspection_fee: data?.inspection_fee || null,
			}
			const res = await AgentService.createAgent(newAgent);
            if(res.data){
                setDone(res.data.id)
            }
		} catch (error) {
            notification.error({ message: "Error, please try again"})
            return Promise.reject(error);
        }
	}

	const uploadIDs = async () => {
		;[data?.idBack, data?.idFront].map((val, i) => {
			const uploadTask = storage
				.child(`images/profile/${user?.user?.id}/id_${i}`)
				.put(val)
			uploadTask.on(
				'state_changed',
				(snapshot) => {
					var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
					console.log('Upload is ' + progress + '% done')
					switch (snapshot.state) {
						case firebase.storage.TaskState.PAUSED: // or 'paused'
							console.log('Upload is paused')
							break
						case firebase.storage.TaskState.RUNNING: // or 'running'
							console.log('Upload is running')
							break
					}
				},
				(error) => {
					// Handle unsuccessful uploads
					notification.error({ message: 'Error creating account' })
					notification.info({ message: 'Please try again' })
				},
				() => {
					uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
						console.log('File available at', downloadURL)
						if (i === 0) {
							setBackID(downloadURL)
						} else {
							setFontID(downloadURL)
						}
						// if (downloadURL && i === 1) {
						// 	saveToDB()
						// }
					})
				}
			)
		})
	}

    useEffect(() => {
        if(backID && fontID){
            saveToDB()
        }
    },[backID, fontID])

	useEffect(() => {
		console.log('THE DATA ---', data)
		if (!data?.idBack) {
			notification.error({ message: 'Please add the back of you ID' })
			changeStep(0)
			return
		}
		if (!data?.idFront) {
			notification.error({ message: 'Please add the front of you ID' })
			changeStep(0)
			return
		}
		if (!data?.name) {
			notification.error({ message: 'Company name is required' })
			changeStep(0)
			return
		}
		if (!data?.officeLocation) {
			changeStep(0)
			notification.error({ message: 'Company location is required' })
			return
		}
		if (!data?.avatar) {
			notification.error({ message: 'Please add an image of yourself' })
			changeStep(1)
			return
		}
		if (!data?.state) {
			notification.error({ message: 'Please select a state' })
			changeStep(2)
			return
		}
		if (data?.locations.length === 0) {
			changeStep(3)
			notification.error({ message: 'Locations are required' })
			return
		}
        uploadIDs()
	}, [])

    if(done){
        return <Redirect to={`/agents/pending/${done}`} />
    }

	return (
		<div>
			<div className="row justify-content-center pt-5 pb-5">
				<div className="col-lg-6 col-sm-12 text-center">
					<Dots />
					<h3 className='fw-600 mt-1 mb-3'>Please wait...</h3>
                    <p>We are trying to create your agent account</p>
				</div>
			</div>
		</div>
	)
}
