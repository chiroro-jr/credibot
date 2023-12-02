import { redirect } from '@sveltejs/kit'
import status from 'http-status'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ locals }) => {
	locals.pb.authStore.clear()
	locals.user = null

	throw redirect(status.SEE_OTHER, '/signin')
}
