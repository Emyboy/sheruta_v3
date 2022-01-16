import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import BtnSelectors from '../components/BtnSelectors'

export default function Selectors({ done, data, setData }) {
	const { categories, amenities, payment_types, states } = useSelector(
		(state) => state.view
	)

	const [state, setState] = useState({
		state: null,
		amenities: [],
		state: null,
		categorie: null,
		payment_type: null,
	})

	useEffect(() => {
		console.log(state)
		setData(state);
	}, [state]);

    useEffect(() => {
        setState({...state, ...data})
    },[])

	return (
		<div>
			<BtnSelectors
				data={categories}
				setData={(e) => setState({ ...state, categorie: e })}
				heading={'Type'}
				sub_heading={''}
				selected={state?.categorie}
				sub_heading="What type of apartment?"
			/>
			<BtnSelectors
				data={payment_types}
				setData={(e) => setState({ ...state, payment_type: e })}
				heading={'Payment Type'}
				sub_heading={''}
				selected={state?.payment_type}
			/>
			<BtnSelectors
				data={states}
				setData={(e) => setState({ ...state, state: e })}
				heading={'What State?'}
				sub_heading={''}
				selected={state?.state}
			/>
			<BtnSelectors
				data={amenities}
				setData={(e) =>
					setState({ ...state, amenities: [...state.amenities, e] })
				}
				heading={'Amenities'}
				sub_heading={''}
				selected={state?.amenities}
				multi
				remove={(e) =>
					setState({...state, amenities: state.amenities.filter((x) => x !== e) })
				}
			/>
		</div>
	)
}
