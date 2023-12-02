<section class="auth-layout | min-h-screen">
	<div class="auth | h-full">
		<div class="flex flex-col gap-10 py-10 px-20 bg-white/95 h-full w-full">
			<div>
				<h2
					class="logo font-black text-xl tracking-wider inline-block text-white bg-primary-700 hover:bg-primary-800 rounded p-2"
				>
					<a href="/">Credibot</a>
				</h2>
			</div>
			<slot />
		</div>
	</div>
</section>

<style>
	.auth-layout {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		background-image: url('/social-media.webp');
		background-repeat: no-repeat;
		background-position: center;
		background-size: cover;
	}

	.auth {
		grid-column: 1 / 2;
	}
</style>
