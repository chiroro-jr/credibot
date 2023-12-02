import { redirect } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'

import status from 'http-status'
import type { PostsResponse, SourcesResponse } from '$lib/pocketbase-types'

interface Expand {
	source: SourcesResponse
}

interface SourceMeta {
	id: string
	name: string
	numberOfPosts: number
	crediblePosts: number
	misinformedPosts: number
}

function getMetaForSource(posts: PostsResponse<Expand>[], source: SourcesResponse) {
	const sourceCounts = {
		id: source.id,
		name: source.name,
		numberOfPosts: 0,
		crediblePosts: 0,
		misinformedPosts: 0
	} satisfies SourceMeta

	posts.forEach((post) => {
		const postSourceName = post.expand?.source.name
		const classification = post.classification

		if (postSourceName === source.name) {
			sourceCounts.numberOfPosts++

			if (classification === 'credible') {
				sourceCounts.crediblePosts++
			} else if (classification === 'not credible') {
				sourceCounts.misinformedPosts++
			}
		}
	})

	return sourceCounts
}

export const load: PageServerLoad = async ({ locals, url }) => {
	const page = url.searchParams.get('page')
	const searchTerm = url.searchParams.get('searchTerm') || ''
	if (!page) {
		throw redirect(status.SEE_OTHER, '/dashboard/sources?page=1')
	}

	const sources = await locals.pb.collection('sources').getList<SourcesResponse>(1, 5, {
		sort: '-created',
		page: Number(page),
		filter: `name~'${searchTerm}'`
	})

	const posts = await locals.pb.collection('posts').getFullList<PostsResponse<Expand>>({
		sort: '-created',
		expand: 'source',
		filter: `user='${locals.user?.id}'&&(source~'${searchTerm}'||content~'${searchTerm}')`
	})

	const sourcesMeta = sources.items.map((source) => getMetaForSource(posts, source))

	return {
		sources,
		sourcesMeta
	}
}
