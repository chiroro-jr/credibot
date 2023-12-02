<script lang="ts">
	import { Button } from 'flowbite-svelte'
</script>

<svelte:head>
	<title>Credibot - Home</title>
</svelte:head>

<div class="landing grid gap-1">
	<h1
		class="capitalize max-w-xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl"
	>
		Credibot
	</h1>
	<p class="max-w-2xl mb-6 font-light text-gray-800 lg:mb-8 md:text-lg lg:text-xl">
		Welcome to Credibot, a tool for predicting the credibility of social media posts using Machine
		Learning. Designed specifically for end users, the system provides a streamlined approach to
		combatting misinformation on social media.
	</p>
	<div class="flex gap-3">
		<Button href="/signin" size="xl">Sign In</Button>
		<Button href="/signup" size="xl" color="light">Sign Up</Button>
	</div>
</div>
