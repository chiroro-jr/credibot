import { fail, redirect, type Actions } from '@sveltejs/kit'
import status from 'http-status'
import { ClientResponseError } from 'pocketbase'

interface SignInInput {
	email: string
	password: string
}

export const actions: Actions = {
	default: async ({ request, locals }) => {
		const formData = Object.fromEntries(await request.formData()) as unknown as SignInInput

		try {
			await locals.pb.collection('users').authWithPassword(formData.email, formData.password)
		} catch (error) {
			if (error instanceof ClientResponseError) {
				return fail(status.UNAUTHORIZED, {
					error: {
						message: 'Email or password invalid'
					}
				})
			}
			return fail(status.INTERNAL_SERVER_ERROR, {
				error: {
					message: status['500_MESSAGE']
				}
			})
		}

		throw redirect(status.SEE_OTHER, '/dashboard')
	}
}
