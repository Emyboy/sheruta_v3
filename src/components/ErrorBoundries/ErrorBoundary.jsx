import React from 'react';

export default class ErrorBoundary extends React.Component {
	constructor(props) {
		super(props)
		this.state = { hasError: false }
	}

	static getDerivedStateFromError(error) {
		// Update state so the next render will show the fallback UI.
		return { hasError: true }
	}

	componentDidCatch(error, errorInfo) {
		// You can also log the error to an error reporting service
		// logErrorToMyService(error, errorInfo)
	}

	render() {
		if (this.state.hasError) {
			// You can render any custom fallback UI
			return (
				<div className="alert alert-danger text-center" role="alert">
					<h1 className=''>Something went wrong.</h1>
					<h4 className=''>Please reload the page and try again.</h4>
				</div>
			)
		}

		return this.props.children
	}
}
