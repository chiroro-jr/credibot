import type { PostsResponse, SourcesResponse, UsersResponse } from '$lib/pocketbase-types'
import type { PageServerLoad } from './$types'

interface Expand {
	user: UsersResponse
	source: SourcesResponse
}

export const load: PageServerLoad = async ({ locals, params }) => {
	const { id } = params
	const post = await locals.pb
		.collection('posts')
		.getOne<PostsResponse<Expand>>(id, { expand: 'source,user' })

	return {
		post
	}
}
