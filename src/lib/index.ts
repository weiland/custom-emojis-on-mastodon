import type { PageLoad } from '../routes/[hostname]/$types';

export type Category = string;

export type Emoji = {
	shortcode: string,
	url: string,
	static_url: string,
	visible_in_picker: boolean,
	category: Category
};

export type EmojiList = Record<Category, Emoji[]>;

export const fetchEmojis = (async ({ fetch, url, params }) => {

	// Support both ways of retrieving the hostname
	const hostname = params.hostname || url.searchParams.get('hostname');
	console.log(url, hostname)
	if (!hostname) {
		return {};
	}

	if (!/\./.test(hostname) || hostname.length <= 3) {
		return { error: 'Please provide a valid hostname.' };
	}

	const emojisUrl = `https://${hostname}/api/v1/custom_emojis`;
	let res;
	try {
		res = await fetch(emojisUrl);
                if (res.status >= 400) {
                        throw new Error(`${res.status} (${res.statusText}) Status received.`);
                }
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

	const emojis: EmojiList = json.reduce((acc: EmojiList, item: Emoji) => {
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
