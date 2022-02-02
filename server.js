const express = require('express')
const path = require('path')
const dotenv = require('dotenv')
dotenv.config()
const fs = require('fs')
const metaUtils = require('./api/utils/meta.utils')
const axios = require('axios')
const app = express()

const PORT = process.env.PORT || 8080
const indexPath = path.resolve(__dirname, './', 'build', 'index.html')

// static resources should just be served as they are
app.use(
	express.static(path.resolve(__dirname, '..', 'build'), { maxAge: '30d' })
)

// here we serve the index.html page
// listening...
app.listen(PORT, (error) => {
	if (error) {
		return console.log('Error during app startup', error)
	}
	console.log('listening on ' + PORT + '...')
})

app.get('/request/:title/:id', (req, res, next) => {
	try {
		fs.readFile(indexPath, 'utf8', async (err, htmlData) => {
			// console.log('STRING --', htmlData)
			const theString = htmlData;
			if (err) {
				console.error('Error during file reading', err)
				return res.status(404).end()
			}

			const { id } = req.params
			const url = process.env.REACT_APP_API_URL + '/property-requests/?id=' + id
			const _res = await axios(url)
            console.log('url ==', url)
			console.log('RES --', _res.data)
			const data = _res.data.length === 0 ? null : _res.data[0]

			// if (!post) return res.status(404).send('Post not found')
			// console.log('REQUEST --', data)
			// inject meta tags
			if (data) {
				htmlData = metaUtils.renderMetaTags({
					htmlString: theString,
					image_url: './logos/logo.png',
					title: metaUtils.renderRequestTitle(data),
					description: data?.body,
				})
			}
			return res.send(htmlData)
		})
	} catch (error) {
		console.log('THE ERROR --', error)
		res.send('<h1>Server Error</h1>')
		return Promise.reject(error)
	}
})

app.get(['/index.html', '/'], (req, res, next) => {
	try {
		fs.readFile(indexPath, 'utf8', (err, htmlData) => {
			if (err) {
				console.error('Error during file reading', err)
				return res.status(404).end()
			}

			// if (!post) return res.status(404).send('Post not found')

			// inject meta tags
			htmlData = metaUtils.renderMetaTags({
				htmlString: htmlData,
				image_url: './logos/logo.png',
			})
			return res.send(htmlData)
		})
	} catch (error) {
		return res.send('<h1>Server Error</h1>')
	}
})

app.use(express.static(path.resolve(__dirname, 'build')))

app.get('/feeds', (req, res, next) => {
	try {
		fs.readFile(indexPath, 'utf8', (err, htmlData) => {
			if (err) {
				console.error('Error during file reading', err)
				return res.status(404).end()
			}

			// if (!post) return res.status(404).send('Post not found')

			// inject meta tags
			htmlData = metaUtils.renderMetaTags({
				htmlString: htmlData,
				image_url: './logos/logo.png',
				title: "Feeds - Sheruta"
			})
			return res.send(htmlData)
		})
	} catch (error) {
		return res.send('<h1>Server Error</h1>')
	}
})
app.get('*', (req, res, next) => {
	try {
		fs.readFile(indexPath, 'utf8', (err, htmlData) => {
			if (err) {
				console.error('Error during file reading', err)
				return res.status(404).end()
			}

			// if (!post) return res.status(404).send('Post not found')

			// inject meta tags
			htmlData = metaUtils.renderMetaTags({
				htmlString: htmlData,
				image_url: './logos/logo.png',
			})
			return res.send(htmlData)
		})
	} catch (error) {
		return res.send('<h1>Server Error</h1>')
	}
})
