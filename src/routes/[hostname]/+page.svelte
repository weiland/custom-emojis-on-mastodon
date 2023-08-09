<script lang="ts">
	import type { PageData } from './$types';
	import Form from '../../components/Form.svelte';
	import Emojis from '../../components/Emojis.svelte';

	export let data: PageData;
</script>

<h1>Custom Emojis of <i>{data.hostname ? data.hostname : 'an invalid'}</i> Mastodon server</h1>
or&nbsp;<a href="#hostname">choose another server</a>
{#if data.emojis}
	<Emojis emojis={data.emojis} />
{:else}
	Could not fetch Emoji-List. Please fix hostname or choose another one.
{/if}
<Form />

<style>
</style>
