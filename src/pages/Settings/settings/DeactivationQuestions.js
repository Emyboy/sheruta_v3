import React, { useEffect, useState } from 'react'
import EachQuestionSelect from '../components/EachQuestionSelect'

export default function DeactivationQuestions() {
	const [firstAns, setFirstAns] = useState(null)
	const [secondAns, setSecondAns] = useState(null)
	const firstQuests = [
		'I found a flat mate on Sheruta NG',
		`I found a flat mate else where`,
	]
	const secondQues = [
		`I wasn't getting good matches`,
		`I wasn't getting any phone calls`,
		`The platform was difficult to use`,
		`Nothing at all`,
	]

	useEffect(() => {
		if (firstAns) {
			setSecondAns(null)
		}
	}, [firstAns])

	return (
		<div className="card-body mb-5 mt-5">
			<h1 className="mb-4">To continue answer these 2 questions</h1>
			<div className="mb-5">
				<h4>1. Why are you deactivating your account?</h4>
				<ul>
					<li>
						<EachQuestionSelect
							answer={firstQuests[0]}
							onSelect={(e) => setFirstAns(e)}
							selected={firstAns === firstQuests[0]}
						/>
					</li>
					<li>
						<EachQuestionSelect
							answer={firstQuests[1]}
							onSelect={(e) => setFirstAns(e)}
							selected={firstAns === firstQuests[1]}
						/>
					</li>
				</ul>
			</div>
			{firstQuests.indexOf(firstAns) === 0 && (
				<div className="mb-5">
					<h4>
						2. On a scale of 1 - 5 How likely are you to recommend sheruta to
						someone else?
					</h4>
					<ul>
						{[1, 2, 3, 4, 5].map((val, i) => {
							return (
								<li>
									<EachQuestionSelect
										answer={`${val}`}
										key={`options-${i}`}
										onSelect={(e) => setSecondAns(e)}
										selected={secondAns === `${val}`}
									/>
								</li>
							)
						})}
					</ul>
				</div>
			)}
			{firstQuests.indexOf(firstAns) === 1 && (
				<div className="mb-5">
					<h4>2. What did you find most challenging about the platform?</h4>
					{secondQues.map((val, i) => {
						return (
							<ul>
								<EachQuestionSelect
									answer={val}
									onSelect={(e) => setSecondAns(e)}
									selected={secondAns === `${val}`}
								/>
							</ul>
						)
					})}
				</div>
			)}
			<div className="text-center">
				<button
					disabled={firstAns === null || secondAns === null}
					onClick={() => alert('yo')}
					className="btn w-50 bg-danger text-center text-white font-xsss fw-600 p-3 w175 rounded-3 d-inline-block"
				>
					Continue
				</button>
			</div>
		</div>
	)
}
