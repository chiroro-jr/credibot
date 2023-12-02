import PocketBase, { type AuthModel } from 'pocketbase'
// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			user: AuthModel | null
			pb: PocketBase
		}
		// interface PageData {}
		// interface Platform {}
	}
}

export {}
