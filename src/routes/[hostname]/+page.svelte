<script lang="ts">
	import type { PageData } from './$types';
	import Form from '../../components/Form.svelte';
	import Emojis from '../../components/Emojis.svelte';

	export let data: PageData;
</script>

<h1>Custom Emojis of <i>{'hostname' in data && data.hostname ? data.hostname : 'an invalid'}</i> Mastodon server</h1>
or&nbsp;<a href="#hostname">choose another server</a>
{#if 'emojis' in data && data.emojis}
	<Emojis emojis={data.emojis} />
{:else if 'error' in data && data.error}
	Could not fetch Emoji-List. Please fix hostname or choose another one.
{/if}
<Form />

<style>
</style>
