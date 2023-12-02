<script lang="ts">
	import { Button, Helper, Input, Label, Select, Spinner, Textarea } from 'flowbite-svelte'
	import Heading from '$lib/components/Heading.svelte'
	import { applyAction, enhance } from '$app/forms'
	import { page } from '$app/stores'
	import type { SubmitFunction } from './$types'

	export let data

	let selectedSource = ''
	let loading = false

	$: ({ form } = $page)

	const submit: SubmitFunction = () => {
		loading = true

		return async ({ result, update }) => {
			loading = false
			await update()
			await applyAction(result)
		}
	}

	const sources = data.sources.map((source) => ({
		value: source.id,

		name: source.name
	}))
</script>

<div class="grid gap-8">
	<Heading title="Check a new post">
		<Button href="/dashboard/checks" size="lg">Go Back</Button>
	</Heading>

	<form use:enhance={submit} class="form-grid | px-6 gap-14" method="post">
		<p class="mb-4 text-lg font-normal text-gray-500">Post Details</p>
		<div>
			<div class="grid gap-4 sm:grid-cols-2 sm:gap-6 w-[600px]">
				<div class="sm:col-span-2">
					<Label for="source"
						>Source
						<Select
							color={form?.errors?.fieldErrors?.source ? 'red' : 'base'}
							class="mt-2"
							name="source"
							id="source"
							items={sources}
							bind:value={selectedSource}
						/>
						{#if form?.errors?.fieldErrors?.source}
							{#each form?.errors?.fieldErrors?.source as error}
								<Helper class="mt-2" color="red">{error}</Helper>
							{/each}
						{/if}
					</Label>
				</div>
				<div class="sm:col-span-2">
					<Label for="home" class="mb-2">Content</Label>
					<Textarea
						value={form?.values?.content ?? ''}
						color={form?.errors?.fieldErrors?.content ? 'red' : 'base'}
						id="content"
						placeholder="Enter the content of the social media post"
						rows="10"
						name="content"
					/>
					{#if form?.errors?.fieldErrors?.content}
						{#each form?.errors?.fieldErrors?.content as error}
							<Helper class="mt-2" color="red">{error}</Helper>
						{/each}
					{/if}
				</div>
				<div class="sm:col-span-2">
					<Button type="submit">
						{#if loading}
							<Spinner size="4" />
							<span class="ml-2">Checking...</span>
						{:else}
							Check Post
						{/if}
					</Button>
				</div>
			</div>
		</div>
	</form>
</div>

<style>
	.form-grid {
		display: grid;
		grid-template-columns: auto 1fr;
	}
</style>
