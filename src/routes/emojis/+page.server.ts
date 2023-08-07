import type { PageServerLoad } from './$types';

export const load = (async ({ fetch, params, url }) => {
	const hostname = params.hostname;
	console.log(params, url)
	if (!hostname) {
		return { error: 'no hostname provided' };
	}
	const res = await fetch(`https://${hostname}/api/v1/custom_emojis`);
	const emojis = await res.json();

	return { emojis };
}) satisfies PageServerLoad;
