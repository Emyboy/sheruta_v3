module.exports = {
	renderRequestURL: (request) => {
		const title = `${
			request?.is_searching
				? `Looking for ${request?.category ? request?.category?.name : ''} in`
				: `${request?.category ? request?.category?.name : ''} for share in`
		} ${request?.location}`?.replace(/\s/g, '-')?.toLocaleLowerCase()?.replace(`/`,'-')
			
		return `/request/${title}/${request?.id}`
	},
}
