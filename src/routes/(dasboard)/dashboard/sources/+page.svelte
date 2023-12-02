<script lang="ts">
	import Heading from '$lib/components/Heading.svelte'
	import {
		Button,
		Search,
		TableHead,
		TableHeadCell,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		Table,
		PaginationItem
	} from 'flowbite-svelte'
	import { page } from '$app/stores'
	import TableHeader from '$lib/components/TableHeader.svelte'
	import { goto } from '$app/navigation'

	export let data
	$: currentPage = $page.url.searchParams.get('page')
	let searchTerm = ''
	const previous = async () => {
		if (data.sources.page === 1 || data.sources.totalPages === 1) return

		const searchParams = new URLSearchParams({
			searchTerm,
			page: (Number(currentPage) - 1).toString()
		})

		await goto(`/dashboard/checks?${searchParams.toString()}`)
	}
	const next = async () => {
		if (data.sources.page === data.sources.totalPages || data.sources.totalPages === 1) return

		const searchParams = new URLSearchParams({
			searchTerm,
			page: (Number(currentPage) + 1).toString()
		})

		await goto(`/dashboard/sources?${searchParams.toString()}`)
	}

	const search = async () => {
		const searchParams = new URLSearchParams({
			searchTerm,
			page: '1'
		})

		await goto(`/dashboard/sources?${searchParams.toString()}`)
	}

	const clear = async () => {
		searchTerm = ''
		await goto('/dashboard/sources?page=1')
	}
</script>

<svelte:head>
	<title>Credibot - Social media sources</title>
</svelte:head>

<div class="grid gap-8">
	<Heading title="All Sources" />

	<div class="px-6 grid gap-10">
		<TableHeader headerType="search">
			<Search slot="search" size="md" bind:value={searchTerm} />
			{#if searchTerm != ''}
				<Button on:click={clear} color="red">Clear Search</Button>
			{/if}
			<Button disabled={data.sources.items.length === 0} type="button" on:click={search}
				>Search sources</Button
			>
		</TableHeader>
		<section class="grid gap-4">
			<Table hoverable={true}>
				<TableHead>
					<TableHeadCell>Name</TableHeadCell>
					<TableHeadCell>Checks</TableHeadCell>
					<TableHeadCell>Credible Checks</TableHeadCell>
					<TableHeadCell>Misinformed Checks</TableHeadCell>
					<TableHeadCell>
						<span class="sr-only"> View </span>
					</TableHeadCell>
				</TableHead>
				<TableBody tableBodyClass="divide-y">
					{#if data.sourcesMeta.length === 0}
						<tr>
							<td class="p-8 text-center space-y-3 border-b border-t border-gray-200" colspan="99">
								<p class="text-base text-gray-500">No records found</p>
								<div class="text-center">Contact admin to add more sources</div>
							</td>
						</tr>
					{:else}
						{#each data.sourcesMeta as meta}
							<TableBodyRow>
								<TableBodyCell>{meta.name}</TableBodyCell>
								<TableBodyCell>{meta.numberOfPosts}</TableBodyCell>
								<TableBodyCell>{meta.crediblePosts}</TableBodyCell>
								<TableBodyCell>{meta.misinformedPosts}</TableBodyCell>
								<TableBodyCell>
									<a
										href={`/dashboard/checks?page=1&searchTerm=${meta.id}`}
										class="font-medium text-blue-600 hover:underline dark:text-blue-500"
									>
										View
									</a>
								</TableBodyCell>
							</TableBodyRow>
						{/each}
					{/if}
				</TableBody>
			</Table>
		</section>

		{#if data.sources.items.length > 0}
			<div class="flex gap-2 items-center justify-between">
				<PaginationItem class="flex items-center" on:click={previous}>
					<svg
						class="mr-2 w-5 h-5"
						fill="currentColor"
						viewBox="0 0 20 20"
						xmlns="http://www.w3.org/2000/svg"
						><path
							fill-rule="evenodd"
							d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
							clip-rule="evenodd"
						/></svg
					>
					Previous
				</PaginationItem>
				<div class="text-sm text-gray-700 dark:text-gray-400">
					Showing <span class="font-semibold text-gray-900 dark:text-white"
						>{(data.sources.page - 1) * data.sources.perPage + 1}</span
					>
					to
					<span class="font-semibold text-gray-900 dark:text-white"
						>{data.sources.perPage * data.sources.page}</span
					>
					of
					<span class="font-semibold text-gray-900 dark:text-white">{data.sources.totalItems}</span>
					Entries
				</div>
				<PaginationItem class="flex items-center" on:click={next}>
					Next
					<svg
						class="ml-2 w-5 h-5"
						fill="currentColor"
						viewBox="0 0 20 20"
						xmlns="http://www.w3.org/2000/svg"
						><path
							fill-rule="evenodd"
							d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
							clip-rule="evenodd"
						/></svg
					>
				</PaginationItem>
			</div>
		{/if}
	</div>
</div>
