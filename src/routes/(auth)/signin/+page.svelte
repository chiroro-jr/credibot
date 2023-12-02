<script lang="ts">
	import { applyAction, enhance } from '$app/forms'
	import { Button, Label, Input, Helper } from 'flowbite-svelte'
	import type { SubmitFunction } from './$types'
	import { page } from '$app/stores'
	import { Spinner } from 'flowbite-svelte'

	$: ({ form } = $page)

	let loading = false

	const submit: SubmitFunction = ({}) => {
		loading = true

		return async ({ update, result }) => {
			loading = false
			await update()
			await applyAction(result)
		}
	}
</script>

<svelte:head>
	<title>Credibot - Sign In</title>
</svelte:head>

<form class="flex flex-col gap-6" use:enhance={submit} method="POST">
	<h3 class="text-xl font-medium text-gray-900 p-0">Sign In</h3>
	{#if form?.error}
		<Helper class="mt-2" color="red">{form?.error?.message}</Helper>
	{/if}
	<div class="space-y-2">
		<Label class="space-y-2" for="email">Email</Label>
		<Input type="email" name="email" id="email" placeholder="name@company.com" required size="lg" />
	</div>
	<div class="space-y-2">
		<Label class="space-y-2" for="password">Password</Label>
		<Input
			type="password"
			name="password"
			id="password"
			placeholder="••••••••••"
			required
			size="lg"
		/>
	</div>
	<Button disabled={loading} type="submit" size="lg">
		{#if loading}
			<Spinner size="4" />
		{:else}
			Sign In
		{/if}
	</Button>
	<p class="text-sm font-light text-gray-500 -mt-3">
		Don’t have an account yet? <a
			href="/signup"
			class="font-medium text-primary-600 hover:underline">Sign up</a
		>
	</p>
</form>
