export const calculateMinutes = (startTime, endTime) => {
	const end = new Date(endTime)
	console.log('GETTING MINUTES --', startTime, end)
	var difference = end.getTime() - startTime.getTime() // This will give difference in milliseconds
	return Math.round(difference / 60000)
}

export const convertTimeTo12Hurs = (time) => {
	if (time) {
		// Check correct time format and split into components
		time = time
			.toString()
			.match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time]

		if (time.length > 1) {
			// If time format correct
			time = time.slice(1) // Remove full string match value
			time[5] = +time[0] < 12 ? 'AM' : 'PM' // Set AM/PM
			time[0] = +time[0] % 12 || 12 // Adjust hours
		}
		return time.join('') || `${time}` // return adjusted time or original string
	} else {
		return 'Time Not Stated'
	}
}

export const calculateDays = (from) => {
	const today = new Date()
	let difference = today.getTime() - new Date(from).getTime()
	let TotalDays = Math.ceil(difference / (1000 * 3600 * 24))
	return TotalDays
}
