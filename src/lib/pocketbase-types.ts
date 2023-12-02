/**
* This file was @generated using pocketbase-typegen
*/

import type PocketBase from 'pocketbase'
import type { RecordService } from 'pocketbase'

export enum Collections {
	Posts = "posts",
	Sources = "sources",
	Users = "users",
}

// Alias types for improved usability
export type IsoDateString = string
export type RecordIdString = string
export type HTMLString = string

// System fields
export type BaseSystemFields<T = never> = {
	id: RecordIdString
	created: IsoDateString
	updated: IsoDateString
	collectionId: string
	collectionName: Collections
	expand?: T
}

export type AuthSystemFields<T = never> = {
	email: string
	emailVisibility: boolean
	username: string
	verified: boolean
} & BaseSystemFields<T>

// Record types for each collection

export type PostsRecord = {
	classification?: string
	content: string
	prob_negative?: number
	prob_positive?: number
	source?: RecordIdString
	user?: RecordIdString
}

export type SourcesRecord = {
	name: string
}

export type UsersRecord = {
	first_name: string
	last_name: string
}

// Response types include system fields and match responses from the PocketBase API
export type PostsResponse<Texpand = unknown> = Required<PostsRecord> & BaseSystemFields<Texpand>
export type SourcesResponse<Texpand = unknown> = Required<SourcesRecord> & BaseSystemFields<Texpand>
export type UsersResponse<Texpand = unknown> = Required<UsersRecord> & AuthSystemFields<Texpand>

// Types containing all Records and Responses, useful for creating typing helper functions

export type CollectionRecords = {
	posts: PostsRecord
	sources: SourcesRecord
	users: UsersRecord
}

export type CollectionResponses = {
	posts: PostsResponse
	sources: SourcesResponse
	users: UsersResponse
}

// Type for usage with type asserted PocketBase instance
// https://github.com/pocketbase/js-sdk#specify-typescript-definitions

export type TypedPocketBase = PocketBase & {
	collection(idOrName: 'posts'): RecordService<PostsResponse>
	collection(idOrName: 'sources'): RecordService<SourcesResponse>
	collection(idOrName: 'users'): RecordService<UsersResponse>
}
