<script lang="ts">
	import type { PageData } from './$types';
	import { onMount } from 'svelte';
	import Form from '../components/Form.svelte';
	import Emojis from '../components/Emojis.svelte';

	type Emoji = {
		shortcode: string;
		url: string;
		static_url: string;
		visible_in_picker: boolean;
		category: Category;
	};

	type EmojiList = Record<Category, Emoji[]>;

	export let data: PageData;

	let headline = 'Find custom emojis of a mastodon instance';
	let emojis: EmojiList;
	let error: string;

	type Category = string;

	onMount(async () => {
		const hostname = data.hostname;
		console.log('hostname', hostname);

		if (!hostname) {
			return;
		}

		if (!/\./.test(hostname) || hostname.length <= 3) {
			error = 'Please provide a valid hostname.';
			return;
		}

		headline = `Custom Emojis of ${hostname} Mastodon server`;

		const emojisUrl = `https://${hostname}/api/v1/custom_emojis`;
		let res;
		try {
			res = await fetch(emojisUrl);
			if (res.status >= 400) {
				throw new Error(`${res.status} (${res.statusText}) Status received.`);
			}
		} catch (error) {
			console.error('Error during fetch:', error);
			error = `Could not fetch Emoji list from hostname "${hostname}".`;
			return;
		}

		let json: Emoji[];
		try {
			json = await res.json();
		} catch (error) {
			console.error('Error during json parsing:', error);
			error = `Could not parse emoji list from "${emojisUrl}".`;
			return;
		}

		if (!Array.isArray(json) || json.length === 0 || typeof json[0].shortcode === 'undefined') {
			error = 'Could not find any emojis. :c';
			return;
		}

		emojis = json.reduce((acc: EmojiList, item: Emoji) => {
			const { category } = item;
			if (acc[category]) {
				acc[category].push(item);
			} else {
				acc[category] = [item];
			}
			return acc;
		}, {});


		return { emojis, hostname };
	});
</script>

<h1>{headline}</h1>
or&nbsp;<a href="#hostname">choose another server</a>
{#if emojis}
	<Emojis emojis={emojis} />
{:else if error}
	Could not fetch Emoji-List. Please fix hostname or choose another one.
{/if}
<Form />

<style>
</style>
