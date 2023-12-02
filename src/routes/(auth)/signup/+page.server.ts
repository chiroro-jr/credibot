import { generateUsername } from '$lib/utils'
import { fail, redirect, type Actions } from '@sveltejs/kit'
import status from 'http-status'
import { ClientResponseError } from 'pocketbase'

interface SignUpInput {
	first_name: string
	last_name: string
	email: string
	password: string
	passwordConfirm: string
}

export const actions: Actions = {
	default: async ({ request, locals }) => {
		const formData = Object.fromEntries(await request.formData()) as unknown as SignUpInput
		const username = generateUsername(formData.first_name)

		try {
			await locals.pb.collection('users').create({ username, ...formData })
		} catch (error) {
			if (error instanceof ClientResponseError) {
				// eslint-disable-next-line @typescript-eslint/no-unused-vars
				const { password, passwordConfirm, ...values } = formData

				return fail(error.status, {
					error: {
						code: error.data.code,
						message: error.data.message
					},
					fieldErrors: error.data.data,
					values
				})
			}
			return fail(status.INTERNAL_SERVER_ERROR, {
				error: {
					message: status['500_MESSAGE']
				}
			})
		}
		throw redirect(status.SEE_OTHER, '/signin')
	}
}
