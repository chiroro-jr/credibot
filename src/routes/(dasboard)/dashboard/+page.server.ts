import type { PostsResponse, SourcesResponse, UsersResponse } from '$lib/pocketbase-types'
import type { PageServerLoad } from './$types'

interface Expand {
	source: SourcesResponse
	user: UsersResponse
}

export const load: PageServerLoad = async ({ locals }) => {
	// all posts by a user (the number)
	const allPosts = await locals.pb.collection('posts').getFullList<PostsResponse<Expand>>({
		expand: 'source,user',
		filter: `user="${locals.user?.id}"`
	})

	// all posts count
	const postsCount = allPosts.length

	// 5-10 most recent checks by a user
	const recentPosts = allPosts.slice(0, 5)

	// credible posts
	const crediblePostsCount = allPosts.filter((post) => post.classification == 'credible').length

	// misinformed posts
	const misinformedPostsCount = allPosts.filter(
		(post) => post.classification == 'not credible'
	).length

	// sources
	const sourcesCount = (await locals.pb.collection('sources').getFullList()).length

	return {
		postsCount,
		recentPosts,
		crediblePostsCount,
		misinformedPostsCount,
		sourcesCount
	}
}
