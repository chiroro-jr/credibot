<script>
	import { page } from '$app/stores'
	import {
		Sidebar,
		SidebarDropdownItem,
		SidebarDropdownWrapper,
		SidebarGroup,
		SidebarItem,
		SidebarWrapper
	} from 'flowbite-svelte'
	$: activeUrl = $page.url.pathname

	let nonActiveClass =
		'flex items-center p-2 text-base font-normal text-gray-600 rounded hover:bg-primary-100 rounded font-semibold capitalize'
	let activeClass =
		'flex items-center p-2 text-base font-normal text-white bg-primary-700 hover:bg-primary-800 rounded font-semibold capitalize'

	export let data

	const links = [
		{
			name: 'dashboard',
			url: '/dashboard'
		},
		{
			name: 'all checks',
			url: '/dashboard/checks'
		},
		{
			name: 'all sources',
			url: '/dashboard/sources'
		},
		{
			name: 'new check',
			url: '/dashboard/checks/new'
		}
	]
</script>

<section class="dashboard-grid | h-screen w-full overflow-hidden">
	<Sidebar
		asideClass="w-72 border-r-gray-100 border-r-2"
		{activeUrl}
		{activeClass}
		{nonActiveClass}
	>
		<SidebarWrapper
			divClass="h-full overflow-y-auto p-6 
		rounded flex flex-col gap-6"
		>
			<SidebarGroup>
				<h1
					class="bg-gray-500 text-gray-200 rounded font-black text-center p-4 tracking-widest text-2xl uppercase"
				>
					Credibot
				</h1>
			</SidebarGroup>
			<SidebarGroup>
				{#each links as { name, url }}
					<SidebarItem label={name} active={url === activeUrl} href={url} />
				{/each}
			</SidebarGroup>
			<SidebarGroup ulClass="space-y-2 mt-auto">
				<SidebarDropdownWrapper label={`${data?.user?.first_name} ${data?.user?.last_name}`}>
					<SidebarDropdownItem label="Sign Out" href="/signout" />
				</SidebarDropdownWrapper>
			</SidebarGroup>
		</SidebarWrapper>
	</Sidebar>
	<main class="overflow-auto relative">
		<slot />
	</main>
</section>

<style>
	.dashboard-grid {
		display: grid;
		grid-template-columns: auto 1fr;
		grid-template-rows: 1fr;
	}
</style>
