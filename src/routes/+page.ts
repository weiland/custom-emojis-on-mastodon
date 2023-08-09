import type { PageLoad } from './$types';

export type Category = string;

export type Emoji = {
	shortcode: string,
	url: string,
	static_url: string,
	visible_in_picker: boolean,
	category: Category
};

export const load = (async ({ fetch, url }) => {

	const hostname = url.searchParams.get('hostname');
	if (!hostname) {
		return {};
		// return { error: 'Please provide a hostname.' };
	}

	if (!/\./.test(hostname) || hostname.length <= 3) {
		return { error: 'Please provide a valid hostname.' };
	}

	const emojisUrl = `https://${hostname}/api/v1/custom_emojis`;
	let res;
	try {
		res = await fetch(emojisUrl);
	} catch (error) {
		console.error('Error during fetch:', error);
		return { error: `Could not fetch Emoji list from hostname "${hostname}".` };
	}

	let json: Emoji[];
	try {
		json = await res.json();
	} catch (error) {
		console.error('Error during json parsing:', error);
		return { error: `Could not parse emoji list from "${emojisUrl}".` };
	}

	if (!Array.isArray(json) || json.length === 0 || typeof json[0].shortcode === 'undefined') {
		return { error: 'Could not find any emojis. :c' };
	}

	const emojis: Record<Category, Emoji[]> = json.reduce((acc: Record<Category, Emoji[]>, item: Emoji) => {
		const { category } = item;
		if (acc[category]) {
			acc[category].push(item);
		} else {
			acc[category] = [item];
		}
		return acc;
	}, {});

	return { emojis, hostname };

}) satisfies PageLoad;
