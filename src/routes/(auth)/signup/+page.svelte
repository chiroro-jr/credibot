<script lang="ts">
	import { applyAction, enhance } from '$app/forms'
	import { page } from '$app/stores'
	import type { SubmitFunction } from '@sveltejs/kit'
	import { Button, Label, Input, Helper, Spinner } from 'flowbite-svelte'

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
	<title>CPRMS - Create New Account</title>
</svelte:head>

<form class="flex flex-col gap-6" method="POST" use:enhance={submit}>
	<h3 class="text-xl font-medium text-gray-900 dark:text-white p-0">Create an account</h3>
	<div class="space-y-2">
		<Label for="firstName">First Name</Label>
		<Input
			value={form?.values?.first_name ?? ''}
			type="text"
			name="first_name"
			id="first_name"
			placeholder="Jane"
			required
			color={form?.fieldErrors?.first_name ? 'red' : 'base'}
			size="lg"
		/>
		{#if form?.fieldErrors?.first_name}
			<Helper class="mt-2" color="red">{form?.fieldErrors?.first_name?.message}</Helper>
		{/if}
	</div>
	<div class="space-y-2">
		<Label class="space-y-2" for="lastName">Last Name</Label>
		<Input
			value={form?.values?.last_name ?? ''}
			type="text"
			name="last_name"
			id="last_name"
			placeholder="Doe"
			required
			color={form?.fieldErrors?.last_name ? 'red' : 'base'}
			size="lg"
		/>
		{#if form?.fieldErrors?.last_name}
			<Helper class="mt-2" color="red">{form?.fieldErrors?.last_name?.message}</Helper>
		{/if}
	</div>
	<div class="space-y-2">
		<Label for="email">Email</Label>
		<Input
			value={form?.values?.email ?? ''}
			type="email"
			name="email"
			id="email"
			placeholder="name@company.com"
			required
			color={form?.fieldErrors?.email ? 'red' : 'base'}
			size="lg"
		/>
		{#if form?.fieldErrors?.email}
			<Helper class="mt-2" color="red">{form?.fieldErrors?.email?.message}</Helper>
		{/if}
	</div>
	<div class="space-y-2">
		<Label for="password">Password</Label>
		<Input
			type="password"
			name="password"
			color={form?.fieldErrors?.password ? 'red' : 'base'}
			id="password"
			placeholder="••••••••••"
			size="lg"
			required
		/>
		{#if form?.fieldErrors?.password}
			<Helper class="mt-2" color="red">{form?.fieldErrors?.password?.message}</Helper>
		{/if}
	</div>
	<div class="space-y-2">
		<Label for="passwordConfirm">Confirm Password</Label>
		<Input
			type="password"
			name="passwordConfirm"
			id="passwordConfirm"
			placeholder="••••••••••"
			required
			color={form?.fieldErrors?.passwordConfirm ? 'red' : 'base'}
			size="lg"
		/>
		{#if form?.fieldErrors?.passwordConfirm}
			<Helper class="mt-2" color="red">{form?.fieldErrors?.passwordConfirm?.message}</Helper>
		{/if}
	</div>
	<Button disabled={loading} type="submit" class="w-full" size="lg">
		{#if loading}
			<Spinner size="4" />
		{:else}
			Create an account
		{/if}
	</Button>
	<div class="text-sm font-light text-gray-500 -mt-3">
		Already have an account? <a href="/signin" class="font-medium text-primary-600 hover:underline"
			>Sign In Here</a
		>
	</div>
</form>
