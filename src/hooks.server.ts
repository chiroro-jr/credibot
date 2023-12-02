import { redirect, type Handle, type HandleServerError } from '@sveltejs/kit'
import { authenticateUser } from '$lib/server/auth'
import status from 'http-status'

export const handle: Handle = async ({ event, resolve }) => {
	authenticateUser(event)

	// protect the entire dashboard instead of doing it per route
	if (event.url.pathname.startsWith('/dashboard')) {
		if (!event.locals.user) {
			// return the user to the signin page
			throw redirect(status.SEE_OTHER, '/signin')
		}
	}

	// wait for handlers to generate the response
	const response = await resolve(event)

	// add auth store state (token, model) to a cookie
	response.headers.set('set-cookie', event.locals.pb.authStore.exportToCookie({ secure: false }))

	return response
}

export const handleError: HandleServerError = async ({ event }) => {
	// 404 - Page not found
	if (event.route.id === null) {
		return {
			message: 'Sorry, that page does not exist.'
		}
	}
	return {
		message: 'Something went wrong. Try again later.'
	}
}
