import type { PageLoad } from './$types';

export const load = (async ({ fetch, url, params }) => {

	const hostname = url.searchParams.get('hostname');
	console.log('hostname', hostname)
	if (!hostname) {
		return { error: 'no hostname provided' };
	}
	const res = await fetch(`https://${hostname}/api/v1/custom_emojis`);
	const json = await res.json();

	// const emojis = json.map(({ shortcode, url, category }) => ({ shortcode, url, category }));
	const emojis = json.reduce((acc, item) => {
		const { category } = item;
		if (acc[category]) {
			acc[category].push(item);
		} else {
			acc[category] = [item];
		}
		return acc;
	}, {});

	return { emojis, hostname };

	// try {
	//         const res = await fetch(`/emojis`);
	//         const item = await res.json();
	//         return { item };
	// } catch (error) {
	//         return { error };
	// }

}) satisfies PageLoad;
