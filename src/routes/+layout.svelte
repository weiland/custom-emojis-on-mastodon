<main>
	<slot />
</main>

<style>
	:root {
		--accent: 134, 239, 172;
		--accent-light: 224, 204, 250;
		--accent-dark: 59, 130, 246;
		--accent-gradient: linear-gradient(
			45deg,
			rgb(var(--accent)),
			rgb(var(--accent-dark)) 30%,
			rgb(147, 51, 234) 60%
		);

		--color: #ccc;
		--background-color: #222;

		--smol-icons: 1rem;
		--not-so-smol-icons: 2rem;
		--larger-icons: 3rem;
	}
	:global(html) {
		font-family: system-ui, sans-serif;
		color: var(--color);
		background: var(--background-color);
		background-size: 14rem;
	}

	:global(a) {
		color: rgb(var(--accent-dark));
	}

	:global(h1) {
		background-image: var(--accent-gradient);
		background-clip: text;
		-webkit-text-fill-color: transparent;
		background-size: 120%;
		background-position: 0%;
	}

	main {
		margin: auto;
	}
</style>
