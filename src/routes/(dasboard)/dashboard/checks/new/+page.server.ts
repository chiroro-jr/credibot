import type { PostsResponse, SourcesResponse, UsersResponse } from '$lib/pocketbase-types.js'
import { redirect, fail, type Actions } from '@sveltejs/kit'
import status from 'http-status'
import { z } from 'zod'
import type { PageServerLoad } from './$types.js'
import { ClientResponseError } from 'pocketbase'
import { dev } from '$app/environment'
import { env } from '$env/dynamic/private'
interface Expand {
	source: SourcesResponse
	user: UsersResponse
}

interface PredictionResponse {
	classification: string
	prob_positive: number
	prob_negative: number
}

const createPostSchema = z.object({
	source: z
		.string({ required_error: 'Source is required' })
		.min(1, { message: 'Source is required' }),
	content: z
		.string({ required_error: 'Content is required' })
		.min(1, { message: 'Content is required' })
})

export const load: PageServerLoad = async ({ locals }) => {
	const sources = await locals.pb.collection('sources').getFullList<SourcesResponse>()

	return {
		sources
	}
}

export const actions: Actions = {
	default: async ({ locals, request }) => {
		const formData = Object.fromEntries(await request.formData())
		let postID = ''

		const result = createPostSchema.safeParse(formData)
		if (!result.success) {
			const { fieldErrors } = result.error.flatten()

			return fail(status.BAD_REQUEST, {
				values: formData,
				errors: {
					fieldErrors
				}
			})
		}

		try {
			// make a fetch request to the ML backend to get the prediction for the post
			const mlBackendURL = dev ? 'http://127.0.0.1:8000' : env.ML_BACKEND_PROD_URL
			const res = await fetch(`${mlBackendURL}/predict`, {
				method: 'POST',
				body: JSON.stringify(result.data),
				headers: {
					'Content-Type': 'application/json'
				}
			})
			const prediction: PredictionResponse = await res.json()

			const post = await locals.pb
				.collection('posts')
				.create<PostsResponse<Expand>>({ ...result.data, user: locals.user?.id, ...prediction })

			postID = post.id
		} catch (err) {
			console.log(err)
			if (err instanceof ClientResponseError) {
				return fail(status.BAD_REQUEST, {
					values: formData,
					errors: {
						fieldErrors: {
							...err.response.data
						}
					}
				})
			}

			return fail(status.INTERNAL_SERVER_ERROR, {
				values: formData,
				errors: {
					formError: 'Something went wrong'
				}
			})
		}
		throw redirect(status.SEE_OTHER, `/dashboard/checks/${postID}`)
	}
}
