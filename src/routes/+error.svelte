<script lang="ts">
	import { page } from '$app/stores'
	import { Button } from 'flowbite-svelte'
</script>

<section class="w-screen h-screen grid place-content-center bg-white">
	<div class="">
		<h1
			class="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-primary-600 text-center"
		>
			{$page.status}
		</h1>
		<p class="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white">
			{$page.error?.message}
		</p>
		<div class="text-center">
			<Button href="/dashboard" color="red">Back To Homepage</Button>
		</div>
	</div>
</section>
