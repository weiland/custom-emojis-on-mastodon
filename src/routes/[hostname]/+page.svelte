<script lang="ts">
	import type { PageData } from './$types';
	import Form from '../../components/Form.svelte';

	export let data: PageData;

	let emojis: Record<string, { shortcode: string; static_url: string }[]> | undefined = data.emojis;

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
		if (!raw) {
			return 'uncategorised';
		}
		const text = raw.toLowerCase().trim();

		if (text.includes('haj')) {
			return raw + ' 🦈';
		}

		if (text.includes('bread')) {
			return raw + ' 🍞';
		}

		return raw;
	}
</script>

<h1>Custom Emojis of <i>{data.hostname ? data.hostname : 'an invalid'}</i> Mastodon server</h1>
or <a href="#hostname">choose another server</a>
{#if emojis}
	<ul role="list">
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
{:else}
	Could not fetch Emoji-List. Please fix hostname or choose another one.
{/if}
<Form />

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
		grid-template-columns: repeat(auto-fit, minmax(24ch, 1fr));
		gap: 1rem;
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
		padding: calc(1.5rem - 1px);
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
