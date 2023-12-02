import { serializeNonPOJOs } from '$lib/utils'
import { redirect, type RequestEvent } from '@sveltejs/kit'
import { dev } from '$app/environment'
import { env } from '$env/dynamic/private'
import status from 'http-status'
import PocketBase from 'pocketbase'

export function authenticateUser(event: RequestEvent) {
	const pocketbaseURL = dev ? 'http://127.0.0.1:8090' : env.POCKETBASE_PROD_URL
	event.locals.pb = new PocketBase(pocketbaseURL)
	event.locals.pb.authStore.loadFromCookie(event.request.headers.get('cookie') || '')

	// check if the cookie is valid and set event.locals.user
	// might need to implement token autorefresh. Why? -> (await event.locals.pb.collection('users').authRefresh())
	if (event.locals.pb.authStore.isValid) {
		event.locals.user = serializeNonPOJOs(event.locals.pb.authStore.model)
	} else {
		event.locals.user = null
	}
}

export function checkAuth(locals: App.Locals) {
	if (!locals.user) {
		throw redirect(status.SEE_OTHER, '/signin')
	}
}
