<script lang="ts">
	export let emojis: Record<string, { shortcode: string; static_url: string }[]>;

	function shortcode({ shortcode }: { shortcode: string }) {
		return `:${shortcode}:`;
	}

	async function copy(text: string): Promise<void> {
		return navigator.clipboard
			.writeText(text)
			.catch((e) => console.error('Could not copy shortcode to clipboard', text, e));
	}

	function isQueer(raw: string): boolean {
		const text = raw.toLowerCase().trim();
		return text.includes('queer') || text.includes('lgbt');
	}

	function enhanceCategory(raw: string): string {
		if (!raw || raw === 'undefined') {
			return 'uncategorised';
		}
		const text = raw.toLowerCase().trim();

		if (text.includes('cat')) {
			return raw + ' 🐈‍⬛';
		}

		if (text.includes('haj')) {
			return raw + ' 🦈';
		}

		if (text.includes('bread')) {
			return raw + ' 🍞';
		}

		return raw;
	}
</script>

<ul role="list" class="emojis">
	{#each Object.entries(emojis) as [category, emojiList]}
		<li>
			<h2 class={isQueer(category) ? 'text-rainbow' : ''}>
				{enhanceCategory(category)}
			</h2>
			<ul role="list" class="list">
				{#each emojiList as emoji}
					<li class="item">
						<button
							class="btn"
							on:click={() => copy(shortcode(emoji))}
							title={`Copy ${shortcode(emoji)}`}
						>
							<img alt={emoji.shortcode} src={emoji.static_url} loading="lazy" />
							{shortcode(emoji)}
						</button>
					</li>
				{/each}
			</ul>
		</li>
	{/each}
</ul>

<style>
	.emojis {
		position: relative;
	}

	.emojis h2 {
		top: 0;
		position: sticky;
	}

	.text-rainbow {
		display: inline-block;
		background-image: linear-gradient(to left, violet, indigo, blue, green, yellow, orange, red);
		background-clip: text;
		-webkit-text-fill-color: transparent;
	}
	ul {
		list-style: none;
	}
	.list {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(20ch, 1fr));
		gap: 0.75rem;
		align-items: start;
		justify-items: center;
	}

	.item {
		padding: 1px;
		background-color: #23262d;
		background-image: none;
		background-size: 400%;
		border-radius: 7px;
		background-position: 100%;
		transition: background-position 0.6s cubic-bezier(0.22, 1, 0.36, 1);
		box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.1);
	}
	.item:is(:hover, :focus-within) {
		background-position: 0;
		background-image: var(--accent-gradient);
	}
	.btn:focus-visible {
		outline: none;
		transition: none;
		box-shadow: 0 0 0 2px var(--background-color), 0 0 0 4px red;
	}
	.btn {
		width: 100%;
		line-height: 1.4;
		padding: 0.4rem 0.75rem;
		border: 0;
		border-radius: 8px;
		color: white;
		background-color: #23262d;
		opacity: 1;
	}
	img {
		margin-right: 0.5rem;
		width: var(--smol-icons);
	}
</style>
