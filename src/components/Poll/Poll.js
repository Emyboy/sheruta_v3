import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import { useSelector } from 'react-redux'
import { BsCheckCircleFill } from 'react-icons/bs'

export default function Poll() {
	const [data, setData] = useState(null)
	const [answer, setAnswer] = useState(null)
	const { user } = useSelector((state) => state.auth)
	const { personal_info } = useSelector((state) => state.view)
	const [done, setDone] = useState(false)

	const getPoll = useCallback(async () => {
		try {
			const res = await axios(process.env.REACT_APP_API_URL + `/polls`, {
				headers: {
					authorization: `Bearer ${Cookies.get('token')}`,
				},
			})
			// console.log('RES --', res.data)
			setData(res.data[0])
		} catch (error) {
			return Promise.reject(error)
		}
	}, [])

	const sendPoll = async () => {
		try {
			const res = await axios(process.env.REACT_APP_API_URL + `/poll-answers`, {
				headers: {
					authorization: `Bearer ${Cookies.get('token')}`,
				},
				data: {
					user: user?.user?.id,
					poll: data?.id,
					answer,
					personal_info: personal_info?.id,
				},
				method: 'POST',
			})
			if (res.data) {
				setTimeout(() => {
                    setDone(true)
                }, 2000);
				setTimeout(() => {
					setData(null)
				}, 4000)
                Cookies.set('poll', true, { expires: 14 })
			}
		} catch (error) {
			return Promise.reject(error)
		}
	}

    const checkPollAnswer = useCallback(async () => {
        try {
            const res = await axios(process.env.REACT_APP_API_URL + `/poll-answers/?user=${user?.user?.id}`, {
                headers: {
                    authorization: `Bearer ${Cookies.get('token')}`
                }
            });
            if(res.data.length > 0){
                setData(null)
                
            }else {
                getPoll()
            }
        } catch (error) {
            return Promise.reject(error)
        }
    },[])

	useEffect(() => {
		if (answer) {
			sendPoll()
		}
	}, [answer])

	useLayoutEffect(() => {
		if(!Cookies.get('poll')){
            checkPollAnswer()
        }
	}, [checkPollAnswer])

	if (!data) {
		return null
	}

	return (
		<div className="card rounded-xxl p-3 mb-3 animate__fadeIn animate__animated ">
			{done ? (
				<div className="text-center pt-5 pb-5 animate__animated animate__heartBeat">
					<BsCheckCircleFill className="text-theme mb-3" size={80} />
					<h1>Thank you!</h1>
				</div>
			) : (
				<div>
					<div className="text-center mb-4">
						<h1>{data?.question}</h1>
					</div>
					{data?.questions?.map((val) => {
						return (
							<EachOption
								key={val}
								data={val}
								onSelect={() => setAnswer(val)}
								selected={answer === val}
							/>
						)
					})}
				</div>
			)}
		</div>
	)
}

const EachOption = ({ data, onSelect, selected }) => {
	return (
		<div
			className={`btn w-100 bg-theme-light rounded-xxl mb-3 fw-600 pt-3 pb-3 ${
				selected
					? 'border-3 border-success shadow text-success animate__flash animate__animated '
					: `text-black`
			}`}
			onClick={onSelect}
		>
			{data}
		</div>
	)
}
