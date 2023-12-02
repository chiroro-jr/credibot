import { redirect } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'

import status from 'http-status'
import type { PostsResponse, SourcesResponse } from '$lib/pocketbase-types'

interface Expand {
	source: SourcesResponse
}

export const load: PageServerLoad = async ({ locals, url }) => {
	const page = url.searchParams.get('page')
	const searchTerm = url.searchParams.get('searchTerm') || ''
	if (!page) {
		throw redirect(status.SEE_OTHER, '/dashboard/checks?page=1')
	}

	const posts = await locals.pb.collection('posts').getList<PostsResponse<Expand>>(1, 5, {
		sort: '-created',
		expand: 'source',
		page: Number(page),
		filter: `user='${locals.user?.id}'&&(source~'${searchTerm}'||content~'${searchTerm}')`
	})

	return {
		posts
	}
}
