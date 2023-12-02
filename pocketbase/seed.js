import fs from 'fs'
import PocketBase from 'pocketbase'

const pb = new PocketBase('https://credibot.fly.dev')

const json = fs.readFileSync('seed_posts.json', 'utf8')
const data = JSON.parse(json)

for (let post of data) {
	try {
		const { prediction, ...rest } = post
		await pb.collection('posts').create({ ...rest, ...prediction })
	} catch (e) {
		console.log(e)
	}
}
