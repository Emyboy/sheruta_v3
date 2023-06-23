module.exports = {
	APP_URL: 'http://localhost:3000',
	API_URL:
		process.env.NODE_ENV !== 'development'
			? process.env.REACT_APP_API_URL
			: 'http://localhost:1337',
}
