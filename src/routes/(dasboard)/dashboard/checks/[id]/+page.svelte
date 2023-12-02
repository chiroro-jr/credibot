<script lang="ts">
	import type { PageData } from './$types'
	import Heading from '$lib/components/Heading.svelte'
	import { Button } from 'flowbite-svelte'
	import type { PostsResponse } from '$lib/pocketbase-types'

	export let data: PageData

	const afterColor =
		data.post.classification == 'credible' ? 'after:bg-green-400' : 'after:bg-red-400'

	function generateVerdict(post: PostsResponse) {
		switch (post.classification) {
			case 'credible':
				return `Based on the analysis, the probability that the source is <b>credible</b> is approximately <b>${post.prob_positive}%</b>. This points to an indication of the source being credible. However, you still need to check multiple sources and make sure you are getting the correct information`
			case 'not credible':
				return `Based on the analysis, the probability that the source is <b>not credible</b> is approximately <b>${post.prob_negative}%</b>. This points to an indication of the source not being credible. Do some research and check your sources to make sure you are getting the correct information.`
		}
	}
</script>

<svelte:head>
	<title>Credibot - View Post</title>
</svelte:head>

<div class="grid gap-8">
	<Heading title="Post Details">
		<Button href="/dashboard/checks" size="lg">Go Back</Button>
	</Heading>
	<div class="post-grid">
		<!-- Probability ring -->
		<div class="col-[2/-1] row-[1/2]">
			{#if data.post.prob_positive > data.post.prob_negative}
				<!-- show a green ring -->
				<span
					class="bg-green-400 text-white font-bold flex justify-center items-center relative w-20 h-20 rounded-full"
					>{data.post.prob_positive}%
					<span
						class="absolute w-24 h-24 rounded-full bg-green-500 flex justify-center items-center capitalize -bottom-[4.5rem] -right-12 text-sm"
						>{data.post.classification}</span
					>
				</span>
			{:else}
				<!-- show a red ring -->
				<span
					class="bg-red-400 text-white font-bold flex justify-center items-center relative w-20 h-20 rounded-full"
					>{data.post.prob_negative}%
					<span
						class="absolute w-24 h-24 rounded-full bg-red-500 flex justify-center items-center capitalize -bottom-[4.5rem] -right-12 text-sm"
						>{data.post.classification}</span
					>
				</span>
			{/if}
		</div>

		<div class="flex flex-col gap-4">
			<!-- Post source -->
			<div>
				<div
					class="text-[1.5rem] leading-[1.1764705882] text-blue-500 bg-blue-200 font-semibold capitalize inline-block py-2 px-4 rounded-md"
				>
					<p>{`${data.post.expand?.source.name} post`}</p>
				</div>
			</div>
			<!-- Post content -->
			<div class="">
				<p
					class={`text-[3rem] text-gray-800 pl-6 leading-[1.1739130435] font-bold relative after:absolute after:w-[0.5rem] after:top-[0.5rem] after:left-0 after:bottom-0 after:rounded-sm ${afterColor}`}
				>
					{data.post.content}
				</p>
			</div>

			<!-- verdict -->
			<div class="mt-6 grid gap-2">
				<h1 class="text-2xl text-gray-500 font-semibold">Verdict</h1>
				<p class="text-gray-600">{@html generateVerdict(data.post)}</p>
			</div>
		</div>
	</div>
</div>

<style>
	.post-grid {
		display: grid;
		grid-template-columns: 1fr auto;
		grid-template-rows: auto 1fr;
		column-gap: 2rem;
		row-gap: 1rem;
		padding-inline: 10rem;
	}
</style>
