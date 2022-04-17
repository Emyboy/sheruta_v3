export const calculateMinutes = (startTime, endTime) => {
	const end = new Date(endTime)
	console.log('GETTING MINUTES --', startTime, end)
	var difference = end.getTime() - startTime.getTime() // This will give difference in milliseconds
	return Math.round(difference / 60000)
}
