<script lang="ts">
	export let title: string
</script>

<h1
	class="font-bold text-3xl px-6 py-4 bg-gray-50 text-gray-600 flex justify-between items-center sticky left-0 top-0 right-0 z-10"
>
	<span>{title}</span>
	<span>
		<slot />
	</span>
</h1>
