<script lang="ts">
	import type { PageData } from './$types';
	import Form from '../components/Form.svelte';
	import Emojis from '../components/Emojis.svelte';

	export let data: PageData;

	let headline = data.hostname
		? `Custom Emojis of ${data.hostname} Mastodon server`
		: 'Find custom emojis of a mastodon instance';
</script>

<h1>{headline}</h1>
or&nbsp;<a href="#hostname">choose another server</a>
{#if data.emojis}
	<Emojis emojis={data.emojis} />
{:else if data.error}
	Could not fetch Emoji-List. Please fix hostname or choose another one.
{/if}
<Form />

<style>
</style>
