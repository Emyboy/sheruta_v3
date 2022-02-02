const sheruta_defaults = {
	description:
		'Share a flat in Lagos, Abuja, Port Harcourt, Ibadan, etc. Signup and get match with a flat a mate today.',
	image_url: './logos/logo.png',
}

module.exports = {
	renderMetaTags: ({ title, description, image_url, htmlString }) => {
		if (!title && !description) {
			return htmlString
				.replace(
					'<title>Sheruta</title>',
					`<title>Flat, Apartment for share - Sheruta NG</title>`
				)
				.replace('__META_OG_TITLE__', 'Share an apartment today - Login')
				.replace('__META_OG_DESCRIPTION__', sheruta_defaults.description)
				.replace('__META_DESCRIPTION__', sheruta_defaults.description)
				.replace('__META_OG_IMAGE__', image_url)
		}
		return htmlString
			.replace('<title>Sheruta</title>', `<title>${title}</title>`)
			.replace('__META_OG_TITLE__', title)
			.replace('__META_OG_DESCRIPTION__', description)
			.replace('__META_DESCRIPTION__', description)
			.replace('__META_OG_IMAGE__', image_url)
		// .replace('__LOGO__', image_url)
	},

}
