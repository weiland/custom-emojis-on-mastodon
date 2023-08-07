<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;

	let headline = data.hostname
		? `Custom Emojis of ${data.hostname} Mastodon server`
		: 'Custom Emojis on Mastodon servers';

	function shortcode({ shortcode }: { shortcode: string }) {
		return `:${shortcode}:`;
	}

	async function copy(text: string): Promise<void> {
		return navigator.clipboard
			.writeText(text)
			.catch((e) => console.error('Could not copy shortcode to clipboard', text));
	}

	function handleSubmit(event) {
		const data = new FormData(event.target);
		console.log(data);
	}
</script>

<main>
	<h1>{headline}</h1>
	<form action="/" on:submit={handleSubmit}>
		<label for="hostname">Enter Mastodon hostname</label>
		<input
			name="hostname"
			type="text"
			placeholder="Enter Mastodon hostname (without https://)"
			id="hostname"
		/>
		<input type="submit" value="Show me all emojis!" />
	</form>
	{#if data.emojis}
		<ul>
			{#each Object.entries(data.emojis) as [category, emojis]}
				<li>
					<h2>
						{category}
					</h2>
					<ul>
						{#each emojis as emoji}
							<li on:click={() => copy(shortcode(emoji))}>
								<img alt={emoji.shortcode} src={emoji.static_url} lazy />
								{shortcode(emoji)}
							</li>
						{/each}
					</ul>
				</li>
			{/each}
		</ul>
	{:else}
		Choose hostname
	{/if}
</main>
