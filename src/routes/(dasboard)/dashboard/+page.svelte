<script>
	import Heading from '$lib/components/Heading.svelte'
	import {
		Button,
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell
	} from 'flowbite-svelte'

	export let data
</script>

<svelte:head>
	<title>Credibot - Dashboard</title>
</svelte:head>

<div class="grid gap-8">
	<Heading title="Dashboard" />
	<div class="px-6 grid gap-12">
		<!-- Analytics and statistics -->
		<section class="grid gap-2">
			<h2 class="font-medium text-lg text-gray-500">Analytics and statistics</h2>
			<!-- statistics cards -->
			<div class="stats-cards-grid | gap-8">
				<div class="bg-orange-gradient p-5 rounded-xl text-center">
					<h3 class="text-md font-semibold text-gray-100">Posts</h3>
					<p class="text-gray-50 text-6xl font-black tracking-wider">{data.postsCount}</p>
				</div>
				<div class="bg-blue-gradient p-5 rounded-xl text-center">
					<h3 class="text-md font-semibold text-gray-100">Credible Posts</h3>
					<p class="text-gray-50 text-6xl font-black tracking-wider">{data.crediblePostsCount}</p>
				</div>
				<div class="bg-orange-gradient p-5 rounded-xl text-center">
					<h3 class="text-md font-semibold text-gray-100">Misinformed Posts</h3>
					<p class="text-gray-50 text-6xl font-black tracking-wider">
						{data.misinformedPostsCount}
					</p>
				</div>
				<div class="bg-blue-gradient p-5 rounded-xl text-center">
					<h3 class="text-md font-semibold text-gray-100">Sources</h3>
					<p class="text-gray-50 text-6xl font-black tracking-wider">{data.sourcesCount}</p>
				</div>
			</div>
		</section>
		<!-- Recently checked posts -->
		<section class="grid gap-4">
			<div class="flex items-center gap-8">
				<h2 class="font-medium text-lg text-gray-500">Recently checked posts</h2>
				<a
					href="/dashboard/checks"
					class="inline-flex items-center justify-center px-2 py-1 mr-3 text-sm text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300"
					>View All</a
				>
			</div>
			<Table hoverable={true}>
				<TableHead>
					<TableHeadCell>Source</TableHeadCell>
					<TableHeadCell>Content</TableHeadCell>
					<TableHeadCell>Classification</TableHeadCell>
					<TableHeadCell>Positive Probability</TableHeadCell>
					<TableHeadCell>Negative Probability</TableHeadCell>
					<TableHeadCell>
						<span class="sr-only"> View </span>
					</TableHeadCell>
				</TableHead>
				<TableBody tableBodyClass="divide-y">
					{#if data.recentPosts.length === 0}
						<tr>
							<td class="p-8 text-center space-y-3 border-b border-t border-gray-200" colspan="99">
								<p class="text-base text-gray-500">No records found</p>
								<div class="text-center">
									<Button href="/dashboard/checks/new">Check new post</Button>
								</div>
							</td>
						</tr>
					{:else}
						{#each data.recentPosts as post}
							<TableBodyRow>
								<TableBodyCell>{post.expand?.source.name}</TableBodyCell>
								<TableBodyCell
									><span class="w-60 inline-block truncate">{post.content}</span></TableBodyCell
								>
								<TableBodyCell>{post.classification}</TableBodyCell>
								<TableBodyCell>{post.prob_positive}%</TableBodyCell>
								<TableBodyCell>{post.prob_negative}%</TableBodyCell>
								<TableBodyCell>
									<a
										href={`/dashboard/checks/${post.id}`}
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
	</div>
</div>

<style>
	.stats-cards-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
		gap: 1.5rem;
	}
</style>
